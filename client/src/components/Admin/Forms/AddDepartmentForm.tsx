import React, { useState, useImperativeHandle, forwardRef } from "react";
import Select from "react-select";
import * as yup from "yup"; // Uvoz yup-a
import { Departments } from "../../../models/Departments";
import { useLocationContext } from "../../../context/location.context";
import { useHeadquarterContext } from "../../../context/headquarter.context";
import useValidation from "../../../hooks/validation/useValidation"; 
import "../../../styles/Forms.css";


interface AddDepartmentFormProps {
  submitForm: (departmentData: {
    department_name: string;
    id_locality: string;
    id_headquarters: string;
  }) => Promise<void>; // Submit mora biti asinkron zbog validacije
}

// Tip za opcije react-select-a
interface SelectOption {
  value: string;
  label: string;
}

const AddDepartmentForm = forwardRef<unknown, AddDepartmentFormProps>(
  ({ submitForm }, ref) => {
    const { validationDepartment } = useValidation(); // Inicijalizacija validacije

    const [newDepartment, setNewDepartment] = useState<Departments>({
      id: "",
      department_name: "",
      id_headquarters: "",
      id_locality: "",
      is_deleted: false,
      locality_name: "",
      polinom: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Stanje za greške

    const { location } = useLocationContext();
    const { headquarter } = useHeadquarterContext();

    const locationOptions: SelectOption[] = location.map((loc) => ({
      value: loc.id,
      label: loc.locality_name,
    }));

    const headquartersOptions: SelectOption[] = headquarter.map((hq) => ({
      value: hq.id,
      label: hq.headquarters_name,
    }));

    // --- FUNKCIJE ZA RUKOVANJE PROMJENAMA I BRISANJEM GREŠAKA ---

    // Generička funkcija za rukovanje promjenama u Select komponentama
    const handleSelectChange = (
      selectedOption: SelectOption | null,
      fieldName: "id_locality" | "id_headquarters"
    ) => {
      const value = selectedOption ? selectedOption.value : "";
      
      setNewDepartment((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));

      // Brisanje greške čim korisnik odabere
      if (errors[fieldName]) {
        setErrors((prev) => {
          const { [fieldName]: removedError, ...rest } = prev;
          return rest;
        });
      }
    };
    
    // Funkcija za rukovanje promjenom u input polju (department_name)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      setNewDepartment((prevState) => ({
        ...prevState,
        department_name: formattedValue,
      }));

      // Brisanje greške čim korisnik počne upisivati
      if (errors.department_name) {
        setErrors((prev) => {
          const { department_name, ...rest } = prev;
          return rest;
        });
      }
    };

    // --- GLAVNA FUNKCIJA ZA SLANJE FORME S YUP VALIDACIJOM ---
    const handleSubmit = async () => {
      const dataToValidate = {
        id_locality: newDepartment.id_locality,
        id_headquarters: newDepartment.id_headquarters,
        department_name: newDepartment.department_name,
      };

      try {
        await validationDepartment.validate(dataToValidate, {
          abortEarly: false,
        });

        // 2. VALIDACIJA USPJEŠNA
        setErrors({});

        // Submit formi
        await submitForm(newDepartment);

        // Resetiranje forme
        setNewDepartment({
          id: "",
          department_name: "",
          id_headquarters: "",
          id_locality: "",
          is_deleted: false,
          locality_name: "",
          polinom: "",
        });
        
      } catch (error) {
        // 3. VALIDACIJA NEUSPJEŠNA
        const newErrors: { [key: string]: string } = {};

        if (error instanceof yup.ValidationError) {
          error.inner.forEach((err) => {
            if (err.path) {
              newErrors[err.path] = err.message;
            }
          });
          setErrors(newErrors);
          console.error("Validacija odjela nije uspjela:", newErrors);
        }
      }
    };

    // Expose the handleSubmit function to the parent via ref
    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="container mt-2">
        <form id="addDepartment" onSubmit={(e) => e.preventDefault()}>
          {/* Polje Lokacija (id_locality) */}
          <div className="mb-3">
            <label htmlFor="id_locality" className="form-label">
              Lokacija
            </label>
            <Select
              options={locationOptions}
              className={errors.id_locality ? 'is-invalid-select' : ''} // Dodavanje klase za grešku
              value={
                newDepartment.id_locality
                  ? locationOptions.find(
                      (option) => option.value === newDepartment.id_locality
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "id_locality");
              }}
              placeholder="Odaberi lokalitet"
            />
            {errors.id_locality && (
              <div className="invalid-feedback d-block">
                {errors.id_locality}
              </div>
            )}
          </div>
          
          {/* Polje KZOS (id_headquarters) */}
          <div className="mb-3">
            <label htmlFor="id_headquarters" className="form-label">
              KZOS
            </label>
            <Select
              options={headquartersOptions}
              className={errors.id_headquarters ? 'is-invalid-select' : ''} // Dodavanje klase za grešku
              value={
                newDepartment.id_headquarters
                  ? headquartersOptions.find(
                      (option) => option.value === newDepartment.id_headquarters
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "id_headquarters");
              }}
              placeholder="Odaberi KZOS"
            />
            {errors.id_headquarters && (
              <div className="invalid-feedback d-block">
                {errors.id_headquarters}
              </div>
            )}
          </div>
          
          {/* Polje Organizaciska jedinica (department_name) */}
          <div className="mb-3">
            <label htmlFor="department_name" className="form-label">
              Organizaciska jedinica
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.department_name ? "is-invalid" : ""
              }`}
              name="department_name"
              id="department_name"
              placeholder="Unesite odjel"
              value={newDepartment.department_name}
              onChange={handleNameChange} // Koristi izdvojenu funkciju
            />
            {errors.department_name && (
              <div className="invalid-feedback d-block">
                {errors.department_name}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
);

export default AddDepartmentForm;
