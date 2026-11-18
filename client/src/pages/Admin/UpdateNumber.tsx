import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import { Numbers } from "../../models/Numbers";
import { useNumberContext } from "../../context/number.context";
import { useLocationContext } from "../../context/location.context";
import { useHeadquarterContext } from "../../context/headquarter.context";
import { useDepartmentContext } from "../../context/department.context";
import "../../styles/Forms.css";

function UpdateNumber() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { number, editNumber } = useNumberContext();
  const { location } = useLocationContext();
  const { headquarter } = useHeadquarterContext();
  const { department } = useDepartmentContext();

  const [currentNumber, setCurrentNumber] = useState<Numbers | null>(null);

  useEffect(() => {
    if (id) {
      if (number.length > 0) {
        const selectedNumber = number.find((num) => num.id === id);
        if (selectedNumber) {
          setCurrentNumber(selectedNumber);
        }
      } else {
        const storedNumber = localStorage.getItem("currentNumber");
        if (storedNumber) {
          setCurrentNumber(JSON.parse(storedNumber));
        }
      }
    }
  }, [id, number]);

  // Ovaj useEffect automatski resetira odabrani odjel
  // kada se promijeni lokacija ili sjedište.
  useEffect(() => {
    if (currentNumber) {
      const isDepartmentStillValid = filteredDepartments.some(
        (dep) => dep.id === currentNumber.id_departments
      );
      if (!isDepartmentStillValid) {
        setCurrentNumber((prevState) => ({
          ...prevState!,
          id_departments: "", // <-- Ovdje je promjena
        }));
      }
    }
  }, [currentNumber?.id_locality, currentNumber?.id_headquarters, department]);

  const filteredDepartments = department.filter((dep) => {
    return (
      dep.id_locality === currentNumber?.id_locality &&
      dep.id_headquarters === currentNumber?.id_headquarters
    );
  });

  const locationOptions = location.map((loc) => ({
    value: loc.id,
    label: loc.locality_name,
  }));

  const headquartersOptions = headquarter.map((hq) => ({
    value: hq.id,
    label: hq.headquarters_name,
  }));

  const departmentOptions = filteredDepartments.map((dep) => ({
    value: dep.id,
    label: dep.department_name,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentNumber((prevNumber) => {
      if (prevNumber) {
        return {
          ...prevNumber,
          [name]: name === "phone_number" ? Number(value) : value,
        };
      }
      return prevNumber;
    });
  };

  const handleSelectChange = (
    selectedOption: any,
    fieldName: "id_locality" | "id_headquarters" | "id_departments"
  ) => {
    setCurrentNumber((prevNumber) => {
      if (prevNumber) {
        return {
          ...prevNumber,
          [fieldName]: selectedOption ? selectedOption.value : null,
        };
      }
      return prevNumber;
    });
  };

  const handleSubmit = () => {
    if (currentNumber) {
      editNumber(currentNumber);
      navigate(-1);
    }
  };

  return (
    <div className="main-container">
      {currentNumber ? (
        <div className="container d-flex justify-content-center">
          <div className="w-100 p-4 rounded form-admin">
            <form id="updateNumber" onSubmit={(e) => e.preventDefault()}>
              <h4>Uredi broj</h4>
              <hr />
              <div className="mb-3">
                <label htmlFor="id_locality" className="form-label">
                  Lokacija
                </label>
                <Select
                  options={locationOptions}
                  value={locationOptions.find(
                    (option) => option.value === currentNumber.id_locality
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "id_locality")
                  }
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
                    (option) => option.value === currentNumber.id_headquarters
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "id_headquarters")
                  }
                  placeholder="Odaberi KZOS"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="id_departments" className="form-label">
                  Organizaciona jedinica
                </label>
                <Select
                  options={departmentOptions}
                  isDisabled={
                    !currentNumber.id_locality ||
                    !currentNumber.id_headquarters ||
                    departmentOptions.length === 0
                  }
                  value={
                    currentNumber.id_departments
                      ? departmentOptions.find(
                          (option) =>
                            option.value === currentNumber.id_departments
                        )
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "id_departments")
                  }
                  placeholder="Odaberi organizacijsku jedinicu"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone_name" className="form-label">
                  Ime broja
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_name"
                  id="phone_name"
                  placeholder="Unesite ime"
                  value={currentNumber.phone_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">
                  Telefonski broj
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Unesite broj"
                  value={currentNumber.phone_number || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vip_number" className="form-label">
                  VIP broj
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="vip_number"
                  id="vip_number"
                  placeholder="Unesite VIP broj"
                  value={currentNumber.vip_number ?? ""}
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

export default UpdateNumber;