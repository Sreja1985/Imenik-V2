import React from "react";
import "../../styles/Card.css";

interface DepartmentCardProps {
  locality?: string;
  polinom?: string;
  department?: string;
  editText?: string;
  deleteText?: string;
  undeleteText?: string;
  isDeleted?: boolean; 
  isDisabled?: boolean;
  disabledReason?: string;
  update?: () => void;
  onInActive?: () => void;
  onActive?: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  locality,
  polinom,
  department,
  editText,
  deleteText,
  undeleteText,
  isDeleted,
  isDisabled,
  disabledReason,
  update,
  onInActive,
  onActive,
}) => {
  return (
    <div className="card-container">
      <div className={`card-row ${isDeleted ? "deleted" : ""}`}>
        {department && <div className="card-data data-department">{department}</div>}
        {polinom && <div className="card-data data-polinom">{polinom}</div>}
        {locality && <div className="card-data data-locality">{locality}</div>}

        <div className="card-buttons">
          {editText && (
            <button className="btn btn-success" onClick={update}>
              {editText}
            </button>
          )}

          {!isDeleted ? (
            <button className="btn btn-warning" onClick={onInActive}>
              {deleteText}
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={onActive}
              disabled={isDisabled}
              title={isDisabled ? disabledReason : ""} 
            >
              {undeleteText}
            </button>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
