import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getProductAPI,
  addToCart,
  changeQuantity,
} from "../../redux/reducer/productReducer";

export default function DetaiProduct(props) {
  const { productSelected, quantityBuy } = useSelector(
    (state) => state.productReducer
  );
  const { useReducer } = useSelector((state) => state.useReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let { id } = params;

    const action = getProductAPI(id);
    dispatch(action);
  }, [params.id]);

  const message = () => {
    alert('Add to cart successfully')
  }

  return (
    <div>
      <div>
        <section className="Product__Detail">
          <div className="container">
            <div id="detail" className="Detail-crs">
              <div className="img-product">
                <img src={productSelected.image} alt="..." />
              </div>
              <div className="Product__Detail__right">
                <div className="Product__Item">
                  <h1>{productSelected.name}</h1>
                </div>
                <div className="Product__Item">
                  <p>{productSelected.description}</p>
                </div>
                <div className="Product__Item">
                  <h2>{productSelected.alias}</h2>
                </div>
                <div className="Product__Item1">
                  {productSelected.size?.map((sizes, index) => {
                    return (
                      <div className="item-number" key={index}>
                        <button>{sizes}</button>
                      </div>
                    );
                  })}
                </div>
                <div className="Product__Item">
                  <p className="Item-monney">{productSelected.price}</p>
                </div>
                <div className="Product__Item__Button">
                  <button
                    onClick={() => {
                      dispatch(changeQuantity(true));
                    }}
                  >
                    +
                  </button>
                  <p>{quantityBuy}</p>
                  <button
                    onClick={() => {
                      dispatch(changeQuantity(false));
                    }}
                  >
                    -
                  </button>
                </div>
                <div className="Product__Item__Button2">
                  <button
                    className="btn-1"
                    onClick={() => {
                      message()
                      dispatch(
                        addToCart({ ...productSelected, quantityBuy })
                      );
                    }}
                  >
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
              {productSelected.relatedProducts?.map((prod, index) => {
                return (
                  <div className="col-lg-4 col-md-6 mt-5" key={index}>
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
