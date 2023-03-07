import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export interface WeatherContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  answer: number;
}

export default function Contact() {
  const [contacts, setContacts] = useState<WeatherContact[]>([]);

  useEffect(() => {
    getAllContact();
  }, []);

  function getAllContact() {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        setContacts(allContacts);
      });
  }

  const showContactBody = (Body: string) => {
    swal({
      title: `${Body}`,
      closeOnEsc: true,
    });
  };
  const sendAnwserToUser = (contactEmail: string) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    Swal.fire({
      title: "متن پاسخ را وارد کنید",
      input: "text",
      confirmButtonText: "ارسال",
    }).then((result) => {

      const anwserInfo = {
        email: contactEmail,
        answer: result.value,
      };

      fetch("http://localhost:4000/v1/contact/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(anwserInfo),
      })
        .then((res) => {
          if (res.ok) {
            swal({
              title: "با موفقیت ارسال شد",
              closeOnEsc: true,
            });
            return res.json();
          } else {
            swal({
              title: "  ارسال با مشکل مواجه شده  دوباره سعی کنید",
              closeOnEsc: true,
            });
          }
        })
        .then((result) =>{});
    });
  };

  const removeContact = (contactID: string) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");

    swal({
      title: "آیا از حذف مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "اره"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پیغام مورد نظر با موفقیت حذف شد",
              icon: "success",
              closeOnEsc: true,
            }).then((res) => {
              getAllContact();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="پیغام‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => sendAnwserToUser(contact.email)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}
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
