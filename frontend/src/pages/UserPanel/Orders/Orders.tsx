import React, { useEffect, useState } from "react";

import "./Orders.css";

export interface WeatherOrder {
  _id: string;
  course: Course;
  user: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Course {
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

export default function Orders() {
  const [orders, setOrders] = useState<WeatherOrder[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "{}").token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);

  return (
    <div className="col-9">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">شناسه</th>
              <th className="order__table-header-item">تاریخ</th>
              <th className="order__table-header-item">وضعیت</th>
              <th className="order__table-header-item">دوره</th>
              <th className="order__table-header-item">مبلغ</th>
              <th className="order__table-header-item">عملیات ها</th>
            </tr>
          </thead>
          <tbody className="order__table-body">
            {orders.map((order, index) => (
              <tr className="order__table-body-list">
                <td className="order__table-body-item">
                  <a href="#" className="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td className="order__table-body-item">
                  {order.createdAt.slice(0, 10)}
                </td>
                <td className="order__table-body-item">تکمیل شده</td>
                <td className="order__table-body-item">{order.course.name}</td>
                <td className="order__table-body-item">{order.price}</td>
                <td className="order__table-body-item">
                  <a className="order__table-body-btn" href="#">
                    نمایش
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
