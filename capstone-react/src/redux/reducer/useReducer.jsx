import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  useRegister: {
    "email": "string",
    "password": "string",
    "name": "string",
    "gender": true,
    "phone": "string"
  },
};

const useReducer = createSlice({
  name: "useReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.useRegister = action.payload;
    },
  },
});

export const { getProfileAction } = useReducer.actions;

export default useReducer.reducer;

export const getSignUpApi = (useRegister) => {
  return async (dispatch) => {
        try {
            const result = await axios({
                url: 'https://shop.cyberlearn.vn/api/Users/signup',
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(useRegister) 
            })
            return result.data.message
            
        }
        catch (err) {
            console.log({err});
            return err.response.data.message
        }
  };
};
