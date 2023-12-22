import React from "react";
import s from "./Item.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsAsync,
  toggleFavoriteAsync,
} from "../../redux/actions/action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const Item = ({ item }) => {
  const { loading } = useSelector((state) => state.loadingErrorSlice);
  const { favorites } = useSelector((state) => state.favoritesSlice) || [];
  const displayName =
    item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name;

  const status = favorites?.reduce((acc, rec) => {
    const { product } = rec;
    return product?._id === item?._id ? true : acc;
  }, null);

  const loadingPlus = loading.create?.[item._id] ? "disabled" : null;
  const dispatch = useDispatch();

  return (
    <div className="col">
      <Card className={s.item__box}>
        <img src={item.img} alt={item.name} />
        <CardContent>
          <Tooltip
            title={item.name}
            PopperProps={{
              sx: {
                typography: "2rem", // или можно указать конкретный размер, например, fontSize: '1em'
                "& .MuiTooltip-tooltip": {
                  fontSize: "2rem", // Задаем размер шрифта для текста подсказки
                },
              },
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {displayName}
            </Typography>
          </Tooltip>
          <Typography variant="h5" color="text.secondary">
            {item.price}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => dispatch(addProductsAsync(item._id))}
            disabled={!!loadingPlus}
          >
            Add To Cart
          </IconButton>
          <IconButton
            onClick={() => dispatch(toggleFavoriteAsync(item._id))}
            className={s.item__favorite}
          >
            {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Item;
