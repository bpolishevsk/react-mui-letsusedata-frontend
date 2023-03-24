import React, { useState } from "react";
import "./StudentAnalytics.scss";
import Images from "../../../assets/images";
import Icons from "../../../assets/icons";
import _ from "lodash";
import { Row, Col, Table } from "react-bootstrap";

function StudentAnalytics() {
  return (
    <div className="tab-student-analytics">
      <div className="tab-student-analytics__left">
        {_.times(10, (t) => (
          <div className="card-course d-flex align-items-start mb-4" key={t}>
            <div className="course-avatar">
              <img src={Images.CourseAvatar} alt="Course" />
            </div>
            <div className="course-info">
              <div className="course-title">Javascript For Beginner</div>
              <div className="course-quarter">Spring 2022</div>
              <button className="online-status mt-2">
                <Icons.Online></Icons.Online> Online
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="tab-student-analytics__right">
        <Row>
          <Col lg={6} xl={3}>
            <div className="module-card">
              <div className="module-card__title">
                <Icons.Course.MaterialFilled></Icons.Course.MaterialFilled>
              </div>
              <div className="module-card__body">
                <span className="title-primary">Materials</span>
                <span className="title-secondary">All Week</span>
                <span className="count">105</span>
              </div>
            </div>
          </Col>
          <Col lg={6} xl={3}>
            <div className="module-card">
              <div className="module-card__title" style={{ backgroundColor: "#6C57EB" }}>
                <Icons.Course.AssignmentFilled></Icons.Course.AssignmentFilled>
              </div>
              <div className="module-card__body">
                <span className="title-primary">Assigments</span>
                <span className="title-secondary">All Week</span>
                <span className="count">105</span>
              </div>
            </div>
          </Col>
          <Col lg={6} xl={3}>
            <div className="module-card">
              <div className="module-card__title" style={{ backgroundColor: "#9857EB" }}>
                <Icons.Course.QuizFilled></Icons.Course.QuizFilled>
              </div>
              <div className="module-card__body">
                <span className="title-primary">Quizes</span>
                <span className="title-secondary">All Week</span>
                <span className="count">105</span>
              </div>
            </div>
          </Col>
          <Col lg={6} xl={3}>
            <div className="module-card">
              <div className="module-card__title" style={{ backgroundColor: "#EB9E57" }}>
                <Icons.Course.PollFilled></Icons.Course.PollFilled>
              </div>
              <div className="module-card__body">
                <span className="title-primary">Polls</span>
                <span className="title-secondary">All Week</span>
                <span className="count">105</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table className="table-activity-history">
              <thead>
                <tr>
                  <th> Date </th>
                  <th> Course </th>
                  <th> Module </th>
                  <th> Activity </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>24 Aug 2022 at 1:00 PM</td>
                  <td>Technical Interview</td>
                  <td>Week 2</td>
                  <td>has submitted the first task in the self intoduction</td>
                </tr>
                <tr>
                  <td>24 Aug 2022 at 1:00 PM</td>
                  <td>Technical Interview</td>
                  <td>Week 2</td>
                  <td>has submitted the first task in the self intoduction</td>
                </tr>
                <tr>
                  <td>24 Aug 2022 at 1:00 PM</td>
                  <td>Technical Interview</td>
                  <td>Week 2</td>
                  <td>has submitted the first task in the self intoduction</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default StudentAnalytics;
