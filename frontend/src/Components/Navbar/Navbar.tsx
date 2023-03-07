import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "./Navbar.css";
// import { ContextProps } from "../../context/authContext";

export default function Navbar(): JSX.Element {
  const authcontext = useContext(AuthContext);
  const [allMenus, setAllMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((data) => {
        setAllMenu(data);
      });
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <Link to="/">
              <img
                src="/images/logo/Logo.png"
                className="main-header__logo"
                alt="لوگوی سبزلرن"
              />
            </Link>

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>

              {allMenus.map((menu: any) => (
                <li className="main-header__item " key={menu._id}>
                  <Link to={`${menu.href}/1`} className="main-header__link">
                    {menu.title}
                    {menu.submenus.length !== 0 && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {menu.submenus.map((submenu: any) => (
                            <li
                              className="main-header__dropdown-item"
                              key={submenu._id}
                            >
                              <Link
                                to={submenu.href}
                                className="main-header__dropdown-link"
                              >
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>

            {authcontext.isLoggedIn === true ? (
              <Link
                to={
                  authcontext.userInfos?.role === "ADMIN"
                    ? "/p-admin"
                    : "/my-account"
                }
                className="main-header__profile"
              >
                <span className="main-header__profile-text">
                  {authcontext.userInfos?.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">ورود/ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
