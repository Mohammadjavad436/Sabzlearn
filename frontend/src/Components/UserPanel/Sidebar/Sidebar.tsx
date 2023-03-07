import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AuthContext from "../../../context/authContext";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault();

    swal({
      title: "آیا از خروج اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      console.log(result);
      if (result) {
        swal({
          title: "با موفقیت خارج شدید",
          icon: "success",
          closeOnEsc: true,
        }).then(() => {
          authContext.logout();
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="col-3">
      <div className="sidebar">
        <span className="sidebar__name">محمدامین سعیدی راد</span>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to="">
              پیشخوان
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="orders">
              سفارش
            </Link>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              کیف پول من
            </a>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="edit-accuont">
              جزئیات حساب کاربری
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="courses">
              دوره های خریداری شده
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="Tickets">
              تیکت های پشتیبانی
            </Link>
          </li>
          <li className="sidebar__item" onClick={(event) => logoutUser(event)}>
            <a className="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
