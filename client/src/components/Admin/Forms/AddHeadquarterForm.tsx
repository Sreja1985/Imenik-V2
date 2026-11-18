import React, { useState, useImperativeHandle, forwardRef } from "react";
import ColorPicker from "react-pick-color";
import * as yup from "yup";
import { Headquarters } from "../../../models/Headquarters";
import useValidation from "../../../hooks/validation/useValidation";

interface AddHeadquarterFormProps {
  submitForm: (headquarterData: {
    headquarters_name: string;
    short_name: string;
    headquarters_color: string;
  }) => Promise<void>;
}

const AddHeadquarterForm = forwardRef<unknown, AddHeadquarterFormProps>(
  ({ submitForm }, ref) => {
    const { validationHeadquater } = useValidation();
    const [newHeadquarter, setNewHeadquarter] = useState<Headquarters>({
      id: "",
      headquarters_name: "",
      short_name: "",
      headquarters_color: "#FFFFFF",
      is_deleted: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({}); 

    // --- FUNKCIJE ZA RUKOVANJE PROMJENAMA I BRISANJEM GREŠAKA ---

    const handleColorChange = (color: { hex: string }) => {
      setNewHeadquarter((prevState) => ({
        ...prevState,
        headquarters_color: color.hex,
      }));
      // Brisanje greške čim se boja promijeni
      if (errors.headquarters_color)
        setErrors((prev) => {
          const { headquarters_color, ...rest } = prev;
          return rest;
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      
      setNewHeadquarter((prevState) => ({
        ...prevState,
        headquarters_name: formattedValue,
      }));
      
      // Brisanje greške čim korisnik počne upisivati
      if (errors.headquarters_name)
        setErrors((prev) => {
          const { headquarters_name, ...rest } = prev;
          return rest;
        });
    };

    const handleShortNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      
      setNewHeadquarter((prevState) => ({
        ...prevState,
        short_name: value,
      }));
      
      // Brisanje greške čim korisnik počne upisivati
      if (errors.short_name)
        setErrors((prev) => {
          const { short_name, ...rest } = prev;
          return rest;
        });
    }; 
    
    // --- SUBMIT S VALIDACIJOM ---

    const handleSubmit = async () => {
      const dataToValidate = {
        headquarters_name: newHeadquarter.headquarters_name,
        short_name: newHeadquarter.short_name,
        headquarters_color:
          newHeadquarter.headquarters_color === "#FFFFFF" ||
          newHeadquarter.headquarters_color === ""
            ? ""
            : newHeadquarter.headquarters_color,
      };

      try {
        await validationHeadquater.validate(dataToValidate, {
          abortEarly: false,
        });

        setErrors({});
        await submitForm(newHeadquarter); 
        
        // Resetiranje forme
        setNewHeadquarter({
          id: "",
          headquarters_name: "",
          short_name: "",
          headquarters_color: "#FFFFFF",
          is_deleted: false,
        });
      } catch (error) {
        const newErrors: { [key: string]: string } = {};
        if (error instanceof yup.ValidationError) {
          error.inner.forEach((err) => {
            if (err.path) {
              newErrors[err.path] = err.message;
            }
          });
          setErrors(newErrors);
        }
      }
    }; 

    // Expose the handleSubmit function to the parent via ref
    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="container mt-2">
        <form id="addHeadquarter" onSubmit={(e) => e.preventDefault()}>
          {/* KZOS (headquarters_name) polje */}
          <div className="mb-3">
            <label htmlFor="headquarters_name" className="form-label">
              KZOS
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.headquarters_name ? "is-invalid" : ""
              }`}
              name="headquarters_name"
              id="headquarters_name"
              placeholder="Unesite KZOS"
              value={newHeadquarter.headquarters_name} 
              // 🌟 ISPRAVLJENO: Pozivamo handleNameChange funkciju
              onChange={handleNameChange}
            />
            {errors.headquarters_name && (
              <div className="invalid-feedback ">
                {errors.headquarters_name}
              </div>
            )}
          </div>
          
          {/* Kratica (short_name) polje */}
          <div className="mb-3">
            <label htmlFor="short_name" className="form-label">
              Kratica
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.short_name ? "is-invalid" : ""
              }`}
              name="short_name"
              id="short_name"
              placeholder="Unesite karticu"
              maxLength={3}
              value={newHeadquarter.short_name}
              // 🌟 ISPRAVLJENO: Pozivamo handleShortNameChange funkciju
              onChange={handleShortNameChange}
            />
            {errors.short_name && (
              <div className="invalid-feedback d-block">
                {errors.short_name}
              </div>
            )}
          </div>
          
          {/* Polje za odabir boje */}
          <div className="mb-3">
            <label htmlFor="color-picker" className="form-label">
              Odaberi boju
            </label>
            <ColorPicker
              className="custom-color-picker"
              color={newHeadquarter.headquarters_color}
              onChange={handleColorChange}
            />
            {errors.headquarters_color && (
              <div className="text-danger mt-1">
                {errors.headquarters_color}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
);

export default AddHeadquarterForm;