import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./Home.module.css";
import Item from "../../components/Item/Item";
import {
  getFavoritesAsync,
  getProductsAsync,
} from "../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import Loader from "../../components/Loader/Loader";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { Button } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, pages, loading } = useSelector((state) => state.homeSlice);
  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    dispatch(getProductsAsync(`?page=${currentPage}&search=${searchQuery}`));
  }, [dispatch, currentPage, searchQuery]);

  useEffect(() => {
    dispatch(getFavoritesAsync());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, search: searchQuery });
    dispatch(getProductsAsync(`?page=${newPage}&search=${searchQuery}`));
  };

  const handleResetPage = () => {
    setSearchParams({});
    dispatch(getProductsAsync());
  };

  const items = data?.products?.map((item) => (
    <Item item={item} key={item._id} />
  ));

  console.log(loading);
  if (loading) return <Loader />;

  return (
    <section id={s.home}>
      <h2 className={s.homeText}>Online Bar Menu</h2>

      <div className="container">
        <div className={s.uiWrap}>
          <SearchComponent
            getProductsAsync={getProductsAsync}
            setSearchParams={setSearchParams}
            searchQuery={searchQuery}
          />
          {pages > 1 && (
            <div className={s.pagination__wrap}>
              <PaginationComponent
                page={currentPage}
                pages={pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          <Button
            style={{ width: "100px", fontSize: "1.2rem", height: "50px" }}
            variant="contained"
            color="primary"
            onClick={handleResetPage}
          >
            Reset
          </Button>
        </div>
        <div className="row gy-4 row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
          {items}
        </div>
      </div>
    </section>
  );
};

export default Home;
