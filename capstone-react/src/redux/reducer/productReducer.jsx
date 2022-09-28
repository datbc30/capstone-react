import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  arrProduct: [],
  productSelected: {},
  arrCart:[],
  quantityBuy:1,
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
      state.productSelected = action.payload
      console.log({log:state.productSelected});
    },
    addToCartAction: (state, action) => {
      console.log({state,action});
      const index = state.arrCart.findIndex((sp) => sp.id === action.payload.id)
      if(index !== -1) {
        state.arrCart[index].quantityBuy += state.quantityBuy
      }
      else {
        const quantityBuy = state.quantityBuy
        state.arrCart.push({...action.payload, quantityBuy})
        console.log({arrCart:state.arrCart});
      }
    },
  },
});

export const {
  getProductAction,
  getProductSeleted,
  addToCartAction,
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


