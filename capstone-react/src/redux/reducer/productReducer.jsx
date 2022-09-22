import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  arrProduct: [],
  productList: [],
  addToCart: 1
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      //Lấy dữ liệu từ payload
      const arrProduct = action.payload;
      //cập nhật lại state
      state.arrProduct = arrProduct;
    },
    getProductListAction: (state, action) => {
      const productList = action.payload;
      state.productList = productList;
    },
    addToCartAction : (state,action) => {
      const addToCart = action.payload
      state.addToCart = addToCart
    }
  },
});

export const { getProductAction, getProductListAction,addToCartAction } =
  productReducer.actions;

export default productReducer.reducer;

//---------------

export const getProductApi = () => {
  return async (dispatch2, getState) => {
    // console.log(getState())
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/product",
        method: "GET",
      });

      const action = getProductAction(result.data.content);
      dispatch2(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const getProductListApi = (id) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        method: "GET",
      });
      const action = getProductListAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};
