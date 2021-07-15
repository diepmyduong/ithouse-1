import { useEffect, useState } from "react";
import { RiCalendarTodoLine, RiHome6Line, RiStickyNoteLine, RiUser5Line } from "react-icons/ri";
import { useAlert } from "../../../lib/providers/alert-provider";
import { Order, OrderService, ORDER_STATUS } from "../../../lib/repo/order.repo";
import { Dialog, DialogPropsType } from "../utilities/dialog/dialog";
import { Spinner } from "../utilities/spinner";
import format from "date-fns/format";
import { getAddressText } from "../../../lib/helpers/get-address-text";
import { Img } from "../utilities/img";
import { NumberPipe } from "../../../lib/pipes/number";
import { Button } from "../utilities/form/button";
import { OrderLog, OrderLogService } from "../../../lib/repo/order-log.repo";
import { DeliveryLog, DeliveryLogService } from "../../../lib/repo/delivery-log.repo";

interface PropsType extends DialogPropsType {
  orderId: string;
}
export function OrderDetailsDialog({ orderId, ...props }: PropsType) {
  const [order, setOrder] = useState<Order>(null);
  const ORDER_TABS: Option[] = [
    { value: "products", label: "Danh sách món" },
    { value: "order_history", label: "Lịch sử đơn hàng" },
    { value: "delivery_history", label: "Lịch sử giao hàng" },
  ];
  const [selectedTab, setSelectedTab] = useState("products");
  const alert = useAlert();

  useEffect(() => {
    if (props.isOpen && orderId) {
      loadOrder(orderId);
    } else {
      setOrder(null);
    }
  }, [props.isOpen, orderId]);

  const loadOrder = (orderId: string) => {
    OrderService.getOne({ id: orderId })
      .then((res) => {
        setOrder(res);
      })
      .catch((err) => {
        console.error(err);
        alert.error("Xem chi tiết đơn hàng thất bại", err.message);
        props.onClose();
      });
  };

  return (
    <Dialog
      {...props}
      title="Chi tiết đơn hàng"
      extraDialogClass="bg-transparent"
      extraHeaderClass="bg-gray-100 text-xl py-3 justify-center rounded-t-xl border-gray-300 pl-16"
      extraBodyClass="px-6 bg-gray-100 rounded-b-xl"
      width="650px"
    >
      {!order ? (
        <Spinner />
      ) : (
        <Dialog.Body>
          <div className="flex justify-between">
            <div className="text-primary font-bold text-xl">{order.code}</div>
            <div
              className={`status-label self-center bg-${
                ORDER_STATUS.find((x) => x.value == order.status)?.color
              }`}
            >
              {ORDER_STATUS.find((x) => x.value == order.status)?.label}
            </div>
          </div>
          <div className="flex items-start gap-x-2 mt-1 text-gray-700">
            <i className="mt-1">
              <RiCalendarTodoLine />
            </i>
            <span>
              <strong className="font-semibold">Ngày đặt: </strong>
              {format(new Date(order.createdAt), "dd-MM-yyyyy HH:mm")}
            </span>
          </div>
          <div className="flex items-start gap-x-2 mt-1 text-gray-700">
            <i className="mt-1">
              <RiUser5Line />
            </i>
            <span>
              <strong className="font-semibold">Khách hàng: </strong>
              {order.buyerName}【{order.buyerPhone}】
            </span>
          </div>
          {order.pickupMethod == "DELIVERY" && (
            <div className="flex items-start gap-x-2 mt-1 text-gray-700">
              <i className="mt-1">
                <RiHome6Line />
              </i>
              <span>
                <strong className="font-semibold">Địa chỉ: </strong>
                {getAddressText(order, "buyer")}
              </span>
            </div>
          )}
          <div className="flex items-start gap-x-2 mt-1 text-gray-700">
            <i className="mt-1">
              <RiStickyNoteLine />
            </i>
            <span>
              <strong className="font-semibold">Ghi chú: </strong>
              {order.note || <span className="text-gray-400">Không có</span>}
            </span>
          </div>
          <hr className="border-gray-300 my-3" />
          <div className="grid grid-cols-3 gap-2 mb-1">
            <div className="text-gray-700 col-span-3">
              <div className="font-semibold mb-0.5">Phương thức thanh toán</div>
              <div>{order.paymentMethodText}</div>
            </div>
            <div className="text-gray-700">
              <div className="font-semibold mb-0.5">Phương thức lấy hàng</div>
              <div>{order.pickupMethod == "DELIVERY" ? "Giao hàng" : "Nhận tại cửa hàng"}</div>
            </div>
            <div className="text-gray-700">
              <div className="font-semibold mb-0.5">Tình trạng giao hàng</div>
              <div>{order.deliveryInfo?.statusText || "[Không có]"}</div>
            </div>
            {order.pickupMethod == "STORE" && (
              <div className="text-gray-700">
                <div className="font-semibold">Thời gian lấy hàng</div>
                <div>{order.pickupTime}</div>
              </div>
            )}
          </div>
          {order.driverId && (
            <>
              <hr className="border-gray-300 my-3" />
              <div className="grid grid-cols-3 gap-2 mb-1">
                <div className="text-gray-700">
                  <div className="font-semibold">Tên tài xế</div>
                  <div>{order.driverName}</div>
                </div>
                <div className="text-gray-700">
                  <div className="font-semibold">SĐT tài xế</div>
                  <div>{order.driverPhone}</div>
                </div>
                <div className="text-gray-700">
                  <div className="font-semibold">Biển số xe tài xế</div>
                  <div>{order.driverLicense}</div>
                </div>
              </div>
            </>
          )}
          <div className="my-3 border-group rounded-sm">
            {ORDER_TABS.map((tab) => (
              <Button
                outline={selectedTab != tab.value}
                primary={selectedTab == tab.value}
                className="border"
                medium
                text={tab.label}
                onClick={() => setSelectedTab(tab.value)}
              />
            ))}
          </div>
          {
            {
              products: <ProductsTab order={order} />,
              order_history: <OrderHistoryTabs order={order} />,
              delivery_history: <DeliveryHistoryTabs order={order} />,
            }[selectedTab]
          }
        </Dialog.Body>
      )}
    </Dialog>
  );
}

function ProductsTab({ order }: { order: Order }) {
  return (
    <div className="animate-emerge">
      <table className="w-full border-collapse border rounded border-gray-400">
        <thead>
          <tr className="border-b border-gray-400 text-gray-700 font-semibold whitespace-nowrap">
            <th className="p-2 text-center w-6">STT</th>
            <th className="p-2 text-left">Sản phẩm</th>
            <th className="p-2 text-center">Số lượng</th>
            <th className="p-2 text-right">Giá</th>
            <th className="p-2 text-right">Tổng giá</th>
          </tr>
        </thead>
        <tbody>
          {!order.items.length && (
            <tr>
              <td colSpan={6} className="table-cell text-gray-300 text-center">
                Không có sản phẩm
              </td>
            </tr>
          )}
          {order.items.map((item, index) => (
            <tr
              className={`text-gray-700 ${
                index != order.items.length - 1 ? "border-b border-gray-300" : ""
              }`}
              key={item.id}
            >
              <td className="p-2 text-center w-6">{index + 1}</td>
              <td className="p-2 text-left">
                <div className="flex">
                  <Img
                    compress={200}
                    className="w-14 rounded"
                    src={item.product.image}
                    showImageOnClick
                  />
                  <div className="flex-1 pl-2">
                    <div className="font-semibold">{item.productName}</div>
                    <div className="text-gray-500">
                      {item.toppings.map((x) => x.optionName).join(", ")}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-2 text-center">{item.qty}</td>
              <td className="p-2 text-right">{NumberPipe(item.basePrice, true)}</td>
              <td className="p-2 text-right">{NumberPipe(item.amount, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 w-72 ml-auto font-semibold grid gap-y-1 text-gray-800 pr-1">
        <div className="flex justify-between">
          <div>Tiền hàng</div>
          <div>{NumberPipe(order.subtotal, true)}</div>
        </div>
        <div className="flex justify-between">
          <div>Phí ship</div>
          <div>{NumberPipe(order.shipfee, true)}</div>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <div>Tổng tiền</div>
          <div className="text-danger">{NumberPipe(order.amount, true)}</div>
        </div>
      </div>
    </div>
  );
}

function OrderHistoryTabs({ order }: { order: Order }) {
  const [orderLogs, setOrderLogs] = useState<OrderLog[]>(null);

  useEffect(() => {
    OrderLogService.getAll({ query: { limit: 0, filter: { orderId: order.id } } }).then((res) => {
      setOrderLogs(res.data);
    });
  }, []);

  if (!orderLogs) return <Spinner />;
  return (
    <div className="animate-emerge">
      <table className="w-full border-collapse border rounded border-gray-400">
        <thead>
          <tr className="border-b border-gray-400 text-gray-700 font-semibold whitespace-nowrap">
            <th className="p-2 text-center w-6">Thời điểm</th>
            <th className="p-2 text-left">Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {!orderLogs.length ? (
            <tr>
              <td colSpan={6} className="table-cell text-gray-300 text-center h-32">
                Không có lịch sử đơn hàng
              </td>
            </tr>
          ) : (
            orderLogs.map((orderLog, index) => (
              <tr
                key={orderLog.id}
                className={`text-gray-700 ${
                  index != orderLogs.length - 1 ? "border-b border-gray-300" : ""
                }`}
              >
                <td className="p-2 text-center whitespace-nowrap">
                  {format(new Date(orderLog.createdAt), "dd-MM-yyyy HH:mm")}
                </td>
                <td className="p-2 text-left">{orderLog.note}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function DeliveryHistoryTabs({ order }: { order: Order }) {
  const [deliveryLogs, setDeliveryLogs] = useState<DeliveryLog[]>(null);

  useEffect(() => {
    DeliveryLogService.getAll({ query: { limit: 0, filter: { orderId: order.id } } }).then(
      (res) => {
        setDeliveryLogs(res.data);
      }
    );
  }, []);

  if (!deliveryLogs) return <Spinner />;
  return (
    <div className="animate-emerge">
      <table className="w-full border-collapse border rounded border-gray-400">
        <thead>
          <tr className="border-b border-gray-400 text-gray-700 font-semibold whitespace-nowrap">
            <th className="p-2 text-center w-6">Thời điểm</th>
            <th className="p-2 text-left">Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {!deliveryLogs.length ? (
            <tr>
              <td colSpan={6} className="table-cell text-gray-300 text-center h-32">
                Không có lịch sử giao hàng
              </td>
            </tr>
          ) : (
            deliveryLogs.map((deliveryLog, index) => (
              <tr
                key={deliveryLog.id}
                className={`text-gray-700 ${
                  index != deliveryLogs.length - 1 ? "border-b border-gray-300" : ""
                }`}
              >
                <td className="p-2 text-center whitespace-nowrap">
                  {format(new Date(deliveryLog.createdAt), "dd-MM-yyyy HH:mm")}
                </td>
                <td className="p-2 text-left">{deliveryLog.statusName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}