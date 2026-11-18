import React, { useState, useImperativeHandle, forwardRef } from "react";
import ColorPicker from "react-pick-color";
import * as yup from "yup";
import { Location } from "../../../models/Location";
import useValidation from "../../../hooks/validation/useValidation";

// Definirajte interface za props
interface AddLocationFormProps {
  // submitForm je asinkrona funkcija
  submitForm: (locationData: {
    locality_name: string;
    locality_color: string;
  }) => Promise<void>;
}

const AddLocationForm = forwardRef<unknown, AddLocationFormProps>(
  ({ submitForm }, ref) => {
    const { validationLocation } = useValidation();

    const [newLocation, setNewLocation] = useState<Location>({
      id: "",
      locality_name: "",
      locality_color: "#FFFFFF",
      is_deleted: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // --- FUNKCIJE ZA RUKOVANJE PROMJENAMA ---

    const handleColorChange = (color: { hex: string }) => {
      setNewLocation((prevState) => ({
        ...prevState,
        locality_color: color.hex,
      }));

      if (errors.locality_color) {
        setErrors((prev) => {
          const { locality_color, ...rest } = prev;
          return rest;
        });
      }
    };

    const handleNameChange = (value: string) => {
      const formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      setNewLocation((prevState) => ({
        ...prevState,
        locality_name: formattedValue,
      }));

      if (errors.locality_name) {
        setErrors((prev) => {
          const { locality_name, ...rest } = prev;
          return rest;
        });
      }
    };

    // --- GLAVNA FUNKCIJA ZA SLANJE FORME S YUP VALIDACIJOM ---
    const handleSubmit = async () => {
      const dataToValidate = {
        locality_name: newLocation.locality_name,
        // Ako je boja defaultna (#FFFFFF), šaljemo prazan string za validaciju
        locality_color:
          newLocation.locality_color === "#FFFFFF"
            ? ""
            : newLocation.locality_color,
      };

      try {
        await validationLocation.validate(dataToValidate, {
          abortEarly: false,
        });

        // 2. VALIDACIJA USPJEŠNA
        setErrors({});

        // Čekamo da se izvrši submit (što uključuje addLocation i refreshLocation u roditelju)
        await submitForm(newLocation);

        // Resetiraj formu tek nakon što je lista sigurno ažurirana
        setNewLocation({
          id: "",
          locality_name: "",
          locality_color: "#FFFFFF",
          is_deleted: false,
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
          console.error("Validacija nije uspjela:", newErrors);
        }
      }
    };

    // Izlaganje handleSubmit funkcije roditeljskoj komponenti
    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    // JSX RENDER (Nepromijenjen)
    return (
      <div className="container mt-2">
        <form id="addLocation" onSubmit={(e) => e.preventDefault()}>
          {/* Polje Lokalitet (locality_name) */}
          <div className="mb-3">
            <label htmlFor="locality_name" className="form-label">
              Lokalitet
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.locality_name ? "is-invalid" : ""
              }`}
              name="locality_name"
              id="locality_name"
              placeholder="Unesite lokalitet"
              value={newLocation.locality_name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
            {errors.locality_name && (
              <div className="invalid-feedback d-block">
                {errors.locality_name}
              </div>
            )}
          </div>

          {/* Polje Boja (locality_color) */}
          <div className="mb-3">
            <label htmlFor="color-picker" className="form-label">
              Odaberi boju
            </label>

            <ColorPicker
              className="custom-color-picker"
              color={newLocation.locality_color}
              onChange={handleColorChange}
            />

            {errors.locality_color && (
              <div className="text-danger mt-1">{errors.locality_color}</div>
            )}
          </div>
        </form>
      </div>
    );
  }
);

export default AddLocationForm;
