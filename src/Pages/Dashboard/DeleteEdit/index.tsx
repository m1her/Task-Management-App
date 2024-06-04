import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./../style.css";
import React from "react";

interface DeleteEditTypes {
  setCrudFlag: React.Dispatch<React.SetStateAction<string>>;
  dragToggler: boolean;
}

export const DeleteEdit = ({ setCrudFlag, dragToggler }: DeleteEditTypes) => {
  return (
    <div className="dash-delete-edit-container">
      <div className="dash-delete">
        <FontAwesomeIcon icon={faTrashCan} />
        {dragToggler && (
          <div
            className="dash-delete-edit-pointer-card"
            onMouseOver={() => setCrudFlag("delete")}
            onMouseLeave={() => setCrudFlag("")}
          ></div>
        )}
      </div>
      <div className="dash-edit">
        <FontAwesomeIcon icon={faEdit} />
        {dragToggler && (
          <div
            className="dash-delete-edit-pointer-card"
            onMouseOver={() => setCrudFlag("edit")}
            onMouseLeave={() => setCrudFlag("")}
          ></div>
        )}
      </div>
    </div>
  );
};
