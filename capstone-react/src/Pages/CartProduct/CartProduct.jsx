import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableCart from "../../components/TableCart/TableCart";
import {
  clearCartsAction,
  pushProductOrders,
} from "../../redux/reducer/productReducer";
import { getStoreJson, http } from "../../util/tools";

export default function CartProduct(props) {
  const { arrCart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { useReducer } = useSelector((state) => state.useReducer);

  const orderProducts = async () => {
    try {
      let arrProductsOrderFilter = arrCart.filter((item) => item !== null);
      if (arrProductsOrderFilter.length > 0) {
        let orderProducts = arrProductsOrderFilter?.reduce((order, product) => {
          order.push({
            productId: product?.id,
            quantity: product?.quantity,
          });
          return order;
        }, []);
        let dataOrder = {
          orderDetail: orderProducts,
          email: useReducer.email,
        };
        const result = await http.post("/Users/order", dataOrder);
        alert("Đặt hàng thành công!");
        navigator("/profile");
        return dataOrder;
      } else {
        navigator("/login");
      }
    } catch (err) {}
  };
  const arrCarts = [];

  const clearCarts = () => {
    dispatch(clearCartsAction(arrCarts));
  };

  useEffect(() => {
    let arrProductOrder = getStoreJson("arrProductOrder");
    if (arrProductOrder !== null) {
      const action = pushProductOrders(arrProductOrder);
      dispatch(action);
    }
  }, []);

  return (
    <section className="cart_detail">
      <div className="container">
        <h1 className="cart_detail-title">Carts</h1>
        <TableCart />
        <div className="text-end">
          <button
            className="btn cart_detail-btn"
            onClick={() => {
              orderProducts();
              setTimeout(() => {
                clearCarts();
              }, 2000);
            }}
          >
            Submit order
          </button>
        </div>
      </div>
    </section>
  );
}
