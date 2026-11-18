import React from "react";
import "../../styles/Card.css";

interface CardProps {
  color?: string;
  locality?: string;
  headquarters?: string;
  polinom?: string;
  department?: string;
  editText?: string;
  visibleText?: string;
  deleteText?: string;
  undeleteText?: string; 
  update?: () => void;
  onInActive?: () => void; // Add onInActive function prop
  onActive?: () => void; // Add onActive function prop
  isDeleted?: boolean; // Accept is_deleted property as boolean
}

const Card: React.FC<CardProps> = ({
  color,
  locality,
  headquarters,
  polinom,
  department,
  editText,
  visibleText,
  deleteText,
  undeleteText,
  update,
  onInActive,
  onActive,
  isDeleted, // is_deleted is a boolean
}) => {
  return (
    <div className="card-container">
      <div className={`card-row ${isDeleted ? "deleted" : ""}`}>
        {color && (
          <div className="color-circle" style={{ backgroundColor: color }} />
        )}

        {locality && <div className="card-data data-locality">{locality}</div>}
        {headquarters && <div className="card-data data-headquarters">{headquarters}</div>}
        {department && <div className="card-data data-department">{department}</div>}
        {polinom && <div className="card-data data-polinom">{polinom}</div>}

        <div className="card-buttons">
          {editText && <button className="btn btn-success" onClick={update}>{editText}</button>}
          {visibleText && (
            <button className="btn btn-warning">{visibleText}</button>
          )}

          {/* Conditionally render delete or undelete buttons based on isDeleted */}
          {!isDeleted ? (
            <button className="btn btn-warning" onClick={onInActive}>
              {deleteText}
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={onActive}>
              {undeleteText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
