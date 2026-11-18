import React from "react";
import "../../styles/Card.css";

interface ReturnNumberCardProps {
  phone_name?: string;
  phone_number?: number;
  vip_number?: string | null;
  polinom?: string;
  locality?: string;
  department?: string;
  editText?: string;
  returnText?: string;
  toReturn?: string;
  update?: () => void;
  onReturn?: () => void;
}

const ReturnNumberCard: React.FC<ReturnNumberCardProps> = ({
  phone_name,
  phone_number,
  vip_number,
  polinom,
  locality,
  department,
  update,
  editText,
  returnText,
  toReturn,
  onReturn,
}) => {
  return (
    <div className="card-container">
      <div className="card-row">
        {locality && <div className="card-data">{locality}</div>}
        {department && <div className="card-data">{department}</div>}
        {polinom && <div className="card-data">{polinom}</div>}
        {phone_name && <div className="card-data">{phone_name}</div>}
        {phone_number && <div className="card-data">{phone_number}</div>}
        {vip_number && <div className="card-data">{vip_number}</div>}

        {/* Dodan roditeljski div za gumbe */}
        <div className="card-buttons">
          {editText && (
            <button className="btn btn-success" onClick={update}>
              {editText}
            </button>
          )}
          {toReturn && (
            <button className="btn btn-warning" onClick={onReturn}>
              {returnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnNumberCard;