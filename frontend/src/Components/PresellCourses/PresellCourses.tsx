import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";
import "./PresellCourses.css";
import { Swiper, SwiperSlide } from "swiper/react";

export interface PresellCoursesEntriy {
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
  creator: Creator;
  createdAt: string;
  courseAverageScore: number;
  discount: string;
  updatedAt: string;
  __v: number;
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

export default function PresellCourses() {
  const [presellCourses, setPresellCourses] = useState<PresellCoursesEntriy[]>(
    []
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((courses) => setPresellCourses(courses));
  }, []);

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دوره های پیش فروش"
          btnTitle={null}
          btnhref={null}
        />
        <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="mySwiper"
              >
                {presellCourses.map((course) => (
                  <SwiperSlide>
                    <CourseBox {...course} isSlider={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
