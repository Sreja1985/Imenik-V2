import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import Select from "react-select";
import * as yup from "yup"; // Uvoz yup-a
import { Numbers } from "../../../models/Numbers";
import { useLocationContext } from "../../../context/location.context";
import { useHeadquarterContext } from "../../../context/headquarter.context";
import { useDepartmentContext } from "../../../context/department.context";
import useValidation from "../../../hooks/validation/useValidation"; // Uvoz useValidation

// Tipovi
interface SelectOption {
  value: string;
  label: string;
}

interface AddNumberFormProps {
  submitForm: (numberData: {
    id_locality: string;
    id_headquarters: string;
    id_departments: string;
    phone_name: string;
    phone_number: number;
    vip_number?: string | null;
  }) => Promise<void>; // Submit je asinkron
}

const AddNumberForm = forwardRef<unknown, AddNumberFormProps>(
  ({ submitForm }, ref) => {
    const { validationNumber } = useValidation(); // Inicijalizacija validacije
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Stanje za greške

    // 💡 NAPOMENA: Za yup.number() s max(6), vip_number mora biti string ili null (za yup.number() i string, bit će string).
    // Vip_number je u stanju string, ali yup.number() traži broj. VIP ću tretirati kao string za unos.
    const [newNumber, setNewNumber] = useState<Partial<Numbers>>({
      id_locality: "",
      id_headquarters: "",
      id_departments: "",
      phone_name: "",
      phone_number: 0,
      vip_number: null,
    });

    const { location } = useLocationContext();
    const { headquarter } = useHeadquarterContext();
    const { department } = useDepartmentContext();

    // Filtriranje odjela (nepromijenjeno)
    const filteredDepartments = department.filter((dep) => {
      return (
        dep.id_locality === newNumber.id_locality &&
        dep.id_headquarters === newNumber.id_headquarters
      );
    });

    // Opcije za Select komponente (nepromijenjeno)
    const locationOptions: SelectOption[] = location.map((loc) => ({
      value: loc.id,
      label: loc.locality_name,
    }));
    const headquartersOptions: SelectOption[] = headquarter.map((hq) => ({
      value: hq.id,
      label: hq.headquarters_name,
    }));
    const departmentOptions: SelectOption[] = filteredDepartments.map((dep) => ({
      value: dep.id,
      label: dep.department_name,
    }));

    // Resetiranje odjela (nepromijenjeno)
    useEffect(() => {
      setNewNumber((prevState) => ({
        ...prevState,
        id_departments: "",
      }));
    }, [newNumber.id_locality, newNumber.id_headquarters]);

    // --- FUNKCIJE ZA RUKOVANJE PROMJENAMA I BRISANJEM GREŠAKA ---

    const clearError = (fieldName: string) => {
      if (errors[fieldName]) {
        setErrors((prev) => {
          const { [fieldName]: removedError, ...rest } = prev;
          return rest;
        });
      }
    };

    const handleSelectChange = (
      selectedOption: SelectOption | null,
      fieldName: "id_locality" | "id_headquarters" | "id_departments"
    ) => {
      const value = selectedOption ? selectedOption.value : "";

      setNewNumber((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));

      clearError(fieldName);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setNewNumber((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      clearError(name);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numericValue = Number(value);

      setNewNumber((prevState) => ({
        ...prevState,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      }));

      clearError(name);
    };

    const handleVipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;

      setNewNumber((prevState) => ({
        ...prevState,
        // Postavljamo null ako je prazan string, inače vrijednost
        [name]: value === "" ? null : value,
      }));

      clearError(name);
    };

    
    const handleSubmit = async () => {      
      const dataToValidate = {
        id_locality: newNumber.id_locality,
        id_headquarters: newNumber.id_headquarters,
        id_departments: newNumber.id_departments,
        phone_name: newNumber.phone_name,
        // Vip number mora biti string za Yup validaciju, ali neobavezan
        vip_number: newNumber.vip_number || "",        
        //phone_number: newNumber.phone_number,
        phone_number: String(newNumber.phone_number),
      };

      try {
        await validationNumber.validate(dataToValidate, {
          abortEarly: false,
        });

        // 2. VALIDACIJA USPJEŠNA
        setErrors({});

        // Submit formi
        await submitForm(
          newNumber as {
            id_locality: string;
            id_headquarters: string;
            id_departments: string;
            phone_name: string;
            phone_number: number;
            vip_number?: string | null;
          }
        );

        // Resetiranje forme
        setNewNumber({
          id_locality: "",
          id_headquarters: "",
          id_departments: "",
          phone_name: "",
          phone_number: 0,
          vip_number: null,
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
          console.error("Validacija broja nije uspjela:", newErrors);
        } else {
            console.error("Nepoznata greška prilikom validacije:", error);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="container mt-2">
        <form id="addNumber" onSubmit={(e) => e.preventDefault()}>
          {/* Lokacija (id_locality) */}
          <div className="mb-3">
            <label htmlFor="id_locality" className="form-label">
              Lokacija
            </label>
            <Select
              options={locationOptions}
              className={errors.id_locality ? "is-invalid-select" : ""}
              value={
                newNumber.id_locality
                  ? locationOptions.find(
                      (option) => option.value === newNumber.id_locality
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "id_locality");
              }}
              placeholder="Odaberi"
            />
            {errors.id_locality && (
              <div className="invalid-feedback d-block">
                {errors.id_locality}
              </div>
            )}
          </div>

          {/* KZOS (id_headquarters) */}
          <div className="mb-3">
            <label htmlFor="id_headquarters" className="form-label">
              KZOS
            </label>
            <Select
              options={headquartersOptions}
              className={errors.id_headquarters ? "is-invalid-select" : ""}
              value={
                newNumber.id_headquarters
                  ? headquartersOptions.find(
                      (option) => option.value === newNumber.id_headquarters
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "id_headquarters");
              }}
              placeholder="Odaberi"
            />
            {errors.id_headquarters && (
              <div className="invalid-feedback d-block">
                {errors.id_headquarters}
              </div>
            )}
          </div>

          {/* Organizaciona jedinica (id_departments) */}
          <div className="mb-3">
            <label htmlFor="id_departments" className="form-label">
              Organizaciona jedinica
            </label>
            <Select
              options={departmentOptions}
              className={errors.id_departments ? "is-invalid-select" : ""}
              isDisabled={
                !newNumber.id_locality ||
                !newNumber.id_headquarters ||
                departmentOptions.length === 0
              }
              value={
                newNumber.id_departments
                  ? departmentOptions.find(
                      (option) => option.value === newNumber.id_departments
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "id_departments");
              }}
              placeholder="Odaberi"
            />
            {errors.id_departments && (
              <div className="invalid-feedback d-block">
                {errors.id_departments}
              </div>
            )}
          </div>

          {/* Ime broja (phone_name) */}
          <div className="mb-3">
            <label htmlFor="phone_name" className="form-label">
              Ime broja
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.phone_name ? "is-invalid" : ""
              }`}
              name="phone_name"
              id="phone_name"
              placeholder="Unesite ime"
              value={newNumber.phone_name || ""}
              onChange={handleTextChange}
            />
            {errors.phone_name && (
              <div className="invalid-feedback d-block">
                {errors.phone_name}
              </div>
            )}
          </div>

          {/* Telefonski broj (phone_number) */}
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Telefonski broj
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.phone_number ? "is-invalid" : ""
              }`}
              name="phone_number"
              id="phone_number"
              placeholder="Unesite broj"
              value={newNumber.phone_number === 0 ? "" : newNumber.phone_number} // Prazan string umjesto 0
              onChange={handleNumberChange}
            />
            {errors.phone_number && (
              <div className="invalid-feedback d-block">
                {errors.phone_number}
              </div>
            )}
          </div>

          {/* VIP broj (vip_number) */}
          <div className="mb-3">
            <label htmlFor="vip_number" className="form-label">
              VIP broj
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.vip_number ? "is-invalid" : ""
              }`}
              name="vip_number"
              id="vip_number"
              placeholder="Unesite VIP broj"
              value={newNumber.vip_number ?? ""} // Koristimo ?? "" za prikaz
              onChange={handleVipChange}
            />
            {errors.vip_number && (
              <div className="invalid-feedback d-block">
                {errors.vip_number}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
);

export default AddNumberForm;