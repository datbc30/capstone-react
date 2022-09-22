import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { addToCartAction, getProductListApi } from "../../redux/reducer/productReducer";

export default function DetaiProduct() {
  const { productList,addToCart } = useSelector((state) => state.productReducer);
  console.log(productList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number,setNumber] = useState(1)

  const params = useParams();

  console.log(addToCart);

  useEffect(() => {
    let { id } = params;

    const action = getProductListApi(id);
    dispatch(action);
  }, [params.id]);

  const handleNumber = () => {
    setNumber(number + 1)
  }
  const handleDownNumber = () => {
    setNumber(number - 1)
  }

  

  return (
    <div>
      <div>
        <section className="Product__Detail">
          <div className="container">
            <div id="detail" className="Detail-crs">
              <div className="img-product">
                <img src={productList.image} alt="..." />
              </div>
              <div className="Product__Detail__right">
                <div className="Product__Item">
                  <h1>{productList.name}</h1>
                </div>
                <div className="Product__Item">
                  <p>{productList.description}</p>
                </div>
                <div className="Product__Item">
                  <h2>{productList.alias}</h2>
                </div>
                <div className="Product__Item1">
                  {productList.size?.map((sizes,index) => {
                    return <div className="item-number" key={index}>
                      <button>{sizes}</button>
                    </div>
                  })}
                </div>
                <div className="Product__Item">
                  <p className="Item-monney">{productList.price}</p>
                </div>
                <div className="Product__Item__Button">
                  <button onClick={handleNumber}>+</button>
                  <p>{number}</p>
                  <button onClick={handleDownNumber}>-</button>
                </div>
                <div className="Product__Item__Button2">
                  <button className="btn-1" onClick={() => {
                    const actionCart = addToCartAction(addToCart + number)
                    dispatch(actionCart)
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="Relate__Product">
          <div className="container">
            <div className="Relate__text text-center">
              <h1>-Realate Product -</h1>
            </div>
            <div id="relate" className="row">
              {productList.relatedProducts?.map((prod, index) => {
                return (
                  <div className="col-4 mt-5" key={index}>
                    <div className="card">
                      <img src={prod.image} alt="..." />
                    </div>
                    <div className="card-body">
                      <h2>{prod.name}</h2>
                      <p>{prod.shortDescription}</p>
                    </div>
                    <div className="card-footer">
                      <NavLink
                        className="btn btn-secondary"
                        to={`/detail/${prod.id}`}
                      >
                        View detail
                      </NavLink>
                      <span>{prod.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
