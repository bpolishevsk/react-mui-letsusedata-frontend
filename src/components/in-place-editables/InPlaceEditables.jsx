import React from "react";
import {useSelector} from "react-redux";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ReactComponent as SvgPen} from "./pen.svg";
import {ReactComponent as SvgFloppy} from "./floppy-disk.svg"
import {ReactComponent as SvgXMark} from "./xmark.svg"
import postUpdateIPE from "../../apis/in-place-editables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Clock from "../../pages/Course/Module/components/Clock";
import { utils } from "../../libs";
import "./ipe-styles.scss";
import "./swal-styles.scss";


// General constants
const MySwal = withReactContent(Swal);
const styledSwal = MySwal.mixin({
  buttonsStyling: false,
  customClass: {
    popup: 'swal-general-popup',
    htmlContainer: 'swal-general-htmlcontainer',
    actions: 'swal-general-actions',
    confirmButton: 'button button-primary swal-general-button'
  }
});


// Helper functions
function AlertMessage(icon, message) {
  return styledSwal.fire({text: message, icon: icon});
}


//
// In-Place Editable with dangerouslySetInnerHTML
//
function IPEInnerHtml({Class, InnerHtml, IPEPanelPos, Api}) {
  const isAdmin = useSelector((store) => store.auth.Admin.IsAdmin);

  const modeNormal = () => {
    setIPEPanel(
      <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <div className="ipebtn" title="Edit" onClick={modeEditing}>
          <SvgPen />
        </div>
      </div>
    );
    setIPEField("normal");
  }

  const modeEditing = () => {
    setIPEPanel(
      <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <div className="ipebtn" title="Save" onClick={saveField}>
          <SvgFloppy />
        </div>
        <div className="ipebtn bigger120" title="Cancel" onClick={modeNormal}>
          <SvgXMark />
        </div>
      </div>
    );
    setIPEField("editor");
  }

  const saveField = () => {
    const DataHtml = EditorInstanceRef.current.getData();

    postUpdateIPE(Api, DataHtml).then(jsonResponse => {
      //console.log(jsonResponse); // For debugging
      if (jsonResponse.Code === 1) {
        setFieldHtml(DataHtml);
        modeNormal();    
      } else if (jsonResponse.Code === 0) {
        AlertMessage("warning", jsonResponse.Message);
      } else { // Code === -1 or anything else
        AlertMessage("error", "Error occurred!");
      }
    });
  }

  // Create a class list for the panel
  var PanelClass = "ipe-panel";
  if (IPEPanelPos.indexOf('float') >= 0) PanelClass += " float";
  if (IPEPanelPos.indexOf('in') >= 0) PanelClass += " in";
  if (IPEPanelPos.indexOf('top') >= 0) PanelClass += " top";
  if (IPEPanelPos.indexOf('right') >= 0) PanelClass += " right";

  // Component state
  const [IPEPanel, setIPEPanel] = React.useState(
    <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
      <div className="ipebtn" title="Edit" onClick={modeEditing}>
        <SvgPen />
      </div>
    </div>
  );
  const [IPEField, setIPEField] = React.useState("normal");
  const EditorInstanceRef = React.useRef(null);
  const [FieldHtml, setFieldHtml] = React.useState("");

  return (
    <div className="ipe-container">
      {IPEPanel}
      {IPEField === "editor" ?
        <CKEditor
          editor={ClassicEditor}
          data={FieldHtml === "" ? InnerHtml : FieldHtml}
          onReady={editor => {
            EditorInstanceRef.current = editor;
          }}
        />
      :
        <div
          className={Class}
          dangerouslySetInnerHTML={{__html: FieldHtml === "" ? InnerHtml : FieldHtml}}
        ></div>
      }
    </div>
  );
}


//
// In-Place Editable with simple text
//
function IPESimple({Class, HtmlTag, Text, IPEPanelPos, Api}) {
  const isAdmin = useSelector((store) => store.auth.Admin.IsAdmin);
  const FieldTag = `${HtmlTag}`;
  const PanelTag = `${HtmlTag === "span" ? "span" : "div"}`;
  const refFieldText = React.useRef("");

  const useFocus = () => {
    const htmlElRef = React.useRef(null);
    const setFocus = () => {
      setTimeout(() => { // Give some time for the component to render as "contentEditable" before applying "Focus"
        htmlElRef.current && htmlElRef.current.focus()
      }, 250);
    }
    return [htmlElRef, setFocus];
  }
  const [inputRef, setInputFocus] = useFocus();

  const modeNormal = () => {
    setIPEPanel(
      <PanelTag className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <PanelTag className="ipebtn" title="Edit" onClick={modeEditing}>
          <SvgPen />
        </PanelTag>
      </PanelTag>
    );
    setIPEField(false);
  }

  const modeEditing = () => {
    let editingPanelClass = PanelClass + " editing";
    setIPEPanel(
      <PanelTag className={editingPanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <PanelTag className="ipebtn" title="Save" onClick={saveField}>
          <SvgFloppy />
        </PanelTag>
        <PanelTag className="ipebtn bigger120" title="Cancel" onClick={modeNormal}>
          <SvgXMark />
        </PanelTag>
      </PanelTag>
    );
    setIPEField(true);
    setInputFocus();
  }

  const saveField = () => {
    const DataHtml = inputRef.current.innerText;

    postUpdateIPE(Api, DataHtml).then(jsonResponse => {
      //console.log(jsonResponse); // For debugging
      if (jsonResponse.Code === 1) {
        refFieldText.current = DataHtml;
        modeNormal();    
      } else if (jsonResponse.Code === 0) {
        AlertMessage("warning", jsonResponse.Message);
      } else { // Code === -1 or anything else
        AlertMessage("error", "Error occurred!");
      }
    });
  }

  // Create a class list for the panel
  var PanelClass = "ipe-panel";
  if (IPEPanelPos.indexOf('absolute') >= 0) PanelClass += " absolute";
  if (IPEPanelPos.indexOf('float') >= 0) PanelClass += " float";
  if (IPEPanelPos.indexOf('top') >= 0) PanelClass += " top";
  if (IPEPanelPos.indexOf('right') >= 0) PanelClass += " right";
  if (IPEPanelPos.indexOf('in') >= 0) PanelClass += " in";
  if (IPEPanelPos.indexOf('out') >= 0) PanelClass += " out";

  // Component state
  const [IPEPanel, setIPEPanel] = React.useState(
    <PanelTag className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
      <PanelTag className="ipebtn" title="Edit" onClick={modeEditing}>
        <SvgPen />
      </PanelTag>
    </PanelTag>
  );
  const [IPEField, setIPEField] = React.useState(false);
  
  return (
    <PanelTag className="ipe-container">
      {IPEPanel}
      <FieldTag
        className={Class}
        contentEditable={IPEField === true ? true : false}
        ref={inputRef}
      >{refFieldText.current === "" ? Text : refFieldText.current}</FieldTag>
    </PanelTag>
  );
}


//
// In-Place Editable with a date/time control
//
function IPEDateTime({DateTime, IPEPanelPos, Api, Params=null}) {
  const isAdmin = useSelector((store) => store.auth.Admin.IsAdmin);

  const modeNormal = () => {
    setIPEPanel(
      <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <div className="ipebtn" title="Edit" onClick={modeEditing}>
          <SvgPen />
        </div>
      </div>
    );
    setIPEState("normal");
  }

  const modeEditing = () => {
    let clsPanel = PanelClass + " editing";
    setIPEPanel(
      <div className={clsPanel} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <div className="ipebtn" title="Save" onClick={saveField}>
          <SvgFloppy />
        </div>
        <div className="ipebtn bigger120" title="Cancel" onClick={modeNormal}>
          <SvgXMark />
        </div>
      </div>
    );
    setIPEState("editing");
  }

  const saveField = () => {
    const Data = refDateTimeElm.current.value;

    postUpdateIPE(Api, Data, Params).then(jsonResponse => {
      //console.log(jsonResponse); // For debugging
      if (jsonResponse.Code === 1) {
        setDateTimeVal(Data);
        modeNormal();    
      } else if (jsonResponse.Code === 0) {
        AlertMessage("warning", jsonResponse.Message);
      } else { // Code === -1 or anything else
        AlertMessage("error", "Error occurred!");
      }
    });
  }

  // Create a class list for the panel
  var PanelClass = "ipe-panel";
  if (IPEPanelPos.indexOf('absolute') >= 0) PanelClass += " absolute";
  if (IPEPanelPos.indexOf('in') >= 0) PanelClass += " in";
  if (IPEPanelPos.indexOf('top') >= 0) PanelClass += " top";
  if (IPEPanelPos.indexOf('right') >= 0) PanelClass += " right";

  // Component state
  const [IPEPanel, setIPEPanel] = React.useState(
    <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
      <div className="ipebtn" title="Edit" onClick={modeEditing}>
        <SvgPen />
      </div>
    </div>
  );
  const [IPEState, setIPEState] = React.useState("normal");
  const refDateTimeElm = React.useRef(null);
  const [DateTimeVal, setDateTimeVal] = React.useState("");

  return (
    <div className="ipe-container">
      {IPEPanel}
      {IPEState === "editing" ?
        <input
          type="datetime-local"
          className="ipe-duedate"
          defaultValue={DateTimeVal === "" ? DateTime : DateTimeVal}
          ref={refDateTimeElm}
        />
      :
        <Clock
          date={utils.getDueDateString(DateTimeVal === "" ? DateTime : DateTimeVal)}
          isWithIPE={isAdmin}
        ></Clock>
      }
    </div>
  );
}


//
// Special In-Place Editable for AceEditor
//
function IPEAceEditor(props) {
  const isAdmin = useSelector((store) => store.auth.Admin.IsAdmin);

  const modeNormal = () => {
    setIPEPanel(
      <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <div className="ipebtn" title="Edit" onClick={modeEditing}>
          <SvgPen />
        </div>
      </div>
    );
    setEditorMode("student");
  }

  const modeEditing = () => {
    setIPEPanel(
      <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
        <div className="ipebtn" title="Save" onClick={saveField}>
          <SvgFloppy />
        </div>
        <div className="ipebtn bigger120" title="Cancel" onClick={modeNormal}>
          <SvgXMark />
        </div>
      </div>
    );
    setEditorMode("admin");
  }

  const saveField = () => {
    const Data = refAdminEditor.current.ref.current.editor.getValue();

    postUpdateIPE(props.Api, Data).then(jsonResponse => {
      //console.log(jsonResponse); // For debugging only
      if (jsonResponse.Code === 1) {
        modeNormal();    
      } else if (jsonResponse.Code === 0) {
        AlertMessage("warning", jsonResponse.Message);
      } else { // Code === -1 or anything else
        AlertMessage("error", "Error occurred!");
      }
    });
  }

  // Create a class list for the panel
  var PanelClass = "ipe-panel float top right in";

  // Component states
  const [IPEPanel, setIPEPanel] = React.useState(
    <div className={PanelClass} style={isAdmin ? {display: 'flex'} : {display: 'none'}}>
      <div className="ipebtn" title="Edit" onClick={modeEditing}>
        <SvgPen />
      </div>
    </div>
  );
  const [EditorMode, setEditorMode] = React.useState("student");
  const refAdminEditor = React.useRef(null);

  return (
    <div className="ipe-container" style={{height: "100%"}}>
      {IPEPanel}
      <div className={props.Class} style={{height: "100%"}}>
        {props.children[0](EditorMode === 'admin' ? "none" : "block")}
        {refAdminEditor.current = props.children[1](EditorMode === 'admin' ? "block" : "none")}
      </div>
    </div>
  );
}


const InPlaceEditable = {
  IPEInnerHtml,
  IPESimple,
  IPEDateTime,
  IPEAceEditor
}

export default InPlaceEditable;
