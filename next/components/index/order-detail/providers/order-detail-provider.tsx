import { createContext, useContext, useEffect, useState } from "react";
import { Order, OrderService, ORDER_STATUS } from "../../../../lib/repo/order.repo";
import cloneDeep from "lodash/cloneDeep";
import { useAlert } from "../../../../lib/providers/alert-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
import { useRouter } from "next/router";

export const OrderDetailContext = createContext<
  Partial<{
    order: Order;
    status: Option;
    loading: boolean;
    setLoading: Function;
    isInterval: boolean;
    cancelOrder: (id: string, note: string) => any;
  }>
>({});
interface PropsType extends ReactProps {
  id: string;
}
export function OrderDetailProvider({ id, ...props }: PropsType) {
  const [order, setOrder] = useState<Order>(null);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Option>(null);
  const [isInterval, setIsInterval] = useState(false);
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    loadOrder(id);
    let interval = setInterval(() => {
      OrderService.getOne({ id })
        .then((res) => {
          if (
            res.status !== "PENDING" &&
            res.status !== "CONFIRMED" &&
            res.status !== "DELIVERING"
          ) {
            setIsInterval(false);
            clearInterval(interval);
          } else {
            if (order) {
              if (res.status !== order.status) {
                toast.info(res.statusText);
                setOrder(cloneDeep(res));
              }
            }
          }
        })
        .catch(async (err) => {
          console.error(err);
          let res = await alert.error("Xem chi tiết đơn hàng thất bại", err.message);
          if (res) {
            setIsInterval(false);
            clearInterval(interval);
            router.replace("/order");
          }
        });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [id]);
  useEffect(() => {
    if (order) {
      let sta = ORDER_STATUS.find((x) => x.value === order.status);
      if (sta) setStatus(cloneDeep(sta));
    }
  }, [order]);
  function cancelOrder(id: string, note: string) {
    OrderService.cancelOrder(id, note)
      .then((res) => {
        setOrder(cloneDeep(res));
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert.error("Hủy đơn hàng thất bại", err.message);
        loadOrder(id);
        setLoading(false);
      });
  }
  const loadOrder = (id: string) => {
    OrderService.getOne({ id })
      .then((res) => {
        if (res.status === "PENDING" || res.status === "CONFIRMED" || res.status === "DELIVERING") {
          setIsInterval(true);
        }
        setOrder(cloneDeep(res));
      })
      .catch((err) => {
        console.error(err);
        alert.error("Xem chi tiết đơn hàng thất bại", err.message);
      });
  };
  return (
    <OrderDetailContext.Provider
      value={{ order, status, loading, setLoading, cancelOrder, isInterval }}
    >
      {props.children}
    </OrderDetailContext.Provider>
  );
}

export const useOrderDetailContext = () => useContext(OrderDetailContext);
export const OrderConsumer = ({
  children,
}: {
  children: (props: Partial<{ order: Order }>) => any;
}) => {
  return <OrderDetailContext.Consumer>{children}</OrderDetailContext.Consumer>;
};
