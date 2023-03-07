import React, { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastArticles.css";
export interface Article {
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

export default function LastArticles() {
  const [allArticle, setAllArticle] = useState<Article[] | null>([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticle) => setAllArticle(allArticle));
  }, []);

  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnhref="/articles/1"
        />
        <div className="articles__content">
          <div className="row">
            {allArticle
              ?.filter((article) => article.publish === 1)
              .slice(0, 3)
              ?.map((article) => (
                <ArticleBox {...article} key={article._id} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
