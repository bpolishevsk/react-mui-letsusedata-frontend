import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";

import Icons from "../../assets/icons";
import Clock from "../../components/common/Clock";

import "./Modules.scss";

export default function PageModules(props) {
  const StudentName = useSelector((store) => store.auth.Student.Name);
  const [tabKey, setTabKey] = useState("overview");

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div className="header__left">
          <h1>Modules</h1>
          <Clock></Clock>
        </div>
        <div className="header__right d-flex align-items-center">
          <button className="btn-action-outline" style={{ marginLeft: "1rem" }}>
            <Icons.Notification></Icons.Notification>
          </button>
          <button className="btn-action-outline" style={{ marginLeft: "1rem" }}>
            <Icons.Notification></Icons.Notification>
          </button>
        </div>
      </header>
      <main className="page-content"></main>
    </div>
  );
}
