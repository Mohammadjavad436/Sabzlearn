import React from "react";

import "./FooterItem.css";

type FooterItemProp = {
  title: string;
  children: JSX.Element;
};

export default function FooterItem({
  title,
  children,
}: FooterItemProp): JSX.Element {
  return (
    <div className="col-4">
      <div className="footer-widgets__item">
        <span className="footer-widgets__title">{title}</span>

        {children}
      </div>
    </div>
  );
}
