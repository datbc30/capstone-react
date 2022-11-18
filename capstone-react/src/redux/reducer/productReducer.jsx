import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

const initialState = {
  arrProduct: [],
  productSelected: {},
  productList: [],
  arrCart: [],
  quantityBuy: 1,
  oderDetail: []
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
    getProductSeleted: (state, action) => {
      state.productSelected = action.payload;
      console.log({ log: state.productSelected });
    },
    addToCart: (state, action) => {
      let index = state.arrCart.findIndex(
        (pro) => pro.id === action.payload.id
      );
      if (index !== -1) {
        state.arrCart[index].quantityBuy += state.quantityBuy;
      } else {
        let quantityBuy = state.quantityBuy;
        state.arrCart.push({ ...action.payload, quantityBuy });
      }
    },
    changeQuantity: (state, action) => {
      if (action.payload) {
        state.quantityBuy += 1;
      } else {
        if (state.quantityBuy > 1) {
          state.quantityBuy -= 1;
        }
      }
    },
    changeQuantityCart: (state, action) => {
      let { type, id } = action.payload;
      let index = state.arrCart.findIndex((pro) => pro.id === id);
      if (type) {
        state.arrCart[index].quantityBuy += 1;
      } else {
        if (state.arrCart[index].quantityBuy > 1) {
          state.arrCart[index].quantityBuy -= 1;
        } else {
          state.arrCart.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.arrCart = state.arrCart.filter(
        (pro) => pro.id !== action.payload
      );
    },
    addProductList: (state, action) => {
      console.log({ state, action });
    },
    oderDetailProduct: (state, action) => {
      state.oderDetail = action.payload;
      console.log({log :state.oderDetail});
    },
    clearCartsAction: (state, action) => {
      state.arrCart = action.payload;
    },
    pushProductOrders: (state, { payload }) => {
      let prod = { ...payload };
      let newArrProductsOrder = [...state.arrCart];
      let sp = newArrProductsOrder.find((p) => p.id === prod.id && Number(p.size) === Number(prod.size));
      if (sp) {
        sp.quantity += prod.quantity;
      } else {
        newArrProductsOrder.push(prod);
      }
      state.arrCart = newArrProductsOrder;
    },
  },
});

export const {
  getProductAction,
  getProductSeleted,
  addToCartAction,
  addProductList,
  oderDetailProduct,
  addToCart,
  changeQuantity,
  changeQuantityCart,
  clearCartsAction,
  pushProductOrders,
  removeFromCart
} = productReducer.actions;

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

export const getProductAPI = (id) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        method: "GET",
      });
      const action = getProductSeleted(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const getOderDetail = (oderDetail) => {
  return async (dispatch,getState) => {
    try{
      const result = await axios({
        url:"https://shop.cyberlearn.vn/api/Users/order",
        method:"POST",
      });
      const action = oderDetailProduct(result.content);
      dispatch(action)
    }
    catch(err) {
      console.log({err});
    }
  }
}
