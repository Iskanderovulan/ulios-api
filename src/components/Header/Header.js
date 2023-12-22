import React, { useState } from "react";
import BadgeCart from "../../components/BadgeCart/BadgeCart";
import Cart from "../../components/Cart/Cart";
import s from "./Header.module.css";
import Info from "../Info/Info";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  console.log(toggle);
  return (
    <>
      <header>
        <div className="container">
          <div className={s.header__nav}>
            <Info />
            <div className={s.header__cart}>
              <BadgeCart handleToggle={handleToggle} />
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={s.cart__wrapper}>
          <Cart toggle={toggle} handleToggle={handleToggle} />
        </div>
      </div>
    </>
  );
};

export default Header;
