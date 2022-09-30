import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getSignUpApi } from "../../redux/reducer/useReducer";
import { useNavigate } from "react-router-dom";

export default function RegisterProduct(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      gender:"",
      name: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống !")
        .email("Email không đúng định dạng !"),
      password: Yup.string().required("password không được bỏ trống !"),
      passwordConfirm: Yup.string().required("password không được để trống !"),
      name: Yup.string().required("name không được để trống !"),
      phone: Yup.string().required("phone không được để trống !"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const message = await dispatch(getSignUpApi(values))
      navigate('/login')
      alert ('đăng kí thành công')

    }
  });

  return (
    <div>
      <section className="register" id="register">
        <div className="container">
          <div className="title">
            <p>Register</p>
          </div>
          <hr />
          <form
            className="form"
            id="formRegister"
            onSubmit={frm.handleSubmit}
          >
            <div className="reg-content">
              <div className="reg-left">
                <div className="material-form-field">
                  {/* <h3 className="text-start">Email</h3> */}
                  <input
                    id="email"
                    type="email"
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
                  <label
                    className="material-form-field-label"
                    htmlFor="field-text"
                  >
                    Email
                  </label>
                  <span className="text-danger" id="tbEmail" />
                </div>
                <div className="material-form-field">
                  <input
                    id="password"
                    type="password"
                    required
                    maxLength={10}
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.password ? (
                    <span className="text-danger">{frm.errors.password}</span>
                  ) : (
                    ""
                  )}
                  <label
                    className="material-form-field-label"
                    htmlFor="field-text"
                  >
                    Password
                  </label>
                  <span className="text-danger" id="tbPassword" />
                </div>
                <div className="material-form-field">
                  <input
                    id="passwordConfirm"
                    type="password"
                    required
                    maxLength={10}
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.passwordConfirm ? (
                    <span className="text-danger">
                      {frm.errors.passwordConfirm}
                    </span>
                  ) : (
                    ""
                  )}
                  <label
                    className="material-form-field-label"
                    htmlFor="field-text"
                  >
                    Password Confirm
                  </label>
                  <span className="text-danger" id="tbConfirm" />
                </div>
              </div>
              <div className="reg-right">
                <div className="material-form-field">
                  <input
                    id="name"
                    type="text"
                    required
                    pattern="[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.name ? (
                    <span className="text-danger">{frm.errors.name}</span>
                  ) : (
                    ""
                  )}
                  <label
                    className="material-form-field-label"
                    htmlFor="field-text"
                  >
                    Name
                  </label>
                  <span className="text-danger" id="tbName" />
                </div>
                <div className="material-form-field">
                  <input
                    id="phone"
                    maxLength={10}
                    required
                    // pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.phone ? (
                    <span className="text-danger">{frm.errors.phone}</span>
                  ) : (
                    ""
                  )}
                  <label
                    className="material-form-field-label"
                    htmlFor="field-text"
                  >
                    Phone
                  </label>
                  <span className="text-danger" id="tbPhone" />
                </div>
                <div id="gender" className="gender">
                  <label>Gender</label>
                  <div className="radio gender_inp">
                    <input
                      id="male"
                      type="radio"
                      name="selector"
                      defaultValue="male"
                      defaultChecked
                    />
                    <label className="radio-label" htmlFor="male">
                      Male
                    </label>
                    <input
                      id="female"
                      type="radio"
                      name="selector"
                      defaultValue="female"
                    />
                    <label className="radio-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
                <button id="submit" className="btn-submit" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
