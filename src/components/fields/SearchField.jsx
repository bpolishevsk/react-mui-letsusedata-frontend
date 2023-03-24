import * as React from "react";
import "./SearchField.scss";
import Icons from "../../assets/icons";
import clsx from "clsx";
function SearchField({ value, onChange, style, outlined }) {
  return (
    <div className={clsx("search-field-with-icon",{
      outlined
    })} style={style}>
      <span className="icon">
        <Icons.Search></Icons.Search>
      </span>
      <input placeholder="Search.." value={value} onChange={onChange} />
    </div>
  );
}

SearchField.defaultProps = {
  value: "",
  style: {},
  onChange: () => {},
  outlined: false
};

export default SearchField;
