import React, { useState } from "react";
import { Img } from "../../../shared/utilities/img";
import { useRouter } from "next/router";
import { Price } from "../../../shared/homepage-layout/price";
interface Propstype extends ReactProps {}
export function HightLightCategories(props: Propstype) {
  const tryFood = [
    {
      img:
        "https://product.hstatic.net/200000043306/product/combo-tho_75f95928d32648438ac8927bdbdcb06e_grande.png",
      name: "Combo Phúc",
      code: "BNJ432",
      price: 119000,
    },
    {
      img:
        "https://product.hstatic.net/200000043306/product/combo-tho_75f95928d32648438ac8927bdbdcb06e_grande.png",
      name: "Combo Lộc",
      code: "BNJ432",
      price: 119000,
    },
    {
      img:
        "https://product.hstatic.net/200000043306/product/combo-tho_75f95928d32648438ac8927bdbdcb06e_grande.png",
      name: "Combo Thọ",
      code: "BNJ432",
      price: 119000,
    },
    {
      img:
        "https://product.hstatic.net/200000043306/product/combo-tho_75f95928d32648438ac8927bdbdcb06e_grande.png",
      name: "Combo Phúc Lộc Thọ",
      code: "BNJ432",
      price: 119000,
    },
  ];
  const router = useRouter();
  const query = router.query;
  const [openDialog, setOpenDialog] = useState(false);
  const [detailItem, setDetailItem] = useState<any>(null);
  return (
    <div className="border-t-8 border-b-8 py-2">
      <h3 className="font-semibold pb-2 px-4 text-lg text-primary">Nhất định phải thử</h3>
      <div className="grid grid-cols-2 gap-2 px-4">
        {tryFood.map((item, index) => (
          <div
            className="col-span-1 hover:bg-primary-light transition-all duration-300 cursor-pointer"
            key={index}
            onClick={() => {
              setDetailItem(item);
              setOpenDialog(true);
              router.replace({ query: { ...query, productId: item.code }, path: "/" });
            }}
          >
            <Img src={item.img} ratio169 className="min-w-4xs rounded-sm" />
            <p>{item.name}</p>
            <Price price={item.price} textDanger />
          </div>
        ))}
      </div>
      {/*  <Form
        dialog
        mobileSizeMode
        isOpen={openDialog}
        slideFromBottom="all"
        onClose={() => setOpenDialog(false)}
      >
        <RestaurantDetail item={detailItem} onClose={() => setOpenDialog(false)}></RestaurantDetail>
      </Form> */}
    </div>
  );
}
