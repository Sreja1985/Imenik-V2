import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import { Departments } from "../../models/Departments";
import { useDepartmentContext } from "../../context/department.context";
import { useLocationContext } from "../../context/location.context";
import { useHeadquarterContext } from "../../context/headquarter.context";

function UpdateDepartment() {
  const { id } = useParams(); // Extract the `id` from the URL
  const navigate = useNavigate(); // For navigation
  const { department, editDepartment } = useDepartmentContext();
  const { location, selectedLocationId, setSelectedLocationId } =
    useLocationContext();
  const { headquarter, selectedHeadquarterId, setSelectedHeadquarterId } =
    useHeadquarterContext();

  // State for the current department being edited
  const [currentDepartment, setCurrentDepartment] =
    useState<Departments | null>(null);

  // Fetch the current department by `id`
  useEffect(() => {
    if (id) {
      if (department.length > 0) {
        const selectedDepartment = department.find((dep) => dep.id === id);
        if (selectedDepartment) {
          setCurrentDepartment(selectedDepartment);
        }
      } else {
        const storedDepartment = localStorage.getItem("currentDepartment");
        if (storedDepartment) {
          setCurrentDepartment(JSON.parse(storedDepartment));
        }
      }
    }
  }, [id, department]);

  // Convert data to format required by react-select
  const locationOptions = location.map((loc) => ({
    value: loc.id,
    label: loc.locality_name,
  }));

  const headquartersOptions = headquarter.map((hq) => ({
    value: hq.id,
    label: hq.headquarters_name,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentDepartment((prevDepartment) => {
      if (prevDepartment) {
        return {
          ...prevDepartment,
          [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        };
      }
      return prevDepartment;
    });
  };

  const handleSubmit = () => {
    if (currentDepartment) {
      editDepartment(currentDepartment);
      navigate(-1);
    }
  };

  return (
    <div className="main-container">
      {currentDepartment ? (
        <div className="container d-flex justify-content-center">
          <div className="w-100 p-4 rounded form-admin">
            <form id="updateDepartment" onSubmit={(e) => e.preventDefault()}>
            <h4>Uredi odjel</h4>
            <hr/>
              <div className="mb-3">
                <label htmlFor="id_locality" className="form-label">
                  Lokacija
                </label>
                <Select
                  options={locationOptions}
                  value={locationOptions.find(
                    (option) => option.value === currentDepartment.id_locality
                  )}
                  onChange={(selectedOption) => {
                    setSelectedLocationId(
                      selectedOption ? selectedOption.value : null
                    );
                    setCurrentDepartment((prevState) => ({
                      ...prevState!,
                      id_locality: selectedOption ? selectedOption.value : "",
                    }));
                  }}
                  placeholder="Odaberi lokalitet"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="id_headquarters" className="form-label">
                  KZOS
                </label>
                <Select
                  options={headquartersOptions}
                  value={headquartersOptions.find(
                    (option) =>
                      option.value === currentDepartment.id_headquarters
                  )}
                  onChange={(selectedOption) => {
                    setSelectedHeadquarterId(
                      selectedOption ? selectedOption.value : null
                    );
                    setCurrentDepartment((prevState) => ({
                      ...prevState!,
                      id_headquarters: selectedOption
                        ? selectedOption.value
                        : "",
                    }));
                  }}
                  placeholder="Odaberi KZOS"
                />
              </div>
              {/* Department Name Input */}
              <div className="mb-3">
                <label htmlFor="department_name" className="form-label">
                  Organizaciska jedinica
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="department_name"
                  id="department_name"
                  placeholder="Unesite odjel"
                  value={currentDepartment.department_name}
                  onChange={handleInputChange}
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

export default UpdateDepartment;
