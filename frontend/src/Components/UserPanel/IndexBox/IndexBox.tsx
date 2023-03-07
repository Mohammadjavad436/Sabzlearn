import React from "react";
import { Link } from "react-router-dom";

interface IndexBoxProp {
  title: string;
  href: string;
}

export default function IndexBox({ title, href }: IndexBoxProp) {
  return (
    <div className="col-4">
      <Link to={href} className="main__link">
        {title}
      </Link>
    </div>
  );
}
