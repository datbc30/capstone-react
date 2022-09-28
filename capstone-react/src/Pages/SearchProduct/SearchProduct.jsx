import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";

export default function SearchProduct(props) {
  let keywordRef = useRef("");
  let [searchParams, setSearchParams] = useSearchParams();
  let [arrProduct, setArrProduct] = useState([]);
  let timeoutRef = useRef({});
  let navigate = useNavigate();
  const getProductByKeyword = async () => {
    try {
      let keyword = searchParams.get("keyword");
      if (keyword.trim() !== "" && keyword !== null) {
        let result = await axios({
          url: "https://shop.cyberlearn.vn/api/Product?keyword=" + keyword,
          method: "GET",
        });
        console.log(result.data.content);
        setArrProduct(result.data.content);
        clearTimeout(timeoutRef.current);
      } else {
        setArrProduct([]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getProductByKeyword();
  }, [keywordRef.current]);

  const handleChange = (e) => {
    keywordRef.current = e.target.value;
    timeoutRef.current = setTimeout(() => {
      setSearchParams({ keyword: keywordRef.current });
    }, 1000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //Đưa dữ liệu keyword người dùng nhập lên url
    // setSearchParams({ keyword: keywordRef.current });
  };
  const renderProductByKeyword = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-4" key={index}>
          <div className="card">
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
      <div>
        <div className="searchlayout-top">
          <form
            action=""
            id="form-search"
            className="form"
            onSubmit={handleSubmit}
          >
            <input type="text" id="keywordRef" onChange={handleChange} />
            <button className="btn-search">Search</button>
          </form>
        </div>
        <div className="searchlayout-bottom">
          <div className="text-result">
            <div className="search-title">
              <h3>Search Result</h3>
            </div>
            <div className="search-price">
              <div className="search-price-title">
                <h4>Price</h4>
              </div>
              <div className="search-price-sort">
                <select className="form-select" aria-label="Default select example">
                  {/* <option selected>decrease</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </select>
                <select className="form-select" aria-label="Default select example">
                  {/* <option selected>ascending</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </select>
              </div>
            </div>
            <div className="listProduct">
              <div className="container">
                <div className="row">{renderProductByKeyword()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
