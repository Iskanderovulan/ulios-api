import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/global.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import Home from "./layout/Home/Home";
import TokenTrueRoute from "./privateRoutes/TokenTrueRoute";
import TokenFalseRoute from "./privateRoutes/TokenFalseRoute";
import Auth from "./layout/Auth/Auth";
import Register from "./layout/Register/Register";
import Favorites from "./layout/Favorites/Favorites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TokenTrueRoute />}>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/auth" element={<TokenFalseRoute component={Auth} />} />
      <Route path="/reg" element={<TokenFalseRoute component={Register} />} />
    </Routes>
  );
};

export default App;
