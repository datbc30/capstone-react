import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACCESS_TOKEN, getStore, http, setStoreJson, USER_LOGIN } from "../../util/tools";

const initialState = {
  useRegister: {
    "email": "string",
    "password": "string",
    "name": "string",
    "gender": true,
    "phone": "string"
  },
  userLogin: setStoreJson(USER_LOGIN),
  ordersHistory: [],
};

const useReducer = createSlice({
  name: "useReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.useRegister = action.payload;
    },
    getLoginAction: (state,action)=>{
      state.userLogin = action.payload;
  },
  updateProfileAction: (state, action) => {
    state.useRegister = action.payload;
    state.ordersHistory = action.payload.ordersHistory;
  },
  },
});

export const { getProfileAction,getLoginAction,updateProfileAction } = useReducer.actions;

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

export const getLoginApi = (userLogin) => {
  console.log({userLogin});
  return async dispatch => {
      try {
          const result = await axios({
            url:"https://shop.cyberlearn.vn/api/Users/signin",
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
          data: JSON.stringify(userLogin)

          })
          //Lấy được thông tin profile => Đưa lên redux
          const action = getLoginAction(result.data.content);
          dispatch(action);
          //Lưu vào storage
          setStoreJson(USER_LOGIN,result.data.content);

      }catch(err) {
          console.log(err);
      }
  }
}

export const updateUserProfileApi = (data) => {
  return async (dispatch, getState) => {
    try {
      let url = "https://shop.cyberlearn.vn/api/Users/updateProfile";
      let token =
        "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIxOG1heXRpbmhtb2lAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVklFV19QUk9GSUxFIiwibmJmIjoxNjY0NTU0MDczLCJleHAiOjE2NjQ1NTc2NzN9.GqnR8y0H68rTm7Wb94UmuEDwynnE-k8hwxWZqAvLFS4";
      let headers = { Authorization: `Bearer ${token}` };
      const result = await axios.post(url, data, { headers });

      const action = updateProfileAction(result.data.content);
      dispatch(action);
    } catch (error) {}
  };
};

export const getUserProfileApi = () => {
  return async (dispatch, getState) => {
    try {
      let url = "https://shop.cyberlearn.vn/api/Users/getProfile";
      let token =
        "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIxOG1heXRpbmhtb2lAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVklFV19QUk9GSUxFIiwibmJmIjoxNjY0NTU0MDczLCJleHAiOjE2NjQ1NTc2NzN9.GqnR8y0H68rTm7Wb94UmuEDwynnE-k8hwxWZqAvLFS4";
      let headers = { Authorization: `Bearer ${token}` };
      const result = await axios.post(url, {}, { headers });

      const action = updateProfileAction(result.data.content);
      dispatch(action);
    } catch (error) {}
  };
};
