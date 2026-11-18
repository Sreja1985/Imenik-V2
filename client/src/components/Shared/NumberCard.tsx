import React from "react";
import "../../styles/Card.css";

interface NumberCardProps {
  phone_name?: string;
  phone_number?: number;
  vip_number?: string | null;
  polinom?: string;
  locality?: string;
  department?: string;
  editText?: string;
  returnText?: string,
  deleteText?: string;
  undeleteText?: string;
  toDeleteText?: string;
  toReturn?: string,
  isDeleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  disabledReason?: string;
  update?: () => void;
  onReturn?: () => void;
  onInActive?: () => void;
  onActive?: () => void;
  toDelete?: () => void;
}

const NumberCard: React.FC<NumberCardProps> = ({
  phone_name,
  phone_number,
  vip_number,
  polinom,
  locality,
  department,
  editText,
  returnText,
  deleteText,
  undeleteText,
  toDeleteText,
  toReturn,
  isDeleted,
  isActive,
  isDisabled,
  disabledReason,
  update,
  onReturn,
  onInActive,
  onActive,
  toDelete,
}) => {
  const canDeactivate = isActive && !isDeleted;
  const canActivate = !isActive && !isDeleted;

  return (
    <div className="card-container">
      <div
        className={`card-row ${
          isDeleted ? "deleted" : isActive ? "active" : "inactive"
        }`}
      >
        {locality && <div className="card-data data-locality">{locality}</div>}
        {department && <div className="card-data data-department">{department}</div>}
        {polinom && <div className="card-data data-polinom">{polinom}</div>}
        {phone_name && <div className="card-data data-phone_name">{phone_name}</div>}
        {phone_number && <div className="card-data data-phone_number">{phone_number}</div>}
        {vip_number && <div className="card-data data-vip_number">{vip_number}</div>}

        <div className="card-buttons">
          {editText && (
            <button className="btn btn-success" onClick={update}>
              {editText}
            </button>
          )}

          {canDeactivate ? (
            <button className="btn btn-warning" onClick={onInActive}>
              {deleteText || "Isključi"}
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={onActive}
              disabled={isDeleted || isDisabled}
              title={isDeleted ? "Related entity is deleted" : disabledReason}
            >
              {undeleteText || "Uključi"}
            </button>
          )}

          {toDeleteText && (
            <button
              className={`btn ${!canDeactivate ? "btn-danger" : "btn-secondary"}`}
              onClick={toDelete}
              disabled={canDeactivate}
            >
              {toDeleteText}
            </button>
          )}
          {toReturn && (
            <button className="btn btn-primary" onClick={onReturn}>
              {returnText}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default NumberCard;
