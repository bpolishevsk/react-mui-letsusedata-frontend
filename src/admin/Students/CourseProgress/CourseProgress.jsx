import React from "react";
import { Row, Col } from "react-bootstrap";
import CourseProgressCard from "./CourseProgressCard";

function CourseProgress() {
  return (
    <Row>
      <Col md={4}>
        <CourseProgressCard></CourseProgressCard>
      </Col>
      <Col md={4}>
        <CourseProgressCard></CourseProgressCard>
      </Col>
      <Col md={4}>
        <CourseProgressCard></CourseProgressCard>
      </Col>
      <Col md={4}>
        <CourseProgressCard></CourseProgressCard>
      </Col>
      <Col md={4}>
        <CourseProgressCard></CourseProgressCard>
      </Col>
      <Col md={4}>
        <CourseProgressCard></CourseProgressCard>
      </Col>
    </Row>
  );
}

export default CourseProgress;
