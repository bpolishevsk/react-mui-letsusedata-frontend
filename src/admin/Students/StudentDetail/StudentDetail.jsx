import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import HeaderCourse from "../../../layouts/header-course";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./StudentDetail.scss";
import Images from "../../../assets/images";
import Icons from "../../../assets/icons";
import StudentAnalytics from "../StudentAnalytics/StudentAnalytics";
import CourseProgress from "../CourseProgress/CourseProgress";

function StudentDetail() {
  const navigate = useNavigate();
  const [tabKey, setTabKey] = useState("progress");

  return (
    <React.Fragment>
      <HeaderCourse
        nav={false}
        syllabus={true}
        title="STUDENT DETAILS"
        onBackClick={() => {
          navigate(`/students`);
        }}
      ></HeaderCourse>
      <main className="main-content-wrapper">
        <div
          className="page-content-wrapper page-student-detail"
          style={{ background: "rgba(242, 242, 242, 0.3)", padding: "2rem" }}
        >
          <Row>
            <Col md={4}>
              <div className="d-flex align-items-center">
                <div className="img-student">
                  <img src={Images.ProfileImg} alt="Profile" />
                </div>
                <div className="student-info d-flex flex-column justify-content-center ms-3">
                  <h5 className="mb-2"> Tarjo bin Slamet </h5>
                  <span className="font-20">Spring 2022</span>
                  <span className="font-16">Active 2 days ago</span>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="student-detail d-flex align-items-center justify-content-between">
                <div className="student-detail__left d-flex">
                  <div className="course-info-item">
                    <span className="item__header">Total Courses</span>
                    <span className="item__content">5 Courses</span>
                  </div>
                  <div className="course-info-item">
                    <span className="item__header">Last Course</span>
                    <span className="item__content">Data 310</span>
                  </div>
                </div>
                <div className="student-detail__right d-flex">
                  <button className="button button-primary"> Impersonate Student </button>
                  <button className="button button-primary button-outline ms-3"> Download Report </button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="student-profile-info">
            <Col md={3}>
              <div className="student-profile-info-item d-flex align-items-center">
                <div className="icon-wrapper   email">
                  <Icons.Message></Icons.Message>
                </div>
                <div className="info-wrapper ">
                  <div className="info-subject"> Email </div>
                  <div className="info-content"> bobbymarsh@gmail.com </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="student-profile-info-item d-flex align-items-center">
                <div className="icon-wrapper joined">
                  <Icons.Success></Icons.Success>
                </div>
                <div className="info-wrapper">
                  <div className="info-subject"> Joined </div>
                  <div className="info-content"> 23rd July 2022 </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="student-profile-info-item d-flex align-items-center">
                <div className="icon-wrapper school">
                  <Icons.Graduate></Icons.Graduate>
                </div>
                <div className="info-wrapper">
                  <div className="info-subject"> School </div>
                  <div className="info-content"> LWTech University </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="student-profile-info-item d-flex align-items-center">
                <div className="icon-wrapper grade">
                  <Icons.Grade></Icons.Grade>
                </div>
                <div className="info-wrapper grade">
                  <div className="info-subject"> Average Grade </div>
                  <div className="info-content"> A+ Grade </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} className="mb-3 nav-line-tabs">
                <Tab eventKey="progress" title="Course Progress">
                  <CourseProgress></CourseProgress>
                </Tab>
                <Tab eventKey="analytics" title="Analytics">
                  <StudentAnalytics></StudentAnalytics>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </main>
    </React.Fragment>
  );
}

export default StudentDetail;
