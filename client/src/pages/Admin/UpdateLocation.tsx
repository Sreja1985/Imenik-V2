import React, { useState, useEffect } from "react";
import ColorPicker from "react-pick-color";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocationContext } from "../../context/location.context";
import { Location } from "../../models/Location";
import "../../styles/Forms.css";

function UpdateLocation() {
  const { id } = useParams(); // Extract the `id` from the URL
  const navigate = useNavigate(); // For navigation
  const { location, editLocation, selectedLocationId } = useLocationContext();

  // State for the current location being edited
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  // Fetch current location by `id`
  useEffect(() => {
    console.log("Received ID:", id); // Debugging - Make sure the ID is correct
    console.log("Location data:", location); // Debugging - Check the location data

    if (id) {
      if (location.length > 0) {
        // Convert id to number before comparison
        const selectedLocation = location.find(
          (loc) => loc.id === selectedLocationId
        );

        if (selectedLocation) {
          setCurrentLocation(selectedLocation);
          localStorage.setItem(
            "currentLocation",
            JSON.stringify(selectedLocation)
          );
        } else {
          console.log("Location not found"); // Debugging
        }
      } else {
        // Fallback: retrieve from local storage
        const storedLocation = localStorage.getItem("currentLocation");
        if (storedLocation) {
          setCurrentLocation(JSON.parse(storedLocation));
        }
      }
    }
  }, [id, location]);

  // Handle form field changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setCurrentLocation((prevLocation) => {
    if (prevLocation) {
      return {
        ...prevLocation,
        [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      };
    }
    return prevLocation;
  }); 
};

// Handle color change
const handleColorChange = (color: { hex: string }) => {
  setCurrentLocation((prevLocation) => {
    if (prevLocation) {
      return {
        ...prevLocation,
        locality_color: color.hex,
      };
    }
    return prevLocation;
  });
};


  // Handle form submission
  const handleSubmit = () => {
    if (currentLocation) {
      editLocation(currentLocation);
      console.log("Updated location:", currentLocation);
      navigate(-1); // Optionally navigate back after updating
    }
  };

  return (
    <div className="main-container">
      {currentLocation ? (
        <div className="container d-flex justify-content-center">
          <div className="w-100 p-4 rounded form-admin">
            <form id="updateLocation" onSubmit={(e) => e.preventDefault()}>
            <h4>Uredi lokaciju</h4>
            <hr/>
              <div className="mb-3">
                <label htmlFor="locality_name" className="form-label">
                  Lokalitet
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="locality_name"
                  id="locality_name"
                  placeholder="Unesite lokalitet"
                  value={currentLocation.locality_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="color-picker" className="form-label">
                  Odaberi boju
                </label>
                <ColorPicker
                  className="custom-color-picker"
                  color={currentLocation.locality_color}
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

export default UpdateLocation; 
