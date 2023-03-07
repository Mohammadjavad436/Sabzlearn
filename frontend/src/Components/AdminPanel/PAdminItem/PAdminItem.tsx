import React from "react";

interface PAdminItemProp {
  title: string;
  count: number;
}

export default function PAdminItem({ title, count }: PAdminItemProp) {
  return (
    <div className="col-4">
      <div className="home-content-revanue box">
        <div className="home-box">
          <div className="home-box-left">
            <div className="home-box-title">
              <span>{title}</span>
            </div>
            <div className="home-box-value">
              <div className="home-box-price">
                <span>{count}</span>
              </div>
            </div>
            <div className="home-box-text">
              <span>{title} در یک ماه گذشته</span>
            </div>
          </div>
          <div className="home-box-right">
            <div className="home-box-icon">
              <i className="fas fa-money-bill-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
