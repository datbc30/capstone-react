import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductApi } from "../../redux/reducer/productReducer";
import { NavLink, useNavigate } from "react-router-dom";

export default function IndexProduct() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  console.log(arrProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllProductApi = () => {
    const actionThunk = getProductApi();
    dispatch(actionThunk);
  };
  useEffect(() => {
    getAllProductApi();
  }, []);
  const renderSplice = () => {
    return arrProduct.map((item, index) => {
      if (index === 0 || arrProduct.length === 1) {
        return (
          <div className="carousel-item active" key={index}>
            <div className="carousel-item-content">
              <div className="carousel-left">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="carousel-right">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <NavLink className="btn" to={`/detail/${item.id}`}>
                  View detail
                </NavLink>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="carousel-item" key={index}>
            <div className="carousel-item-content">
              <div className="carousel-left">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="carousel-right">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <NavLink className="btn" to={`/detail/${item.id}`}>
                  View detail
                </NavLink>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  const renderProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-4" key={index}>
          <div className="card">
            <a href="#">
              <i class="far fa-heart"></i>
            </a>
            <img src={item.image} alt={item.name} />
            <div className="card-body">
              <h2>{item.name}</h2>
              <p>{item.price}</p>
            </div>
            <div className="card-footer">
              <NavLink className="btn" to={`/detail/${item.id}`}>
                View detail
              </NavLink>

              <span
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                Detail
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <section className="slider">
        <div className="container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div id="product-carousel" className="carousel-inner">
              {renderSplice()}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <section className="product-feature">
        <div className="text-feature">
          <h1>Product Feature</h1>
        </div>
        <div className="container">
          <div id="feature" className="row">
            {renderProduct()}
          </div>
        </div>
      </section>
    </div>
  );
}
