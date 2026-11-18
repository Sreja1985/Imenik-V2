import React, { useState, useEffect } from "react";
import ColorPicker from "react-pick-color";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useHeadquarterContext } from "../../context/headquarter.context";
import { Headquarters } from "../../models/Headquarters";
import "../../styles/Forms.css";

function UpdateHeadquarter() {
  const { id } = useParams(); // Extract the `id` from the URL
  const navigate = useNavigate(); // For navigation
  const { headquarter, editHeadquarter, selectedHeadquarterId } =
    useHeadquarterContext();

  // State for the current headquarter being edited
  const [currentHeadquarter, setCurrentHeadquarter] =
    useState<Headquarters | null>(null);

  // Fetch current headquarter by `id`
  useEffect(() => {
    console.log("Received ID:", id); // Debugging - Make sure the ID is correct
    console.log("Headquarter data:", headquarter); // Debugging - Check the headquarter data

    if (id) {
      if (headquarter.length > 0) {
        // Convert id to number before comparison
        const selectedHeadquarter = headquarter.find(
          (head) => head.id === selectedHeadquarterId
        );

        if (selectedHeadquarter) {
          setCurrentHeadquarter(selectedHeadquarter);
          localStorage.setItem(
            "currentHeadquarter",
            JSON.stringify(selectedHeadquarter)
          );
        } else {
          console.log("Headquarter not found"); // Debugging
        }
      } else {
        // Fallback: retrieve from local storage
        const storedHeadquarter = localStorage.getItem("currentHeadquarter");
        if (storedHeadquarter) {
          setCurrentHeadquarter(JSON.parse(storedHeadquarter));
        }
      }
    }
  }, [id, headquarter]);

  // Handle form field changes
  /*
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentHeadquarter((prevHeadquarter) => {
      if (prevHeadquarter) {
        return {
          ...prevHeadquarter,
          [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        };
      }
      return prevHeadquarter;
    });
  };
*/
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setCurrentHeadquarter((prevHeadquarter) => {
    if (prevHeadquarter) {
      // Check if the field being updated is `short_name`
      if (name === "short_name") {
        return {
          ...prevHeadquarter,
          [name]: value.toUpperCase(), // Ensure `short_name` is always uppercase
        };
      }

      // Default behavior for other fields
      return {
        ...prevHeadquarter,
        [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      };
    }
    return prevHeadquarter;
  });
};

  // Handle color change
  const handleColorChange = (color: { hex: string }) => {
    setCurrentHeadquarter((prevHeadquarter) => {
      if (prevHeadquarter) {
        return {
          ...prevHeadquarter,
          headquarters_color: color.hex,
        };
      }
      return prevHeadquarter;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (currentHeadquarter) {
      editHeadquarter(currentHeadquarter);
      console.log("Updated headquarter:", currentHeadquarter);
      navigate(-1); // Optionally navigate back after updating
    }
  };

  return (
    <div className="main-container">
      {currentHeadquarter ? (
        <div className="container d-flex justify-content-center">
          <div className="w-100 p-4 rounded form-admin">
            <form id="updateLocation" onSubmit={(e) => e.preventDefault()}>
            <h4>Uredi KZOS</h4>
            <hr/>
              <div className="mb-3">
                <label htmlFor="locality_name" className="form-label">
                  KZOS
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="headquarters_name"
                  id="headquarters_name"
                  placeholder="Unesite KZOS"
                  value={currentHeadquarter.headquarters_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="short_name" className="form-label">
                  Kratica
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="short_name"
                  id="short_name"
                  placeholder="Unesite karticu"
                  maxLength={3}
                  value={currentHeadquarter.short_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="color-picker" className="form-label">
                  Odaberi boju
                </label>
                <ColorPicker
                  className="custom-color-picker"
                  color={currentHeadquarter.headquarters_color}
                  onChange={handleColorChange}
                />
              </div>
              <div className="mt-5 d-flex justify-content-start">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Odustani
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Ažuriraj
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p className="text-center">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <h4>Povratak</h4>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
export default UpdateHeadquarter;
