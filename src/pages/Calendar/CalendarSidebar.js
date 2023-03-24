import * as React from "react";
// import Icons from "../../assets/icons";
import UserNavigation from "../../layouts/user-navigation";
import Icons from "../../assets/icons";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2030-01-01T00:00:00.000");

function CalenderRight() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <div className="calendar-sidebar">
      <div className="d-flex w-100 justify-content-end">
        <UserNavigation></UserNavigation>
      </div>
      <div className="calendar-sidebar-calendar">
        <CalendarPicker
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <h5> Your Instructors </h5>
      <div className="instructors-list">
        <div className="instructor-item">
          <div className="instructor-avatar">
            <img src="/assets/images/download.png" alt="Avatar" />
            <div className="dot"></div>
          </div>
          <div className="instructor-detail">
            <div className="instructor-name">Jenny Wilson</div>
            <div className="instructor-role">Singing Teacher</div>
          </div>
          <div className="instructor-actions">
            <button className="instructor-action">
              <Icons.MessageDot></Icons.MessageDot>
            </button>
            <button className="instructor-action">
              <Icons.InformationSquare></Icons.InformationSquare>
            </button>
          </div>
        </div>
        <div className="instructor-item">
          <div className="instructor-avatar">
            <img src="/assets/images/download.png" alt="Avatar" />
            <div className="dot"></div>
          </div>
          <div className="instructor-detail">
            <div className="instructor-name">Jenny Wilson</div>
            <div className="instructor-role">Singing Teacher</div>
          </div>
          <div className="instructor-actions">
            <button className="instructor-action">
              <Icons.MessageDot></Icons.MessageDot>
            </button>
            <button className="instructor-action">
              <Icons.InformationSquare></Icons.InformationSquare>
            </button>
          </div>
        </div>
        <div className="instructor-item">
          <div className="instructor-avatar">
            <img src="/assets/images/download.png" alt="Avatar" />
            <div className="dot"></div>
          </div>
          <div className="instructor-detail">
            <div className="instructor-name">Jenny Wilson</div>
            <div className="instructor-role">Singing Teacher</div>
          </div>
          <div className="instructor-actions">
            <button className="instructor-action">
              <Icons.MessageDot></Icons.MessageDot>
            </button>
            <button className="instructor-action">
              <Icons.InformationSquare></Icons.InformationSquare>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderRight;
