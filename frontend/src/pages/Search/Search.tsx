import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Topbar from "../../Components/Topbar/Topbar";
import { CoursesEntity } from "../../context/authContext";
import { Article } from "../../Components/LastArticles/LastArticles";

export default function Search() {
  const { value } = useParams();
  const [courese, setCourses] = useState<CoursesEntity[]>([]);
  const [articles, setarticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allData) => {
        setCourses(allData.allResultCourses);
        setarticles(allData.allResultArticles);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />

      {courese.length === 0 ? (
        <div className="container">
          <SectionHeader
            title="نتیجه سرچ  دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="alert alert-warning">
            هیچ دوره ای برای
            {"  "}
            {value}
            پیدا نشد
          </div>
        </div>
      ) : (
        <div className="courses">
          <div className="container">
            <SectionHeader
              title="نتیجه سرچ  دوره ها"
              desc="سکوی پرتاپ شما به سمت موفقیت"
            />
          </div>

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courese.map((course) => (
                  <CourseBox {...course} key={course._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {articles.length === 0 ? (
        <div className="container">
          <SectionHeader
            title="نتیجه سرچ  مقاله ها"
            desc="پیش به سوی ارتقای دانش"
          />
          <div className="alert alert-warning">
            هیچ مقاله ای برای
            {` `}
            {value}
            پیدا نشد
          </div>
        </div>
      ) : (
        <div className="container">
          <SectionHeader
            title="نتیجه سرچ  مقاله ها"
            desc="پیش به سوی ارتقای دانش"
          />
          <div className="articles__content">
            <div className="row">
              {articles.map((article) => (
                <ArticleBox {...article} key={article._id} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
