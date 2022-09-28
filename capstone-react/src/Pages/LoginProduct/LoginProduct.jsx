import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSignUpApi } from "../../redux/reducer/useReducer";

export default function LoginProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email không được để trống !")
        .email("email không đúng địng dạng !"),
      password: Yup.string()
        .required("password không được để trống !")
        .min(6, "phải từ 6 kí tự trở lên (bao gồm số và chữ cái)"),
    }),
    // onSubmit: async (values) => {
    //   console.log(values);
    //   const message = await dispatch(getSignUpApi(values));
    //   navigate("/home");
    //   alert(message);
    // },
  });
  return (
    <section>
      <div className="container">
        <div className="login-title">
          <h3>Login</h3>
          <hr />
        </div>
        <form
          className="form"
          id="formLogin"
          onSubmit={frm.handleSubmit}
        >
          <div className="formlable">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.email ? (
                <span className="text-danger">{frm.errors.email}</span>
              ) : (
                ""
              )}
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                required
                minLength={6}
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.password ? (
                <span className="text-danger">{frm.errors.password}</span>
              ) : (
                ""
              )}
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="button-login">
              <a href="" className="register-now">
                Register Now?
              </a>
              <button className="btn-submit" type="submit" id="submit">Login</button>
            </div>
            <div className="loginInFacebook">
              <button className="lg-face">
                <i className="fab fa-facebook"></i>
                continue in facebook
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
