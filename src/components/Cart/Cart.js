import React, { useEffect } from "react";
import s from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync } from "../../redux/actions/action";

const Cart = ({ toggle, handleToggle }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cartSlice);
  const { items, grandTotal } = data || {};
  const { loading } = useSelector((state) => state.loadingErrorSlice);
  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);

  const newData = items?.map((el) => {
    return { ...el.product, clientQuantity: el.quantity, total: el.total };
  });
  const renderItems = newData?.map((item) => (
    <CartItem key={item._id} item={item} loading={loading} />
  ));
  return (
    <div className={toggle ? `${s.cart__modal} ${s.show}` : s.cart__modal}>
      <div className={s.exit__wrap}>
        <h2 className={s.cartText}>CART</h2>
        <CloseIcon style={{ cursor: "pointer" }} onClick={handleToggle} />
      </div>

      <div className={s.cart__wrap}>
        <p>Total Price:{grandTotal?.toFixed(2)} som</p>
        <div onClick={handleToggle} className={s.cart__exit}></div>
      </div>

      <div className={s.cart__content}>{renderItems}</div>
    </div>
  );
};

export default Cart;
