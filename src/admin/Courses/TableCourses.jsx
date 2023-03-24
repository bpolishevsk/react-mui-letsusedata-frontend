import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Avatar from "../../components/common/Avatar";
import Images from "../../assets/images";
import _ from "lodash";

import "./TableCourses.scss";
import Icons from "../../assets/icons";

function TableCourses() {
  const CourseList = useSelector((store) => store.admin.courses);

  return (
    <Table className="table borderless table-courses">
      <thead>
        <tr>
          <th> # </th>
          <th> COURSE NAME </th>
          <th> SCHOOL </th>
          <th> GRADE SCALE </th>
          <th> CREDIT </th>
          <th> DEPARTMENT </th>
          <th> QUARTER </th>
          <th> METHOD </th>
          <th> ACTION </th>
        </tr>
      </thead>
      <tbody>
        {CourseList?.map((course) => (
          <tr>
            <td> {course.Id} </td>
            <td> {course.Name} </td>
            <td> {course.SchoolId} </td>
            <td> {course.GradeScaleGroupId} </td>
            <td> {course.Credits} </td>
            <td> {course.Department} </td>
            <td></td>
            <td></td>
            <td>
              <div className="d-flex align-items-center">
                <button className="button button-primary button-table-action me-1"> Edit </button>
                <button className="button button-primary button-outline button-table-action  me-1"> Custom </button>
                <button className="button button-danger button-outline button-table-action">
                  <Icons.Delete></Icons.Delete>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableCourses;
