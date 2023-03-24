import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import _ from "lodash";

import "./TableRequest.scss";

import { readRequestLogin } from "../../../store/admin.slice";

function TableStudents() {
  const dispatch = useDispatch();
  const requestLoginList = useSelector((store) => store.admin.requestLoginList);

  useEffect(() => {
    dispatch(readRequestLogin());
  }, []);

  return (
    <Table className="table borderless table-request">
      <thead>
        <tr>
          <th style={{ width: 140 }}> STUDENT </th>
          <th style={{ width: 200 }}> SCHOOL NAME </th>
          <th style={{ width: 200 }}> COURSE NAME </th>
          <th style={{ width: 200 }}> EMAIL </th>
          <th style={{ width: 200 }}> ACTION </th>
        </tr>
      </thead>
      <tbody>
        {requestLoginList.map((t, index) => (
          <tr key={index}>
            <td>{t.Name}</td>
            <td style={{ width: 200 }}>{t.SchoolName}</td>
            <td>{t.CourseName}</td>
            <td>{t.Email}</td>
            <td>
              <button className="button button-primary button-sm me-2">Accept</button>
              <button className="button button-primary button-outline button-sm">Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableStudents;
