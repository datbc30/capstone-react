import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOderDetail, getProductAPI, oderDetailProduct } from "../../redux/reducer/productReducer";
import { getStore, USER_LOGIN } from "../../util/tools";

export default function CartProduct(props) {
  const { arrCart, oderDetail } = useSelector((state) => state.productReducer);
  console.log(arrCart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [stateProduct, setStateProduct] = useState({
    productList: [],
  });

  const updateProductList = (productSelected) => {
    let testObj = [...stateProduct.productList];
    const index = testObj.findIndex((sp) => sp.id === productSelected.id);
    if (index === -1) {
      testObj.push(productSelected);
      setStateProduct({
        ...stateProduct,
        productList: testObj,
      });
    }
    console.log(stateProduct);
    console.log(stateProduct.productList);
  }

  useEffect(() => {
    if(getStore(USER_LOGIN) === 'undefined'){
      alert('yêu cầu bạn hãy đăng nhập ')
      return navigate('/login')
    }
    updateProductList(arrCart);

    const action = getOderDetail()
    dispatch(action)
    
  },[])
  const renderCartProduct = () => {
   
    return arrCart.map((cart, index) => {
      return (
        <tr key={index}>
          <td></td>
          <td>{cart.id}</td>
          <td>
            <img src={cart.image} alt="..." width={50} />
          </td>
          <td>{cart.name}</td>
          <td>{cart.price}</td>
          <td className="d-flex td-quantity">
            <button className="button-quantity1">+</button>
            <p className="text-quantity">1</p>
            <button className="button-quantity2">-</button>
          </td>
          <td>{cart.price}</td>
          <td>
            <button className="btn-delete">delete</button>
            <button className="btn-edit">edit</button>
          </td>
        </tr>
      );
    });
  };

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
              {renderCartProduct()}
            </tbody>
          </table>
          <div className="btn-submit">
            <button className="btn btn-success" onClick={()=>{
              dispatch(oderDetailProduct({...oderDetail}))
            }}>Submit Oder</button>
          </div>
        </div>
      </div>
    </div>
  );
}
