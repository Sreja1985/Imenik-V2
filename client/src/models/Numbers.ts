export type Numbers = {
  id: string;
  phone_name: string;
  phone_number: number;
  vip_number: string | null; 
  id_locality: string;
  id_headquarters: string;
  id_departments: string;
  is_deleted: boolean;
  to_delete: boolean;
  is_active: boolean;
  locality_name: string;
  department_name: string;
  short_name: string;
};

export const EmptyNumber: Partial<Numbers> = {
  id: "",
  phone_name: "",
  phone_number: 0,
  vip_number: null, 
  id_locality: "",
  id_headquarters: "",
  id_departments: "",
  is_deleted: false,
  to_delete: false,
  is_active: true,
  locality_name: "",
  department_name: "",
  short_name: "",
};