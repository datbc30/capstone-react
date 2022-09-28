import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function HeaderHome(props) {
  const {productSelected,arrCard } = useSelector((state) => state.productReducer);
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="./img/image3.png" alt="logo" />
        </div>
        <div className="user-interact">
          <div className="header-search">
            <i className="fa fa-search"></i>
            <NavLink to="/search">Search</NavLink>
          </div>
          <div className="cart">
            <img src="./img/image8.png" alt="cart" />
            <NavLink to={`/cart/${productSelected.id}`}>({arrCard})</NavLink>
          </div>
          <div className="user-login">
            <NavLink to="/login">Login</NavLink>
          </div>
          <div className="user-register">
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
