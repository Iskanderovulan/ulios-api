import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAsync } from "../../redux/actions/action";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../redux/slicers/tokenSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.infoSlice.info);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    setOpen(false); // Закрываем диалог перед выходом
    dispatch(clearToken());
    navigate("/auth");
  };

  useEffect(() => {
    dispatch(getInfoAsync());
  }, [dispatch, navigate]);

  return (
    <div>
      <Button
        style={{ fontSize: "2rem" }}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        Menu
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openMenu}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} style={{ fontSize: "1.25rem" }}>
          Username: {name ? name : "your name"}
        </MenuItem>
        <MenuItem onClick={handleMenuClose} style={{ fontSize: "1.25rem" }}>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Main Page
          </a>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} style={{ fontSize: "1.25rem" }}>
          <a
            href="/favorites"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Favourites
          </a>
        </MenuItem>
        <MenuItem onClick={handleClickOpen} style={{ fontSize: "1.25rem" }}>
          Log Out
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to log out?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Info;
