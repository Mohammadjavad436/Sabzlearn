import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../validators/rules";

export interface Courses {
  _id: string;
  name: string;
  description: string;
  cover: string;
  support: string;
  shortName: string;
  price: number;
  isComplete: number;
  status: string;
  categoryID: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface courseCategoreis {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [categories, setCategories] = useState<courseCategoreis[]>([]);
  const [courseCategory, setCourseCategory] = useState<string>("-1");
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState<any | {}>({});
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  }

  const removeCourse = (courseID: string) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    swal({
      title: "?????? ???? ?????? ???????? ?????????????? ??????????",
      icon: "warning",
      buttons: ["????", "??????"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "???????? ?????????????? ???? ???????????? ?????? ????",
              icon: "success",
              closeOnEsc: true,
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "?????? ???????? ???? ?????????? ?????????? ????",
              icon: "error",
              closeOnEsc: true,
            });
          }
        });
      }
    });
  };

  const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseCategory(event.target.value);
  };
  const addNewCourse = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", courseCategory);
    formData.append("price", formState.inputs.price.value);
    formData.append("support", formState.inputs.support.value);
    formData.append("status", courseStatus);
    formData.append("cover", courseCover);

    if (courseCategory === "-1") {
      swal({
        title: "???????? ???????? ???????? ???????? ???? ???????????? ????????????",
        icon: "error",
        closeOnEsc: true,
      });
    } else {
      fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "???????? ???????? ???? ???????????? ?????????? ????",
            icon: "success",
            closeOnEsc: true,
          }).then(() => {
            getAllCourses();
          });
        }
      });
    }
  };
  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>???????????? ???????? ????????</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">?????? ????????</label>
                <Input
                  id="name"
                  element="input"
                  className=""
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), requiredValidator()]}
                  type="text"
                  placeholder="???????? ?????? ???????? ???? ???????? ????????..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">?????????????? ????????</label>
                <Input
                  id="description"
                  element="input"
                  className=""
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), requiredValidator()]}
                  type="text"
                  placeholder="???????? ?????????????? ???????? ???? ???????? ????????..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">Url ????????</label>
                <Input
                  id="shortName"
                  className=""
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), requiredValidator()]}
                  type="text"
                  placeholder="???????? Url ???????? ???? ???????? ????????..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">???????? ????????</label>
                <Input
                  id="price"
                  element="input"
                  className=""
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), requiredValidator()]}
                  type="text"
                  placeholder="???????? ???????? ???????? ???? ???????? ????????..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">???????? ???????????????? ????????</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), requiredValidator()]}
                  type="text"
                  className=""
                  placeholder="???????? ???????? ???????????????? ???????? ???? ???????? ????????..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">??????????????????? ????????</label>
                <select onChange={selectCategory}>
                  <option value="-1">???????? ???????? ???????? ???? ???????????? ????????</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">?????? ????????</label>
                <input
                  type="file"
                  id="file"
                  onChange={(event: any) => {
                    setCourseCover(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">?????????? ????????</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>???? ?????? ??????????????</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event: any) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>?????? ????????</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event: any) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="????????????"
                    onClick={(event) => addNewCourse(event)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="???????????????">
        <table className="table">
          <thead>
            <tr>
              <th>??????????</th>
              <th>??????????</th>
              <th>????????</th>
              <th>??????????</th>
              <th>????????</th>
              <th>????????</th>
              <th>???????? ????????</th>
              <th>????????????</th>
              <th>??????</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "????????????"
                    : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? "???? ?????? ??????????????" : "?????????? ??????"}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ????????????
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCourse(course._id)}
                  >
                    ??????
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
