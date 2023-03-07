import { useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./CourseBox.css";

import { coureseEntris } from "../LastCourses/LastCourses";

export default function CourseBox(prop: coureseEntris): JSX.Element {
  const [isShowImg, setisShowImg] = useState(false);

  return (
    <div className={prop.isSlider ? "col-12" : "col-4"}>
      <div className="course-box">
        <Link to={prop.shortName}>
          <img
            src={prop.cover}
            alt="Course img"
            className="course-box__img"
            onLoad={() => setisShowImg(true)}
          />
          {!isShowImg && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <a href="#" className="course-box__title">
            {prop.name}
          </a>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">
                {typeof prop.creator === "string"
                  ? "ناشناس"
                  : prop.creator?.name}
              </a>
            </div>
            <div className="course-box__rating">
              {Array(5 - prop?.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img
                    src="/images/svgs/star.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
              {Array(prop?.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img
                    src="/images/svgs/star_fill.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{prop?.registers}</span>
            </div>
            <span className="course-box__price">
              {prop.price === 0 ? "رایکان" : prop.price}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={prop.shortName} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
        {prop.price !== 0 && prop?.discount && (
          <span className="courses-box__discount">%{prop?.discount}</span>
        )}
      </div>
    </div>
  );
}
