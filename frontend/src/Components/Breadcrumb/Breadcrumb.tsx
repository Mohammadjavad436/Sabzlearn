import React from "react";
import { Link } from "react-router-dom";

import "./Breadcrumb.css";

type BreadcrumbProp = {
  links: {
    id: number;
    title: string;
    to: string | null;
  }[];
};

export default function Breadcrumb({ links }: BreadcrumbProp): JSX.Element {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <i className="fas fa-home breadcrumb__home-icon"></i>
          </div>
          <ul className="breadcrumb__list">
            {links.map((link) => (
              <li className="breadcrumb__item" key={link.id}>
                <Link to={`/${link.to}`} className="breadcrumb__link">
                  {link.title}
                  {link.id !== links.length ? (
                    <i className="fas fa-angle-left breadcrumb__icon"></i>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
