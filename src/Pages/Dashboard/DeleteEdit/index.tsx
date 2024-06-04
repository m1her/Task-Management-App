import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./../style.css";
import React from "react";

interface DeleteEditTypes {
  setCrudFlag: React.Dispatch<React.SetStateAction<string>>;
}

export const DeleteEdit = ({ setCrudFlag }: DeleteEditTypes) => {
  return (
    <div className="dash-delete-edit-container">
      <div className="dash-delete">
        <FontAwesomeIcon icon={faTrashCan} />
        <div
          className="dash-delete-edit-pointer-card"
          onMouseOver={() => setCrudFlag("delete")}
          onMouseLeave={() => setCrudFlag("")}
        ></div>
      </div>
      <div className="dash-edit">
        <FontAwesomeIcon icon={faEdit} />
        <div
          className="dash-delete-edit-pointer-card"
          onMouseOver={() => setCrudFlag("edit")}
          onMouseLeave={() => setCrudFlag("")}
        ></div>
      </div>
    </div>
  );
};
