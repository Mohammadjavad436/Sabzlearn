import React, { DOMAttributes } from "react";
import { Link } from "react-router-dom";

type ButtonProp = {
  to?: string;
  children: JSX.Element[] | any;
  href?: string;
  className: string;
  type: "button" | "submit";
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button(props: ButtonProp): JSX.Element {
  if (props.to) {
    return (
      <Link to={props.to} className={props.className}>
        {props.children}
      </Link>
    );
  } else if (props.href) {
    return (
      <a href={props.href} className={props.className}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button
        className={props.className}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }
}
