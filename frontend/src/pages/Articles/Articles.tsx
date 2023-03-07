import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Pagination from "../../Components/Pagination/Pagination";

export interface ArticleEntry {
  _id: string;
  title: string;
  description: string;
  body: string;
  cover: string;
  shortName: string;
  categoryID: string;
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  __v: number;
  publish: number;
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

export default function Articles() {
  const [articles, setArticles] = useState<ArticleEntry[] | []>([]);
  const [ShownArticle, setShownArticle] = useState<ArticleEntry[] | []>([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی  مقاله ها",
            to: "articles/1",
          },
        ]}
      />
      {/* <!--------------------------------  Articles-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {ShownArticle?.filter((article) => article.publish === 1).map(
                  (article: ArticleEntry) => (
                    <ArticleBox {...article} />
                  )
                )}
              </div>
            </div>
          </div>

          <Pagination
            items={articles}
            itemsCount={3}
            pathname="/articles"
            setShownCourses={setShownArticle}
          />
        </div>
      </section>
      {/* <!--------------------------------  Articles-Section  --------------------------------> */}
      <Footer />
    </>
  );
}
