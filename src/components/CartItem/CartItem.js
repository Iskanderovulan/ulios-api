import React from "react";
import s from "./CartItem.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductsAsync,
  decreaseQuantityAsync,
  removeItemAsync,
  toggleFavoriteAsync,
} from "../../redux/actions/action";
const CartItem = ({ item, loading }) => {
  const dispatch = useDispatch();
  const loadingMinus = loading.decrease?.[item?._id] ? "disabled" : null;
  const loadingPlus = loading.add?.[item?._id] ? "disabled" : null;
  const loadingDelete = loading.remove?.[item?._id] ? "disabled" : null;

  const { favorites } = useSelector((state) => state.favoritesSlice) || [];

  const status = favorites?.reduce((acc, rec) => {
    const { product } = rec;
    if (product?._id === item?._id) {
      return true;
    }
    return acc;
  }, null);

  return (
    <div
      className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-3 row-cols-1"
      id={s.cartItem}
    >
      <div className="col">
        <div className={s.cartItem__img}>
          <img src={item.img} alt="" />
        </div>
      </div>

      <div className="col">
        <div className={s.cartItem__logic}>
          <div className={s.cartItem__first}>
            <p>
              <span>price:</span>
              {item.price}
            </p>
            <p>
              <span>name:</span>
              {item.name}
            </p>
            <p>
              <span>Total:</span>
              {item.total}som
            </p>
          </div>
          <div className={s.cartItem__second}>
            <RemoveIcon
              className={loadingMinus}
              onClick={() => dispatch(decreaseQuantityAsync(item._id))}
            />
            <p className={s.cartItem__quantity}>{item.clientQuantity}</p>
            <AddIcon
              className={loadingPlus}
              onClick={() => dispatch(addProductsAsync(item._id))}
            />
          </div>
        </div>
      </div>

      <div className="col">
        <div className={s.cartItem__icons}>
          <DeleteForeverIcon
            className={loadingDelete}
            onClick={() => dispatch(removeItemAsync(item._id))}
          />
          <div onClick={() => dispatch(toggleFavoriteAsync(item._id))}>
            {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
