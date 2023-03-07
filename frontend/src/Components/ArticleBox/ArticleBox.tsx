import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { Article } from "../LastArticles/LastArticles";
import "./ArticleBox.css";

export default function ArticleBox(article: Article) {
  const [isShowImg, setisShowImg] = useState(false);

  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${article.shortName}`}>
            <img
              src={article.cover}
              alt="Course img"
              className="course-box__img"
              onLoad={() => setisShowImg(true)}
            />
            {!isShowImg && <CircleSpinner />}
          </Link>
        </div>
        <div className="article-card__content">
          <Link
            to={`/article-info/${article.shortName}`}
            className="article-card__link"
          >
            {article.title}
          </Link>
          <p className="article-card__text">{article.description}</p>
          <Link
            to={`/article-info/${article.shortName}`}
            className="article-card__btn"
          >
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
