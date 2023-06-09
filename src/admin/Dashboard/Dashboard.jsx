import React, { useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { Row, Col, Tabs, Tab, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import CourseCarousel from "./CourseCarousel";
import SearchField from "../../components/fields/SearchField";

import PieChart from "../../components/pie/PieChart";
import Icons from "../../assets/icons";

import "./Dashboard.scss";
import TableStudents from "./tables/TableStudents";
import DialogNewCourse from "./modals/NewCourse";
import Clock from "../../components/common/Clock";
import UserDropdown from "../../layouts/user-dropdown";

export default function PageDashboard(props) {
  const StudentName = useSelector((store) => store.auth.Student.Name);
  const courseList = useSelector((store) => store.course.CourseList);
  const [keyword, setKeyword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDialogNewCourse, setOpenDialogNewCourse] = useState(false);
  const [tabKey, setTabKey] = useState("students");

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div className="header__left">
          <h1>Welcome Back, {StudentName}</h1>
          <Clock></Clock>
        </div>
        <div className="header__right d-flex align-items-center">
          <button className="btn-action-outline" style={{ marginLeft: "1rem" }}>
            <Icons.Clock></Icons.Clock>
          </button>
          <button className="btn-action-outline" style={{ marginLeft: "1rem" }}>
            <Icons.Notification></Icons.Notification>
          </button>
          <UserDropdown style={{ marginLeft: "1rem", height: 50, width: 56 }}></UserDropdown>
        </div>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-carousel-header">
          <h2> List of Courses </h2>
          <SearchField
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: 240 }}
          ></SearchField>
        </div>
        <div className="dashboard-carousel-container">
          <CourseCarousel
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            courseList={courseList.filter((course) => {
              let trimed = keyword.trim().toLocaleLowerCase();
              if (trimed.length === 0) return true;
              if (course.Name.toLowerCase().includes(trimed)) return true;
              return false;
            })}
          ></CourseCarousel>
          {/* <div
            className="btn-course-new d-flex flex-column align-items-center justify-content-center"
            onClick={() => {
              setOpenDialogNewCourse(true);
            }}
          >
            <Icons.PlusCourse></Icons.PlusCourse>
            <span className="mt-2"> CREATE </span>
            <span> NEW COURSE </span>
          </div> */}
          {/* <DialogNewCourse
            show={openDialogNewCourse}
            onHide={() => {
              setOpenDialogNewCourse(false);
            }}
          ></DialogNewCourse> */}
        </div>
        <Row>
          <Col md={7}>
            <div className="tabs-wrapper">
              <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} className="mb-3 nav-line-tabs">
                <Tab eventKey="students" title="My Students">
                  <TableStudents></TableStudents>
                </Tab>
                <Tab eventKey="materials" title="Materials"></Tab>
                <Tab eventKey="quizes" title="Quizes"></Tab>
                <Tab eventKey="assignments" title="Assignments"></Tab>
                <Tab eventKey="polls" title="Polls"></Tab>
              </Tabs>
              <button
                className="blue-btn-text"
                onClick={() => {
                  // navigate("/calendar");
                }}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 0,
                }}
              >
                See All <Icons.Action.ChevronRight></Icons.Action.ChevronRight>
              </button>
            </div>
          </Col>
          <Col md={5}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="font-500"> Student Feedback </h5>
              <button
                className="blue-btn-text"
                onClick={() => {
                  // navigate("/calendar");
                }}
              >
                See All <Icons.Action.ChevronRight></Icons.Action.ChevronRight>
              </button>
            </div>
            <div className="student-feedback d-flex align-items-center">
              <PieChart percent={60}>
                <div className="d-flex align-items-center justify-content-center">
                  <span className="font-600 font-32 me-2"> 215 </span>
                  <span className="font-600 font-14">
                    Student<br></br>Satisfied
                  </span>
                </div>
              </PieChart>
              <div className="ms-5">
                <div className="label-student-number">127 Students</div>
                <div className="label-student-percent">85,15%</div>
                <div className="label-student-percent-bottom satisfied d-flex align-items-center">
                  <Icons.Radio></Icons.Radio> Satisfied
                </div>
                <div className="label-student-percent">12,5%</div>
                <div className="label-student-percent-bottom disatisfied d-flex align-items-center">
                  <Icons.Radio></Icons.Radio> Disatisfied
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </div>
  );
}
