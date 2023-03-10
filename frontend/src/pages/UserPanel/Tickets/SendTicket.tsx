import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "./SendTicket.css";
export interface WeatherDepartment {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface WeatherdepartmentsSubs {
  _id: string;
  title: string;
  parent: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function SendTicket() {
  const [departments, setDepartments] = useState<WeatherDepartment[]>([]);
  const [departmentsSubs, setDepartmentsSubs] = useState<
    WeatherdepartmentsSubs[]
  >([]);
  const [courses, setCourses] = useState<any>([]);
  const [ticketTypeID, setTicketTypeID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [body, setBody] = useState("");
  const [courseID, setCourseID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data));

    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "{}").token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const getDepartmentsSub = (departmentID: string) => {
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((subs) => setDepartmentsSubs(subs));
  };

  const sendTicket = (event: any) => {
    event.preventDefault();

    const newTicketInfos = {
      departmentID,
      departmentSubID: ticketTypeID,
      title,
      priority,
      body,
      course: courseID.length ? courseID : undefined,
    };

    fetch(`http://localhost:4000/v1/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "{}").token
        }`,
      },
      body: JSON.stringify(newTicketInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "???????? ???? ???????????? ?????????? ????",
          icon: "success",
          closeOnEsc: true,
        }).then(() => {
          navigate("/my-account/Tickets");
        });
      }
    });
  };

  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">?????????? ???????? ????????</span>
          <a className="ticket-header__link" href="#">
            ?????? ???????? ????
          </a>
        </div>
        <form className="ticket-form" action="#">
          <div className="row">
            <div className="col-6">
              <label className="ticket-form__label">
                ???????????????? ???? ???????????? ????????:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => {
                  getDepartmentsSub(event.target.value);
                  setDepartmentID(event.target.value);
                }}
              >
                <option className="ticket-form__option">
                  ???????? ???? ???????? ???? ???????????? ????????????.
                </option>
                {departments.map((department) => (
                  <option value={department._id}>{department.title}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="ticket-form__label">
                ?????? ???????? ???? ???????????? ????????:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => setTicketTypeID(event.target.value)}
              >
                <option className="ticket-form__option">
                  ???????? ???? ???????? ???? ???????????? ????????????.
                </option>
                {departmentsSubs.map((sub) => (
                  <option value={sub._id}>{sub.title}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="ticket-form__label">
                ?????????? ???????? ???? ???????? ????????:
              </label>
              <input
                className="ticket-form__input"
                type="text"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="ticket-form__label">
                ?????? ???????????? ???????? ???? ???????????? ????????:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => setPriority(event.target.value)}
              >
                <option className="ticket-form__option">
                  ???????? ???? ???????? ???? ???????????? ????????????.
                </option>
                <option value="3">????</option>
                <option value="2">??????????</option>
                <option value="1">????????</option>
              </select>
            </div>
            {ticketTypeID === "63b688c5516a30a651e98156" && (
              <div className="col-6">
                <label className="ticket-form__label">
                  ???????? ???? ???????????? ????????:
                </label>
                <select
                  className="ticket-form__select"
                  onChange={(event) => setCourseID(event.target.value)}
                >
                  <option className="ticket-form__option">
                    ???????? ???? ???????? ???? ???????????? ????????????.
                  </option>
                  {courses.map((course: any) => (
                    <option value={course._id} key={course._id}>
                      {course.course.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="col-12">
              <label className="ticket-form__label">
                ???????????? ???????? ???? ???????? ????????????:
              </label>
              <textarea
                className="ticket-form__textarea"
                onChange={(event) => setBody(event.target.value)}
              ></textarea>
            </div>
            <div className="col-12">
              <div className="ticket-form__file">
                <span className="ticket-form__file-max">
                  ???????????? ????????????: 6 ??????????????
                </span>
                <span className="ticket-form__file-format">
                  ????????????????? ????????: jpg, png.jpeg, rar, zip
                </span>
                <input className="ticket-form__file-input" type="file" />
              </div>
            </div>
            <div className="col-12">
              <button className="ticket-form__btn" onClick={sendTicket}>
                <i className="ticket-form__btn-icon fa fa-paper-plane"></i>
                ?????????? ????????
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
