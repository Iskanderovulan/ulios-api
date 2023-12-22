import React from "react";
import { Link } from "react-router-dom";
import s from "./Footer.module.css";
import instagram from "../../images/instagram-1-svgrepo-com.svg";
import facebook from "../../images/facebook-color-svgrepo-com.svg";
import telegram from "../../images/telegram-svgrepo-com.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={s.footer__wrap}>
          <p>All rights reserved 2023</p>
          <ul className={s.footer__social}>
            <li>
              <Link
                to="https://www.instagram.com/burgerhouse_kg/"
                target="_blank"
              >
                <img src={instagram} alt="Instagram" />
              </Link>
            </li>
            <li>
              <Link to="https://www.facebook.com/burgerhousekg" target="_blank">
                <img src={facebook} alt="Facebook" />
              </Link>
            </li>
            <li>
              <Link to="https://t.me/burgerhouse24_7" target="_blank">
                <img src={telegram} alt="Telegram" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
