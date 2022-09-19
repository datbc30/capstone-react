import React from "react";

export default function FooterHome() {
  return (
    <footer className="footer">
      <div className="footer-top  footer-element">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="item">
                <h2>Get help</h2>
                <ul>
                  <li>Contact us</li>
                  <li>Shopping</li>
                  <li>NIKEID</li>
                  <li>Nike+</li>
                </ul>
              </div>
            </div>
            <div className="col-4 middle">
              <div className="item">
                <h2>orders</h2>
                <ul>
                  <li>Payment options</li>
                  <li>Shipping and delivery</li>
                  <li>Returns</li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="item">
                <h2>register</h2>
                <p>
                  Create one account to manage everything you do with Nike, from
                  your shopping preferences to your Nike+ activity.
                </p>
                <a href="#">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom footer-element">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="item">
                <h2>email sign up</h2>
                <p>
                  Be the first to know about new products and special offers.
                </p>
                <a href="#">Sign up now</a>
              </div>
            </div>
            <div className="col-4 middle">
              <div className="item">
                <h2>gift cards</h2>
                <p>Give the gift that always fit.</p>
                <a href="#">View cards</a>
              </div>
            </div>
            <div className="col-4">
              <div className="item">
                <h2>stores near you</h2>
                <p>Locate a Nike retail store or authorized retailer.</p>
                <a href="#">Search</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
