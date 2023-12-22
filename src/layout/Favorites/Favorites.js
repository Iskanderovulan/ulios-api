import React, { useEffect } from "react";
import Item from "../../components/Item/Item";
import s from "./Favorites.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesAsync } from "../../redux/actions/action";
const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favoritesSlice) || [];

  const newfavorites = favorites?.map((el) => {
    return el.product;
  });

  useEffect(() => {
    dispatch(getFavoritesAsync());
  }, [dispatch]);

  const renderItems = newfavorites?.map((item) => (
    <Item item={item} key={item?._id} />
  ));
  return (
    <section id={s.home}>
      <div className="container">
        <h2 className={s.homeText}>Favorites</h2>

        <div className="row gy-4 row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
          {renderItems}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
