import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface ModalComponentProps {
  addButton?: string;
  title?: string;
  bodyContent?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick: () => void; // Function to handle primary button click
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  addButton,
  title,
  bodyContent,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
}) => {
  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {addButton}
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="staticBackdropLabel"
                style={{ color: "#000" }}
              >
                <strong>{title}</strong>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ color: "#000" }}>
              {bodyContent}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {secondaryButtonText}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onPrimaryButtonClick} // This triggers the onPrimaryButtonClick function passed as prop
              >
                {primaryButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
