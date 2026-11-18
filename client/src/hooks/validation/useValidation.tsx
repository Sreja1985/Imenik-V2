import * as yup from "yup";

const useValidation = () => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

  const validationLocation = yup
    .object({
      locality_name: yup
        .string()
        .required("Lokacija je obavezno polje!")
        .max(100, "Maksimalno 100 znakova!"),

      locality_color: yup
        .string()
        .required("Boja je obavezno polje za lokaciju!")
        .matches(hexColorRegex, "Neispravan format HEX koda boje."),
    })
    .required();

  const validationHeadquater = yup
    .object({
      headquarters_name: yup
        .string()
        .required("Obavezno polje!")
        .max(150, "Maksimalno 150 znakova!"),

      short_name: yup
        .string()
        .required("Obavezno polje!")
        .max(3, "Maksimalno 3 znaka!"),

      headquarters_color: yup
        .string()
        .required("Boja je obavezno polje za lokaciju!")
        .matches(hexColorRegex, "Neispravan format HEX koda boje."),
    })
    .required();

  const validationDepartment = yup
    .object({
      id_locality: yup.string().required("Obavezan odabir!"),

      id_headquarters: yup.string().required("Obavezan odabir!"),

      department_name: yup
        .string()
        .required("Obavezno polje!")
        .max(100, "Maksimalno 100 znakova!"),
    })
    .required();

const validationNumber = yup.object({
  id_locality: yup.string().required("Obavezan odabir!"),
  id_headquarters: yup.string().required("Obavezan odabir!"),
  id_departments: yup.string().required("Obavezan odabir!"),
  phone_name: yup
    .string()
    .required("Obavezno polje!")
    .max(100, "Maksimalno 100 znakova!"),

 
  phone_number: yup
    .string()
    
    .required("Obavezno polje!")
    .matches(
      /^\d{5,6}$/, // RegExp za točno 5 ili 6 znamenki (npr. '12345' ili '123456')
      "Broj mora imati točno 5 ili 6 znamenki (samo brojevi)."
    ),

  
  vip_number: yup
    .string()
    .nullable() // Dozvoljavamo null (ako je prazan string, pretvara se u null u rukovateljima)
    .notRequired() // Nije obavezno
    .test(
      "vip-number-length",
      "VIP broj mora imati točno 10 znamenki.",
      (value) => {
        // Ako je null, undefined, ili prazan string, prolazi (neobavezno je)
        if (!value) return true;        
        // Ako je unesen, provjeri je li točno 10 znamenki
        const digits = String(value).replace(/[^0-9]/g, '');
        return digits.length === 10;
      }
    )
    .test(
        "vip-number-only-digits",
        "VIP broj mora sadržavati samo znamenke.",
        (value) => {
            if (!value) return true; // Ako je prazno, prolazi
            return /^\d*$/.test(value); // Provjeri da li su samo brojevi ako je unesena vrijednost
        }
    ),
})
.required();


  return {
    validationLocation,
    validationHeadquater,
    validationDepartment,
    validationNumber,
  };
};

export default useValidation;
