import React from "react";
import "./PieChart.scss";

function PieChart({ percent, children }) {
  return (
    <div className="pie-chart-wrapper d-flex align-items-center justify-content-center">
      <div className="pie" style={{ "--p": percent - 5, "--b": "20px", "--c": "#27AE60" }}></div>
      <div
        className="pie"
        style={{
          "--p": 100 - percent - 5,
          "--b": "15px",
          "--c": "#9B51E0",
          transform: `rotate(${percent * 0.01 * 360}deg)`,
        }}
      ></div>
      {children}
    </div>
  );
}

export default PieChart;
