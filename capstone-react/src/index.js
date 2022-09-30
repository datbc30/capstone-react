import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/configStore';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import IndexProduct from './Pages/IndexProduct/IndexProduct';
import DetailProduct from './Pages/DetailProduct/DetaiProduct'
import './assets/scss/styles.scss'
import RegisterProduct from './Pages/RegisterProduct/RegisterProduct';
import SearchProduct from './Pages/SearchProduct/SearchProduct';
import CartProduct from './Pages/CartProduct/CartProduct';
import LoginProduct from './Pages/LoginProduct/LoginProduct';
import ProfileProduct from './Pages/ProfileProduct/ProfileProduct';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />}>
          <Route index element={<IndexProduct />}></Route>
          <Route path='home' element={<IndexProduct />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<DetailProduct />}></Route>
          </Route>
          <Route path='cart'>
            <Route path=':id' element={<CartProduct />}></Route>
          </Route>
          <Route path='register' element={<RegisterProduct />}></Route>
          <Route path='search' element={<SearchProduct />}></Route>
          <Route path='login' element={<LoginProduct />}></Route>
          <Route path='profile' element={<ProfileProduct />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
