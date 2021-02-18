import { chain, keyBy } from "lodash";
import {
  ErrorHelper,
  ICalculateAllShipFeeRequest,
  ICalculateAllShipFeeRespone,
  ServiceCode,
  VietnamPostHelper,
} from "../../../helpers";
import { AddressModel } from "../address/address.model";
import { CounterModel } from "../counter/counter.model";
import { IProduct, ProductModel, ProductType } from "../product/product.model";
import { IOrder, OrderModel, PaymentMethod, ShipMethod } from "./order.model";
import { IOrderItem, OrderItemModel } from "../orderItem/orderItem.model";
import { AddressStorehouseModel } from "../addressStorehouse/addressStorehouse.model";
import { MemberModel } from "../member/member.model";
import { CrossSaleModel } from "../crossSale/crossSale.model";
import { SettingHelper } from "../setting/setting.helper";
import { SettingKey } from "../../../configs/settingData";
import { CampaignModel } from "../campaign/campaign.model";
import {
  CampaignSocialResultModel,
  ICampaignSocialResult,
} from "../campaignSocialResult/campaignSocialResult.model";
import { UnorderedBulkOperation } from "mongodb";
import { AddressDeliveryModel } from "../addressDelivery/addressDelivery.model";

export class OrderHelper {
  constructor(public order: IOrder) {}
  value() {
    return this.order;
  }
  static async generateCode() {
    const orderCounter = await CounterModel.findOneAndUpdate(
      { name: "order" },
      { $setOnInsert: { value: 100000 } },
      { upsert: true, new: true }
    );

    return orderCounter
      .updateOne({ $inc: { value: 1 } })
      .exec()
      .then((res) => {
        return "DH" + (orderCounter.value + 1);
      });
  }

  static validatePhone(phone: string) {
    if (!/^\d{9,10}$/g.test(phone)) {
      throw ErrorHelper.requestDataInvalid("Sai định dạng số điện thoại");
    }
    return this;
  }

  async setProvinceName() {
    if (!this.order.buyerProvinceId) return this;
    const address = await AddressModel.findOne({
      provinceId: this.order.buyerProvinceId,
    });
    if (!address) throw ErrorHelper.mgRecoredNotFound("Tỉnh / thành");
    this.order.buyerProvince = address.province;
    return this;
  }
  async setDistrictName() {
    if (!this.order.buyerDistrictId) return this;
    const address = await AddressModel.findOne({
      districtId: this.order.buyerDistrictId,
    });
    if (!address) throw ErrorHelper.mgRecoredNotFound("Quận / Huyện");
    this.order.buyerDistrict = address.district;
    return this;
  }
  async setWardName() {
    if (!this.order.buyerWardId) return this;
    const address = await AddressModel.findOne({
      wardId: this.order.buyerWardId,
    });
    if (!address) throw ErrorHelper.mgRecoredNotFound("Phường / Xã");
    this.order.buyerWard = address.ward;
    return this;
  }

  calculateAmount() {
    this.order.amount = this.order.subtotal + this.order.shipfee;
    // return this;
  }

  static orderProducts = async (data: any) => {
    const { items, sellerId } = data;

    // kiểm tra danh sách
    const itemsLength = Object.keys(items).length;
    if (itemsLength === 0)
      throw ErrorHelper.requestDataInvalid("Danh sách sản phẩm");

    const itemIDs = items.map((i: any) => i.productId);
    const allProducts = await ProductModel.find({
      _id: { $in: itemIDs },
      type: ProductType.RETAIL,
      allowSale: true,
    });

    const productsLength = Object.keys(allProducts).length;
    if (productsLength !== itemsLength)
      throw ErrorHelper.mgQueryFailed("Danh sách sản phẩm");

    const addQuantitytoProduct = (product: any) => {
      product.qty = items.find((p: any) => p.productId === product.id).quantity;
      return product;
    };

    // lấy ra danh sách sản phẩm của shop đó bán + sản phẩm chính (hảng bưu điện chuyển về cho bưu cục quản trị)
    const directShoppingProducts: any = allProducts
      .filter(
        (p) =>
          (p.memberId == sellerId && p.isCrossSale === false) || p.isPrimary
      )
      .map(addQuantitytoProduct);

    // lấy ra danh sách sản phẩm của shop bán chéo
    const crossSaleProducts = allProducts
      .filter((p) => p.isCrossSale === true)
      .map(addQuantitytoProduct);

    // shop bán chéo thì phải check số lượng hàng tồn
    const outOfStockProducts: string[] = [];

    const isOutOfStock = ({
      id,
      name,
      crossSaleInventory: dbInventory,
      crossSaleOrdered: dbOrdered,
    }: any) => {
      const orderItem = items.find((i: any) => i.productId === id);
      const condition = dbInventory < dbOrdered + orderItem.quantity;
      condition && outOfStockProducts.push(name);
      return condition;
    };

    // console.log('crossSaleProducts.some(isOutOfStock)', crossSaleProducts.some(isOutOfStock));
    if (crossSaleProducts.some(isOutOfStock)) {
      throw ErrorHelper.requestDataInvalid(
        `. Sản phẩm [${outOfStockProducts.join(",")}] hết hàng.`
      );
    }

    const orders = [];

    if (directShoppingProducts.length > 0) {
      orders.push({
        ...data,
        products: directShoppingProducts,
        fromMemberId: sellerId,
      });
    }

    if (crossSaleProducts.length > 0) {
      const ids = crossSaleProducts.map((p: any) => p._id);
      // console.log("ids", ids);

      // // lay cac mat hang crossale ra
      const crossSales = await CrossSaleModel.find({
        productId: { $in: ids },
        sellerId,
      });
      // console.log("crossSales", crossSales);
      // kiem tra mat hang nay co trong dang ky crossale ko ?
      if (crossSales.length !== crossSaleProducts.length)
        throw ErrorHelper.mgQueryFailed("Danh sách sản phẩm bán chéo");

      // tach cac san pham nay ra theo tung chu shop
      chain(crossSaleProducts)
        .groupBy("memberId")
        .map((products, i) => {
          orders.push({
            ...data,
            products,
            sellerId: i,
            fromMemberId: sellerId,
          });
        });
    }

    return orders;
  };

  static async fromRaw(data: any) {
    const order = new OrderModel(data);
    // if (order.paymentMethod == PaymentMethod.) order.paymentStatus = PaymentStatus.PAID;
    const helper = new OrderHelper(order);
    await Promise.all([
      helper.setProvinceName(),
      helper.setDistrictName(),
      helper.setWardName(),
    ]);

    return helper;
  }

  async generateItemsFromRaw(products: any) {
    const UNIT_PRICE = await SettingHelper.load(SettingKey.UNIT_PRICE);
    this.order.subtotal = 0;
    this.order.itemCount = 0;
    this.order.itemIds = [];
    this.order.items = [];
    this.order.itemWeight = 0;

    for (let i of products) {
      const {
        _id,
        qty,
        name,
        basePrice,
        weight,
        length,
        width,
        height,
        isPrimary,
        isCrossSale,
        commission0,
        commission1,
        commission2,
        enabledMemberBonus,
        enabledCustomerBonus,
        memberBonusFactor,
        customerBonusFactor,
      }: IProduct = i;

      const orderItem: any = {
        orderId: this.order._id,
        productId: _id,
        productName: name,
        isPrimary,
        isCrossSale,
        basePrice: basePrice,
        qty: qty,
        amount: basePrice * qty,
        productWeight: weight,
        productHeight: height,
        productLength: length,
        productWidth: width,
        commission0,
        commission1,
        commission2,
      };

      const getPointFromPrice = (factor: any, price: any) =>
        Math.round(((price / UNIT_PRICE) * 100) / 100) * factor;
      // Điểm thưởng khách hàng
      if (enabledCustomerBonus)
        orderItem.buyerBonusPoint = getPointFromPrice(
          customerBonusFactor,
          basePrice
        );
      // Điểm thưởng chủ shop
      if (enabledMemberBonus)
        orderItem.sellerBonusPoint = getPointFromPrice(
          memberBonusFactor,
          basePrice
        );

      const item = new OrderItemModel(orderItem);
      this.order.items.push(item);

      this.order.subtotal += item.amount;
      this.order.itemCount += item.qty;
      this.order.itemWeight += item.productWeight * item.qty;
      this.order.commission0 += item.commission0;
      this.order.commission1 += item.commission1;
      this.order.commission2 += item.commission2;

      this.order.sellerBonusPoint += item.sellerBonusPoint;
      this.order.buyerBonusPoint += item.buyerBonusPoint;

      this.order.itemIds.push(item._id);
    }

    this.order.itemHeight = Math.max.apply(
      null,
      products.map(({ height }: any) => height)
    );
    this.order.itemLength = Math.max.apply(
      null,
      products.map(({ length }: any) => length)
    );
    this.order.itemWidth = Math.max.apply(
      null,
      products.map(({ width }: any) => width)
    );

    return this.order.items;
  }

  async calculateShipfee() {
    this.order.shipfee = 0;

    switch (this.order.shipMethod) {
      case ShipMethod.NONE:
        this.order.shipfee = 0;
        break;

      case ShipMethod.POST:
        this.order.shipfee = await SettingHelper.load(SettingKey.DELIVERY_POST_FEE);
        break;

      case ShipMethod.VNPOST:
        const member = await MemberModel.findById(this.order.sellerId);
        const { addressStorehouseIds } = member;
        const storehouses = await AddressStorehouseModel.find({
          _id: { $in: addressStorehouseIds },
        });
        if (storehouses.length === 0)
          throw ErrorHelper.somethingWentWrong("Chưa cấu hình chi nhánh kho");

        // kiem tra đơn hàng trong nội thành ?
        const urbanStores = storehouses.filter(
          (store) => store.provinceId === this.order.buyerProvinceId
        );

        if (urbanStores.length > 0) {
          await calcDraftUrbanShipFee(urbanStores, this);
        } else {
          await calcDraftSuburbanShipFee(storehouses, this);
        }
        break;
        
      default:
        throw ErrorHelper.requestDataInvalid(
          "Phương thức vận chuyển chưa được hỗ trợ."
        );
    }
    return this;
  }

  async addCampaignBulk(campaignCode: any) {
    const campaign = await CampaignModel.findOne({ code: campaignCode });
    const campaignSocialResultBulk: UnorderedBulkOperation = CampaignSocialResultModel.collection.initializeUnorderedBulkOp();
    if (campaign) {
      const campaignSocialResults = campaign
        ? await CampaignSocialResultModel.find({
            memberId: this.order.sellerId,
            campaignId: campaign.id,
          })
        : [];

      this.order.items.map((item: IOrderItem) => {
        const campaignResultByProductId = campaignSocialResults.find(
          (c: ICampaignSocialResult) => c.productId.toString() == item.productId
        );
        if (campaign.productId.toString() === item.id) {
          item.campaignId = campaign._id;
          item.campaignSocialResultId = campaignResultByProductId._id;
          const { orderItemIds } = campaignResultByProductId;
          campaignSocialResultBulk
            .find({ _id: campaignResultByProductId._id })
            .updateOne({
              $set: { orderItemIds: [...orderItemIds, item._id] },
            });
        }
        return item;
      });
    }
    return campaignSocialResultBulk;
  }

  static updateOrderedQtyBulk(items: any) {
    const productBulk = ProductModel.collection.initializeUnorderedBulkOp();
    items.map((item: IOrderItem) => {
      if (item.isCrossSale) {
        const { productId } = item;
        productBulk.find({ productId }).updateOne({
          $inc: { crossSaleOrdered: item.qty },
        });
      }
    });
    // console.log("items", items);
    productBulk.execute();
  }
}


const calcDraftUrbanShipFee = async (urbanStores: any, orderHelper: any) => {
  const stores = urbanStores.filter(
    (store: any) => store.districtId === orderHelper.order.buyerDistrictId
  );

  const deliveryServices = VietnamPostHelper.getListServiceOffline();

  const storehouse = stores.length > 0 ? stores[0] : urbanStores[0];

  let MaTinhGui = storehouse.provinceId,
    MaQuanGui = storehouse.districtId,
    MaTinhNhan = orderHelper.order.buyerProvinceId,
    MaQuanNhan = orderHelper.order.buyerDistrictId;

  const moneyCollection =
    orderHelper.order.paymentMethod == PaymentMethod.COD
      ? orderHelper.order.subtotal
      : 0;

  const productWeight = orderHelper.order.itemWeight;
  const productLength = orderHelper.order.itemLength;
  const productWidth = orderHelper.order.itemWidth;
  const productHeight = orderHelper.order.itemHeight;

  const LstDichVuCongThem = [
    {
      DichVuCongThemId: 3,
      TrongLuongQuyDoi: 0,
      SoTienTinhCuoc: orderHelper.order.subtotal.toString(),
    },
    // { DichVuCongThemId: 1, TrongLuongQuyDoi: 0, SoTienTinhCuoc: priceShow.toString() },
    // { DichVuCongThemId: 2, TrongLuongQuyDoi: 0, SoTienTinhCuoc: null },
    // { DichVuCongThemId: 4, TrongLuongQuyDoi: 0, SoTienTinhCuoc: null },
  ];

  const data: ICalculateAllShipFeeRequest = {
    MaDichVu: ServiceCode.BK,
    MaTinhGui,
    MaQuanGui,
    MaTinhNhan,
    MaQuanNhan,
    Dai: productLength,
    Rong: productWidth,
    Cao: productHeight,
    KhoiLuong: productWeight,
    ThuCuocNguoiNhan: PaymentMethod.COD ? true : false,
    LstDichVuCongThem,
  };

  let service: ICalculateAllShipFeeRespone = await VietnamPostHelper.calculateAllShipFee(
    data
  );

  const cheapestService = {
    ...service,
    storehouse,
    moneyCollection,
    productWeight,
    productLength,
    productWidth,
    productHeight,
  };

  orderHelper.order.shipfee = cheapestService.TongCuocBaoGomDVCT;
  orderHelper.order.deliveryInfo = {
    date: new Date(),
    serviceId: ServiceCode.BK,
    serviceName: deliveryServices.find(({ code }) => code == ServiceCode.BK)
      .name,
    time: cheapestService.ThoiGianPhatDuKien,
    addressStorehouseId: cheapestService.storehouse._id,
    moneyCollection: cheapestService.moneyCollection,
    productName: orderHelper.order.items
      .map((i: any) => i.productName)
      .join(" + "),
    productWeight: cheapestService.productWeight,
    productLength: cheapestService.productLength,
    productWidth: cheapestService.productWidth,
    productHeight: cheapestService.productHeight,
  };
};

const calcDraftSuburbanShipFee = async (storehouses: any, orderHelper: any) => {
  let serviceList = [];
  const deliveryServices = VietnamPostHelper.getListServiceOffline();
  // console.log("storehouses", storehouses);
  for (const storehouse of storehouses) {
    let MaTinhGui = storehouse.provinceId,
      MaQuanGui = storehouse.districtId,
      MaTinhNhan = orderHelper.order.buyerProvinceId,
      MaQuanNhan = orderHelper.order.buyerDistrictId;

    const moneyCollection =
      orderHelper.order.paymentMethod == PaymentMethod.COD
        ? orderHelper.order.subtotal
        : 0;

    const productWeight = orderHelper.order.itemWeight;
    const productLength = orderHelper.order.itemLength;
    const productWidth = orderHelper.order.itemWidth;
    const productHeight = orderHelper.order.itemHeight;

    const LstDichVuCongThem = [
      {
        DichVuCongThemId: 3,
        TrongLuongQuyDoi: 0,
        SoTienTinhCuoc: orderHelper.order.subtotal.toString(),
      },
    ];

    const data: ICalculateAllShipFeeRequest = {
      MaDichVu: ServiceCode.BK,
      MaTinhGui,
      MaQuanGui,
      MaTinhNhan,
      MaQuanNhan,
      Dai: productLength,
      Rong: productWidth,
      Cao: productHeight,
      KhoiLuong: productWeight,
      ThuCuocNguoiNhan: PaymentMethod.COD ? true : false,
      LstDichVuCongThem,
    };

    let service: ICalculateAllShipFeeRespone = await VietnamPostHelper.calculateAllShipFee(
      data
    );

    // console.log("service", service);
    serviceList.push({
      ...service,
      storehouse,
      moneyCollection,
      productWeight,
      productLength,
      productWidth,
      productHeight,
    });
  }

  serviceList = serviceList.sort(
    (a, b) => a.TongCuocBaoGomDVCT - b.TongCuocBaoGomDVCT
  );

  const cheapestService = serviceList[0];
  // console.log("cheapestService", cheapestService);
  orderHelper.order.shipfee = cheapestService.TongCuocBaoGomDVCT;
  orderHelper.order.deliveryInfo = {
    date: new Date(),
    serviceId: ServiceCode.BK,
    serviceName: deliveryServices.find(({ code }) => code == ServiceCode.BK)
      .name,
    time: cheapestService.ThoiGianPhatDuKien,
    addressStorehouseId: cheapestService.storehouse._id,
    moneyCollection: cheapestService.moneyCollection,
    productName: orderHelper.order.items
      .map((i: any) => i.productName)
      .join(" + "),
    productWeight: cheapestService.productWeight,
    productLength: cheapestService.productLength,
    productWidth: cheapestService.productWidth,
    productHeight: cheapestService.productHeight,
  };
};
