import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HeaderHome() {
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
        <span>()</span>
      </div>
      <div className="user-login">
        <NavLink to="/register">Login</NavLink>
      </div>
      <div className="user-register">
        <a href="./resigter.html">Register</a>
      </div>
    </div>
  </div>
</header>

  )
}
