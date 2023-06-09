import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

import SidebarNavLink from "../components/SidebarNavLink";

import Icons from "../../assets/icons/index";
import Images from "../../assets/images";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div
        className="sidebar-logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <Images.LogoWhite></Images.LogoWhite>
      </div>
      <div className="sidebar-nav sidebar-nav-admin">
        <div className="sidebar-sub-header">
          General<div className="sidebar-divider"></div>
        </div>
        <SidebarNavLink to="/">
          <span className="list-icon">
            <Icons.Sidebar.Dashboard />
          </span>
          Dashboard
        </SidebarNavLink>
        <SidebarNavLink to="/calendar">
          <span className="list-icon">
            <Icons.Sidebar.Calendar />
          </span>
          Calendar
        </SidebarNavLink>
        <SidebarNavLink to="/messages">
          <span className="list-icon">
            <Icons.Sidebar.Message></Icons.Sidebar.Message>
          </span>
          Messages <Badge bg="primary ms-2 px-1 py-1 font-normal"> 22 </Badge>
        </SidebarNavLink>
        <SidebarNavLink to="/students">
          <span className="list-icon">
            <Icons.Peoples></Icons.Peoples>
          </span>
          Students
        </SidebarNavLink>
        <div className="sidebar-sub-header">
          Admin<div className="sidebar-divider"></div>
        </div>
        <SidebarNavLink to="/courses">
          <span className="list-icon">
            <Icons.Sidebar.Course></Icons.Sidebar.Course>
          </span>
          Courses
        </SidebarNavLink>
        <SidebarNavLink to="/modules">
          <span className="list-icon">
            <Icons.Sidebar.Module></Icons.Sidebar.Module>
          </span>
          Modules
        </SidebarNavLink>
      </div>
      <div className="contact-info-container">
        <div className="contact-icon-container">
          <div className="contact-icon-wrapper">
            <Icons.Sidebar.Contact></Icons.Sidebar.Contact>
          </div>
        </div>
        <div className="text-center" style={{ marginBottom: "1.5rem" }}>
          <label className="helper-text">Need some help ?</label>
          <button
            className="btn-fill"
            onClick={() => {
              navigate("/contactus");
            }}
          >
            Contact US
          </button>
        </div>
        <div>
          <button className="btn-outline">Tutorial</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
