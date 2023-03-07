import React, { useEffect, useState } from "react";
import Input from "../../../Components/Form/Input";
import { minValidator, requiredValidator } from "../../../validators/rules";
import { useForm } from "../../../hooks/useForm";

import { Courses } from "../Courses/Courses";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export interface WeatherOffs {
  _id: string;
  code: string;
  percent: string;
  course: string;
  max: number;
  uses: number;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Offs() {
  const [course, setCourse] = useState<Courses[]>([]);
  const [Offs, setOffs] = useState<WeatherOffs[]>([]);
  const [OffCourse, setOffCourse] = useState("-1");

  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourse) => setCourse(allCourse));
    getAllOffs();
  }, []);

  function getAllOffs() {
    fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "{}").token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        setOffs(allOffs);
      });
  }

  const createOff = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();

    const newOffInfos = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: OffCourse,
      max: formState.inputs.max.value,
    };

    fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "{}").token
        }`,
      },
      body: JSON.stringify(newOffInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کد تخفیف مورد نظر با موفقیت ایجاد شد",
          icon: "success",
          closeOnEsc: true,
        }).then(() => {
          getAllOffs();
        });
      }
    });
  };

  const removeOffs = (offID: string) => {
    swal({
      title: "ایا ازحذف کد تخفیف اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کد تخفیف با موفقیت حذف شد",
              icon: "success",
              closeOnEsc: true,
            }).then(() => {
              getAllOffs();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">کد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[requiredValidator(), minValidator(4)]}
                  placeholder="لطفاکد تخفیف را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="price input">
                <label className="input-title">درصد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[requiredValidator()]}
                  placeholder="لطفا درصد تخفیف را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">حداکثر استفاده کد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="max"
                  validations={[requiredValidator()]}
                  placeholder="لطفا حداکثر استفاده از کد  تخفیف را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  className="select"
                  onChange={(event) => setOffCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {course.map((course) => (
                    <option value={course._id}>{course.name}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={(event) => createOff(event)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>

              <th>کد تخفیف</th>

              <th>درصد تخفیف</th>
              <th>حداکثر استفاده</th>
              <th>تعداد استفاده</th>
              <th>ایجاد کننده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {Offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.creator}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeOffs(off._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
