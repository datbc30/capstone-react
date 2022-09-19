import React from 'react'

export default function HeaderHome() {
  return (
    <header className="header">
  <div className="container">
    <div className="logo">
      <img src="./img/image3.png" alt="logo" />
    </div>
    <div className="user-interact">
      <div className="cart">
        <img src="./img/image8.png" alt="cart" />
        <span>(1)</span>
      </div>
      <div className="user-login">
        <a href="#">Login</a>
      </div>
      <div className="user-register">
        <a href="./resigter.html">Register</a>
      </div>
    </div>
  </div>
</header>

  )
}
