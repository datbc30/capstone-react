import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAPI } from "../../redux/reducer/productReducer";

export default function CartProduct(props) {
  

  return (
    <div className="cartProduct">
      <div className="container">
        <div className="title-cart">
          <h3>Carts</h3>
          <hr />
        </div>
        <div className="table-cart">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>id</th>
                <th>img</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>totall</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="t-body">
              <tr>
                <td></td>
                <td></td>
                <td>
                  <img src="" alt="..." width={50} />
                </td>
                <td>1</td>
                <td>1</td>
                <td className="d-flex td-quantity">
                  <button className="button-quantity">+</button>
                  <p className="text-quantity">1</p>
                  <button className="button-quantity">-</button>
                </td>
                <td>1000</td>
                <td>
                  <button className="btn btn-danger text-dark">delete</button>
                  <button className="btn btn-success text-dark">edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
