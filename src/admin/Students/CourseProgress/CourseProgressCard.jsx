import React from "react";
import Images from "../../../assets/images";
import "./CourseProgressCard.scss";

function CourseProgressCard() {
  return (
    <div className="card-course-progress mb-4">
      <div className="d-flex align-items-center mb-3">
        <div className="avatar-course">
          <img src={Images.CourseAvatar} alt="Course" />
        </div>
        <div className="course-detail">
          <h6> Data 310 </h6>
          <span> Spring 2022 </span>
        </div>
      </div>
      <div className="progress" style={{ height: "1.5rem" }}>
        <div
          role="progressbar"
          className="progress-bar bg-primary"
          style={{
            width: `${50}%`,
          }}
        >
          50%
        </div>
      </div>
      <div className="mt-1 course-module-progress">120 of 228 Modules Progress</div>
    </div>
  );
}

export default CourseProgressCard;
