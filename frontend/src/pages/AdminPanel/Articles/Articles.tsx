import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";

import { ArticleEntry } from "../../Articles/Articles";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator, requiredValidator } from "./../../../validators/rules";
import { courseCategoreis } from "../Courses/Courses";
import Editor from "../../../Components/Form/Editor";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState<ArticleEntry[]>([]);
  const [categories, setCategories] = useState<courseCategoreis[]>([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState("");
  const [articleBody, setArticleBody] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    getAllArticle();
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllArticle() {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
      });
  }

  const removeArticle = (articleID: string) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    swal({
      title: "آیا از حذف مقاله مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer  ${localStorageData}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "مقاله مورد نظر باموفقیت حذف شد",
              icon: "success",
              closeOnEsc: true,
            }).then((res) => {
              getAllArticle();
            });
          }
        });
      }
    });
  };

  const createArticle = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user") || "{}");
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت ایجاد شد",
          icon: "success",
          closeOnEsc: true,
        }).then(() => {
          getAllArticle();
        });
      }
    });
  };
  const saveArticleAsDaft = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user") || "{}");
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت پیش نویس شد",
          icon: "success",
          closeOnEsc: true,
        }).then(() => {
          getAllArticle();
        });
      }
    });
  };
  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  className=""
                  validations={[requiredValidator(), minValidator(8)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  className=""
                  validations={[requiredValidator(), minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  className="article-textarea"
                  validations={[requiredValidator(), minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}
                <Editor value={articleBody} setValue={setArticleBody} />
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event: any) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn ">
                  <input
                    className="m-1"
                    type="submit"
                    value="انتشار"
                    onClick={(event) => createArticle(event)}
                  />
                  <input
                    className="m-1"
                    type="submit"
                    value="پیش نویس"
                    onClick={(event) => saveArticleAsDaft(event)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="مقاله‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>مشاهد</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.publish}</td>
                <td>
                  {article.publish === 1 ? (
                    <>
                      <i className="fa fa-check"></i>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`draft/${article.shortName}`}
                        className="btn btn-primary edit-btn"
                      >
                        ادامه نوشتن
                      </Link>
                    </>
                  )}
                </td>{" "}
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeArticle(article._id)}
                  >
                    حذف
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
