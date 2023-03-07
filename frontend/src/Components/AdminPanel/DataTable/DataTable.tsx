import React from "react";

interface DataTableprop {
  children: JSX.Element;
  title: string;
}

export default function DataTable({ children, title }: DataTableprop) {
  return (
    <div className="container">
      <div className="home-content-latset-users">
        <div className="home-content-users-title">
          <span>
            لیست <span className="signup">{title}</span>
          </span>
        </div>
        <div className="home-content-users-table">{children}</div>
      </div>
    </div>
  );
}
