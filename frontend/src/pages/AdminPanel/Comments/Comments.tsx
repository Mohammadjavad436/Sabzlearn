import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import swal from "sweetalert";
import Swal from "sweetalert2";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export interface WeatherComment {
  _id: string;
  body: string;
  course: string;
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  __v: number;
  answer: number;
  isAnswer: number;
  score: number;
  answerContent?: AnswerContent | null;
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
  profile?: string | null;
  phone: string;
}
export interface AnswerContent {
  _id: string;
  body: string;
  course: Course;
  creator: Creator1;
  answer: number;
  isAnswer: number;
  mainCommendID: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  score: number;
}
export interface Course {
  _id: string;
  name: string;
  description: string;
  cover: string;
  shortName: string;
  categoryID: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isComplete: number;
  support: string;
  price: number;
  status: string;
}
export interface Creator1 {
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

export default function Comments() {
  const [comments, setComments] = useState<WeatherComment[]>([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch("http://localhost:4000/v1/comments")
      .then((res) => res.json())
      .then((allComments) => setComments(allComments));
  }

  const removeComment = (commentID: string) => {
    swal({
      title: "ایا از حذف کامنت اطمنیان دارید",
      icon: "warning",
      buttons: ["نه", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت حذف شد",
              icon: "success",
              closeOnEsc: true,
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  const showCommentBody = (commentBody: string) => {
    swal({
      title: `${commentBody}`,
      icon: "info",
      closeOnEsc: true,
    });
  };
  const banUser = (userID: string) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");

    swal({
      title: "آیا از بن مطمعنی",
      icon: "warning",
      buttons: ["نه", "اره "],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((result) => {
          if (result.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              closeOnEsc: true,
            });
          }
        });
      }
    });
  };

  const answerComment = (commmentID: string) => {
    Swal.fire({
      title: "پاسخ کامنت را وارد کنید",
      input: "text",
    }).then((textAnswer) => {
      if (textAnswer.value) {
        const answerComment = {
          body: textAnswer.value,
        };

        fetch(`http://localhost:4000/v1/comments/answer/${commmentID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json ",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token
            }`,
          },
          body: JSON.stringify(answerComment),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پاسخ مورد نظر با موفقیت ثبت شد",
              icon: "success",
              closeOnEsc: true,
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };
  const acceptComment = (commmentID: string) => {
    swal({
      title: "ایا از تایید کامنت اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/accept/${commmentID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json ",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت تایید شد",
              icon: "success",
              closeOnEsc: true,
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };
  const rejectComment = (commmentID: string) => {
    swal({
      title: "ایا از رد کامنت اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/reject/${commmentID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json ",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت رد شد",
              icon: "success",
              closeOnEsc: true,
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="کامنت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>امتیاز</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>وضعیت</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr>
                <td
                  className={
                    comment.answer ? "answer-comment" : "no-answer-comment"
                  }
                >
                  {index + 1}
                </td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td>
                  {Array(5 - comment.score)
                    .fill(0)
                    .map((item) => (
                      <img src="/images/svgs/star.svg" alt="score" />
                    ))}
                  {Array(comment.score)
                    .fill(0)
                    .map((item) => (
                      <img src="/images/svgs/star_fill.svg" alt="score" />
                    ))}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerComment(comment._id)}
                  >
                    پاسخ
                  </button>
                </td>
                {comment.answer === 1 ? (
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => rejectComment(comment._id)}
                    >
                      رد
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => acceptComment(comment._id)}
                    >
                      تایید
                    </button>
                  </td>
                )}
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => banUser(comment.creator._id)}
                  >
                    بن
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
