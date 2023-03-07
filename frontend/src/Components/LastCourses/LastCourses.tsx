import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";
import "./LastCourses.css";

export interface coureseEntris {
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
  creator?: Creator | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseAverageScore: number;
  registers?: number;
  discount: string;
  isSlider?: boolean;
}
export interface Creator {
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
}

export default function LastCourses() {
  const [courses, setCourses] = useState<coureseEntris[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourse) => setCourses(allCourse));
  }, []);

  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnhref="courese/1"
          />
        </div>

        <div className="courses-content">
          <div className="container">
            <div className="row">
              {courses.slice(0, 6).map((course) => (
                <CourseBox {...course} key={course._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
