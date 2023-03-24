import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form } from "react-bootstrap";

import Icons from "../../assets/icons";
import Clock from "../../components/common/Clock";
import UserDropdown from "../../layouts/user-dropdown";
import { SearchField } from "../../components/fields";

import "./Courses.scss";
import TableCourses from "./TableCourses";
import { getCourseList } from "../../store/admin.slice";

export default function PageCourses(props) {
  const dispatch = useDispatch();
  const schoolList = useSelector((store) => store.app.schoolList);

  const [keyword, setKeyword] = useState("");
  const [school, setSchool] = useState("");

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div className="header__left">
          <h1>Coureses</h1>
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
      <main className="page-content">
        <div className="top-navigation d-flex align-items-center justify-content-between mt-3">
          <div className="d-flex align-items-center">
            <SearchField
              outlined
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: 240 }}
            ></SearchField>
            <Form.Select
              style={{ width: 300, height: "3.375rem", marginLeft: "1rem" }}
              size="lg"
              placeholder="== Choose One=="
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
              }}
            >
              <option value="">== Select School ==</option>
              {schoolList.map((item) => (
                <option key={item.SchoolId} value={item.SchoolId}>
                  {item.Name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="">
            <button className="button button-primary">
              <Icons.PlusCircle></Icons.PlusCircle>
              Add Course
            </button>
          </div>
        </div>
        <div className="table-wrapper mt-3">
          <TableCourses></TableCourses>
        </div>
      </main>
    </div>
  );
}
