import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImageUrl from "../../assets/img/user.png";
import { getUserProfileApi, updateUserProfileApi } from "../../redux/reducer/useReducer";

const ProfileProduct = (props) => {
  const { useRegister, ordersHistory } = useSelector((state) => state.useReducer);
  console.log(ordersHistory);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(undefined);

  useEffect(() => {
    dispatch(getUserProfileApi());
  }, []);

  useEffect(() => {
    setEmail(useRegister.email);
    setName(useRegister.name);
    setPhone(useRegister.phone);
    setPassword(useRegister.password ?? "");
    setGender(useRegister.gender);
  }, [useRegister.email, useRegister.name, useRegister.phone, useRegister.password, useRegister.gender]);

  const onUpdate = () => {
    dispatch(updateUserProfileApi({ email, password, name, gender, phone }));
  };

  return (
    <>
      <div className="profile">
        <div className="profile__title">Profile</div>
        <div className="profile__form">
          <div className="profile__left">
            <img src={UserImageUrl} alt="user" />
          </div>

          <div className="profile__right">
            <div className="profile__group">
              <div className="profile__field">
                <div className="profile__field-title">Email</div>
                <input className="profile__field-input" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
              </div>

              <div className="profile__field">
                <div className="profile__field-title">Phone</div>
                <input className="profile__field-input" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" />
              </div>
            </div>

            <div className="profile__group">
              <div className="profile__field">
                <div className="profile__field-title">name</div>
                <input className="profile__field-input" value={name} onChange={(e) => setName(e.target.value)} type="text" />
              </div>

              <div className="profile__field">
                <div className="profile__field-title">password</div>
                <input className="profile__field-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <div className="profile__field-title">Gender</div>
                  <div>
                    <input type="radio" checked={gender === true} onClick={() => setGender(true)} />
                    Male
                  </div>
                  <div>
                    <input type="radio" checked={gender === false} onClick={() => setGender(false)} />
                    Femail
                  </div>
                </div>
                <div className="profile__button" onClick={() => onUpdate()}>
                  Update
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__tab">
          <div>Order history</div>
          <div>Favourite</div>
        </div>
        {ordersHistory.map((item) => {
          let date = new Date(item.date);
          let month = date.getMonth() > 10 ? date.getMonth().toString() : "0" + date.getMonth();
          let dayOftheMonth = date.getDate() > 10 ? date.getDate().toString() : "0" + date.getDate();
          console.log(date);
          return (
            <div className="profile__product">
              <p>+ Orders have been placed on {month + " - " + dayOftheMonth + " - " + date.getFullYear()}</p>
              <table width={"100%"}>
                <tr>
                  <th style={{ width: "100px", paddingLeft: "82px" }}>id</th>
                  <th style={{ width: "100px" }}>img</th>
                  <th style={{ width: "200px" }}>name</th>
                  <th style={{ width: "200px" }}>price</th>
                  <th style={{ width: "200px" }}>quantity</th>
                  <th style={{ width: "200px" }}>total</th>
                </tr>
                <tr>
                  <td style={{ width: "100px", paddingLeft: "82px" }}>{item.id}</td>
                  <td>
                    <img width={85} height={56} src={item.orderDetail[0].image} alt="" />
                  </td>
                  <td>{item.orderDetail[0].name}</td>
                  <td>{item.orderDetail[0].price}</td>
                  <td>
                    {" "}
                    <input value={item.orderDetail[0].quantity} type="text" />
                  </td>
                  <td>{item.orderDetail[0].quantity * item.orderDetail[0].price}</td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileProduct;
