import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import "./Category.css";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { coureseEntris } from "../../Components/LastCourses/LastCourses";

export default function Category() {
  const { categoryName } = useParams();
  const [ShownCourses, setShownCourses] = useState<coureseEntris[]>([]);
  const [orderedCourses, setOrderedCourses] = useState<coureseEntris[]>([]);

  const [coureseCategory, setCoureseCategory] = useState<coureseEntris[] | []>(
    []
  );
  const [status, setStatus] = useState("default");
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [searchValue, setsSearchValue] = useState("");
  const [coursesDisplayType, setCoursesDisplayType] = useState("row");

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "{}").token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCoureseCategory(allCourses);
        setOrderedCourses(allCourses);
      });
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourse = coureseCategory.filter(
          (course) => course.price === 0
        );
        setOrderedCourses(freeCourse);
        break;
      }
      case "money": {
        const moneyCourse = coureseCategory.filter(
          (course) => course.price !== 0
        );
        setOrderedCourses(moneyCourse);
        break;
      }
      case "first": {
        const reversedCourses = coureseCategory.slice().reverse();
        setOrderedCourses(reversedCourses);
        break;
      }
      case "last": {
        setOrderedCourses(coureseCategory);
        break;
      }
      default: {
        setOrderedCourses(coureseCategory);
      }
    }
  }, [statusTitle]);

  const statusTitleChangeHandler = (event: any) => {
    setStatusTitle(event.target.textContent);
  };

  const onChangSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsSearchValue(event.target.value);

    let filterCourses = coureseCategory.filter((course) =>
      course.name.includes(event.target.value)
    );
    setOrderedCourses(filterCourses);
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {coureseCategory.length === 0 ? (
                  <div className="alert alert-warning">
                    هنوز هیچ دوره‌ای برای این دسته بندی وجود ندارد
                  </div>
                ) : (
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div
                          className={`courses-top-bar__row-btn ${
                            coursesDisplayType === "row"
                              ? "courses-top-bar__icon--active"
                              : ""
                          }`}
                          onClick={() => setCoursesDisplayType("row")}
                        >
                          <i className="fas fa-border-all courses-top-bar__icon"></i>
                        </div>
                        <div
                          className={`courses-top-bar__column-btn ${
                            coursesDisplayType === "column"
                              ? "courses-top-bar__icon--active"
                              : ""
                          }`}
                          onClick={() => setCoursesDisplayType("column")}
                        >
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {statusTitle}
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li
                              className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                              onClick={(event) => {
                                setStatus("مرتب سازی پیش فرض");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی پیش فرض
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("free");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس رایگان
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("money");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس پولی
                            </li>{" "}
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("frist");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس اولین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("last");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس آخرین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("cheap");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس ارزان ترین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("expensive");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس گران ترین
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            value={searchValue}
                            onChange={(event) => onChangSearchValue(event)}
                          />
                          <i className="fas fa-search courses-top-bar__search-icon"></i>
                        </form>
                      </div>
                    </div>

                    {orderedCourses.length === 0 ? (
                      <div className="alert alert-warning">
                        هیچ
                        {`  `}
                        {statusTitle}
                        {`  `}
                        وجود ندارد
                      </div>
                    ) : (
                      <>
                        {coursesDisplayType === "row" ? (
                          <>
                            {ShownCourses.map((course: coureseEntris) => (
                              <CourseBox {...course} />
                            ))}
                          </>
                        ) : (
                          <>
                            {ShownCourses.map((course) => (
                              <div className="col-12">
                                <div className="course-box">
                                  <div className="course__box-header">
                                    <div className="course__box-right">
                                      <a
                                        className="course__box-right-link"
                                        href="#"
                                      >
                                        <img
                                          src="/images/courses/fareelancer.png"
                                          className="course__box-right-img"
                                        />
                                      </a>
                                    </div>
                                    <div className="course__box-left">
                                      <div className="course__box-left-top">
                                        <a
                                          href="#"
                                          className="course__box-left-link"
                                        >
                                          {course.name}
                                        </a>
                                      </div>
                                      <div className="course__box-left-center">
                                        <div className="course__box-left-teacher">
                                          <i className="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                          <span className="course__box-left-name">
                                            محمد امین سعیدی راد
                                          </span>
                                        </div>
                                        <div className="course__box-left-stars">
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                        </div>
                                      </div>
                                      <div className="course__box-left-bottom">
                                        <div className="course__box-left-des">
                                          <p>
                                            {course.description}
                                            {` `}
                                            لورم ایپسوم متن ساختگی با تولید
                                            سادگی نامفهوم از صنعت چاپ، و با
                                            استفاده از طراحان گرافیک است،
                                            چاپگرها و متون بلکه روزنامه و مجله
                                            در ستون و سطرآنچنان که لازم است، و
                                            برای شرایط فعلی تکنولوژی مورد نیاز،
                                            و کاربردهای متنوع با هدف بهبود
                                            ابزارهای کاربردی می باشد، کتابهای
                                            زیادی در شصت و سه درصد گذشته حال و
                                            آینده، شناخت فراوان جامعه و متخصصان
                                            را می طلبد، تا با نرم افزارها شناخت
                                            بیشتری را برای طراحان رایانه ای علی
                                            الخصوص طراحان خلاقی، و فرهنگ پیشرو
                                            در زبان فارسی ایجاد کرد، در این صورت
                                            می توان امید داشت که تمام و دشواری
                                            موجود در ارائه راهکارها، و شرایط سخت
                                            تایپ به پایان رسد و زمان مورد نیاز
                                            شامل حروفچینی دستاوردهای اصلی، و
                                            جوابگوی سوالات پیوسته اهل دنیای
                                            موجود طراحی اساسا مورد استفاده قرار
                                            گیرد.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="course__box-footer">
                                        <div className="course__box-footer-right">
                                          <i className="course__box-footer-icon fa fa-users"></i>
                                          <span className="course__box-footer-count">
                                            202
                                          </span>
                                        </div>
                                        <span className="course__box-footer-left">
                                          {course.price === 0
                                            ? "رایگان"
                                            : course.price.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}

                    <Pagination
                      items={orderedCourses}
                      itemsCount={3}
                      pathname={`/category-info/${categoryName}`}
                      setShownCourses={setShownCourses}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
