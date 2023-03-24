import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Icons from "../../assets/icons";
import "./CourseCarousel.scss";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  variableWidth: true,
  arrows: false,
};

export default function CourseCarousel({ courseList, profileOpened, selectedCourse, setSelectedCourse }) {
  const navigate = useNavigate();
  const slider = useRef(null);

  useEffect(() => {
    if (courseList?.length > 0) {
      if (!selectedCourse) {
        setSelectedCourse(courseList[0]);
      }
    }
  }, [courseList, selectedCourse]); //eslint-disable-line

  return (
    <div className={clsx("course-carousel", { opened: profileOpened })}>
      <Slider {...settings} ref={slider}>
        {courseList.map((course, index) => (
          <div key={course.CourseInstanceId}>
            <div
              className={clsx("course-card", {
                active: selectedCourse?.CourseInstanceId === course?.CourseInstanceId,
              })}
              onClick={() => {
                setSelectedCourse(course);
              }}
            >
              <div className="video-container">
                <div className="course-title-wrapper d-flex justify-content-between align-items-center mb-3">
                  <h3 className="course-title pe-2">{course.Name}</h3>
                  <div className="radio-wrapper">
                    {selectedCourse?.CourseInstanceId === course?.CourseInstanceId ? (
                      <Icons.RadioChecked></Icons.RadioChecked>
                    ) : (
                      <Icons.Radio></Icons.Radio>
                    )}
                  </div>
                </div>
                <div className="video-part">
                  <img src={`/assets/images/course/${(index % 4) + 1}.jpg`} alt="Course Title"></img>
                </div>
                <Row style={{ flex: 1 }}>
                  <Col md={6}>
                    <div className="course-stat-title"> STUDENTS </div>
                    <div className="course-stat-content">
                      <Icons.Peoples></Icons.Peoples> 35
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="course-stat-title"> MODULES </div>
                    <div className="course-stat-content">
                      <Icons.Course.MaterialFilled></Icons.Course.MaterialFilled> 150
                    </div>
                  </Col>
                </Row>
                <div className="card-actions">
                  <button
                    className="button button-primary button-block"
                    style={{
                      padding: "10px",
                      fontSize: 12,
                      lineHeight: "18px",
                      height: 40,
                    }}
                    onClick={() => {
                      navigate(`/course/${course.CourseInstanceId}/overview`);
                    }}
                  >
                    Enter Course
                  </button>
                  <button
                    className="button button-primary button-block button-outline mt-2"
                    style={{
                      padding: "10px",
                      fontSize: 12,
                      lineHeight: "18px",
                      height: 40,
                    }}
                    onClick={() => {
                      navigate(`/course/${course.CourseInstanceId}/edit/modules`);
                    }}
                  >
                    Edit Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {courseList.length > 0 && (
        <button
          className="btn-card-nav btn-card-prev"
          onClick={() => {
            slider.current.slickPrev();
          }}
        >
          <Icons.Action.ChevronLeft />
        </button>
      )}
      {courseList.length > 0 && (
        <button
          className="btn-card-nav btn-card-next"
          onClick={() => {
            slider.current.slickNext();
          }}
        >
          <Icons.Action.ChevronRight></Icons.Action.ChevronRight>
        </button>
      )}
    </div>
  );
}
