import IconUnchecked from "../../../../assets/icons/course/unchecked.svg";
import IconGreeChecked from "../../../../assets/icons/course/greenChecked.svg";

function MaterialsColumn({ module }) {
  return (
    <div className="">
      <h3 className="category-subject">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.954915 2.06107C0 3.3754 0 5.25027 0 9V11C0 14.7497 0 16.6246 0.954915 17.9389C1.26331 18.3634 1.6366 18.7367 2.06107 19.0451C3.3754 20 5.25027 20 9 20C12.7497 20 14.6246 20 15.9389 19.0451C16.3634 18.7367 16.7367 18.3634 17.0451 17.9389C18 16.6246 18 14.7497 18 11V9C18 5.25027 18 3.3754 17.0451 2.06107C16.7367 1.6366 16.3634 1.26331 15.9389 0.954915C14.6246 0 12.7497 0 9 0C5.25027 0 3.3754 0 2.06107 0.954915C1.6366 1.26331 1.26331 1.6366 0.954915 2.06107ZM5 5.25C4.58579 5.25 4.25 5.58579 4.25 6C4.25 6.41421 4.58579 6.75 5 6.75H13C13.4142 6.75 13.75 6.41421 13.75 6C13.75 5.58579 13.4142 5.25 13 5.25H5ZM7 9.25C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75H11C11.4142 10.75 11.75 10.4142 11.75 10C11.75 9.58579 11.4142 9.25 11 9.25H7ZM5 13.25C4.58579 13.25 4.25 13.5858 4.25 14C4.25 14.4142 4.58579 14.75 5 14.75H13C13.4142 14.75 13.75 14.4142 13.75 14C13.75 13.5858 13.4142 13.25 13 13.25H5Z"
            fill="#404040"
          />
        </svg>
        MATERIALS
      </h3>
      <div className="category-box">
        <h4>#1 C# Basic Syntax</h4>
        <h5>{module?.Description}</h5>
        <div className="material-list" style={{ marginTop: 16, padding: 16, background: "rgba(238, 243, 245, 0.7)", borderRadius: 8 }}>
          {module?.Materials.map((material) => (
            <span className="material-item" key={material?.ActivityId}>
              <span className="material-item">
                <img src={material?.Completion >= 100 ? IconGreeChecked : IconUnchecked} alt=""></img>
                {material?.Title}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaterialsColumn;
