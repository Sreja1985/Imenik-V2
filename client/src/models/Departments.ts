export type Departments = {
  id: string;
  department_name: string;
  id_headquarters: string;
  id_locality: string;
  is_deleted: boolean;
  locality_name: string;
  polinom: string; // Dodajte ovu liniju
};

export const EmptyDepartment: Partial<Departments> = {
  id: "",
  department_name: "",
  id_headquarters: "",
  id_locality: "",
  is_deleted: false,
  locality_name: "",
  polinom: "", 
};