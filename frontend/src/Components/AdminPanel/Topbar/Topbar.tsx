import React, { useState, useEffect, useCallback } from "react";

export interface UserEntry {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profile: string;
  phone: string;
  courses?: CoursesEntity[] | null;
  notifications?: NotificationsEntity[] | null;
}
export interface CoursesEntity {
  _id: string;
  name: string;
  description: string;
  cover: string;
  shortName: string;
  categoryID: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isComplete: number;
  support: string;
  price: number;
  status: string;
}
export interface NotificationsEntity {
  msg: string;
  _id: string;
}

export default function Topbar() {
  const [useDataInfos, setUseDataInfos] = useState<UserEntry>();
  const [adminNotifications, setAdminNotifications] = useState<
    NotificationsEntity[]
  >([]);
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);

  function getAllNotfication() {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUseDataInfos(userData);
        setAdminNotifications(userData.notifications);
      });
  }

  useEffect(() => {
    getAllNotfication();
  }, []);
  function seeNotifcation(notificationId: number | string) {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");

    fetch(`http://localhost:4000/v1/notifications/see/${notificationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        getAllNotfication();
      });
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            isShowNotificationsBox && "active-modal-notfication"
          }`}
        >
          <div className="home-right">
            <div className="home-searchbar ">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div
              className="home-notification"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
            >
              <button type="button">
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
              onMouseLeave={() => setIsShowNotificationsBox(false)}
            >
              <ul className="home-notification-modal-list">
                {adminNotifications.length === 0 ? (
                  <li className="home-notification-modal-item">
                    هیچ نوتیفکیشنی برای نمایش وجود ندارد
                  </li>
                ) : (
                  <>
                    {adminNotifications.map((notification) => (
                      <li
                        className="home-notification-modal-item"
                        key={notification._id}
                      >
                        <span className="home-notification-modal-text">
                          {notification.msg}
                        </span>
                        <label className="switch">
                          <a
                            href="javascript:void(0)"
                            onClick={() => seeNotifcation(notification._id)}
                          >
                            دیدم
                          </a>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src="/images/profile.png" alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{useDataInfos?.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
