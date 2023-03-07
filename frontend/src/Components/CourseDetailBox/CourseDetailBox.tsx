import React from "react";

import "./CourseDetailBox.css";

type CourseDetailBoxProp = {
  title: string;
  text: string | null | undefined;
  icon: string;
};

export default function CourseDetailBox({
  title,
  text,
  icon,
}: CourseDetailBoxProp) {
  return (
    <div className="col-4">
      <div className="course-boxes__box">
        <div className="course-boxes__box-right">
          <i className={`course-boxes__box-right-icon fas fa-${icon}`}></i>
        </div>
        <div className="course-boxes__box-left">
          <span className="course-boxes__box-left-title">{title}</span>
          <span className="course-boxes__box-left--subtitle">{text}</span>
        </div>
      </div>
    </div>
  );
}
