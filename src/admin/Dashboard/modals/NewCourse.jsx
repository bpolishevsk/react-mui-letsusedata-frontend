import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form } from "react-bootstrap";
import { isSame } from "../../../utils";

import "./NewCourse.scss";

function DialogNewCourse(props) {
  const schoolList = useSelector((store) => store.app.schoolList);
  const quartersList = useSelector((store) => store.app.quartersList);

  const [school, setSchool] = useState("");
  const [quarter, setQuarter] = useState("");

  return (
    <Modal centered {...props} dialogClassName="modal-700">
      <Modal.Header closeButton>
        <Modal.Title as="h5">Create New Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Course Name</Form.Label>
          <Form.Control placeholder="e.g. Data Science 800" size="lg"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>School</Form.Label>
          <Form.Select
            size="lg"
            placeholder="== Choose One=="
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
              console.log(e.target.value);
              console.log(quartersList.filter((item) => item.SchoolId == school));
            }}
          >
            {schoolList.map((item) => (
              <option key={item.SchoolId} value={item.SchoolId}>
                {item.Name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quarter</Form.Label>
          <Form.Select
            size="lg"
            placeholder="== Choose One=="
            value={quarter}
            onChange={(e) => {
              setQuarter(e.target.value);
            }}
          >
            {quartersList
              .filter((item) => isSame(item.SchoolId, school))
              .map((item) => (
                <option key={item.QuarterId} value={item.QuarterId}>
                  {item.Name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Delivery Mechanism</Form.Label>
          <Form.Select size="lg" placeholder="== Choose One=="></Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <button className="button button-primary button-block" onClick={() => {}}>
          Create Course
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DialogNewCourse;
