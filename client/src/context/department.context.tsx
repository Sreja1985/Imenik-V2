// context/department.context.ts
import React, { createContext, useContext, ReactNode } from "react";
import { Departments } from "../models/Departments";
import { useDepartment } from "../hooks/useDepartment";

// Define the shape of the Department context
interface DepartmentContextType {
  department: Departments[];
  setDepartment: (departments: Departments[]) => void;
  addDepartment: (newDepartment: Departments) => void;
  editDepartment: (updatedDepartment: Departments) => void;
  setDepartmentInActive: (id: string) => Promise<void>;
  setDepartmentActive: (id: string) => Promise<void>;
  selectedDepartmentId: string | null;
  setSelectedDepartmentId: (id: string | null) => void; // Function to update selected headquarter ID
  refreshDepartment: () => Promise<void>;
}

// Create the context with an initial value of `undefined`
const DepartmentContext = createContext<DepartmentContextType | undefined>(
  undefined
);

// Create a custom hook to use the Department context
export const useDepartmentContext = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error(
      "useDepartmentContext must be used within a DepartmentProvider"
    );
  }
  return context;
};

// Create the provider component
export const DepartmentProvider = ({ children }: { children: ReactNode }) => {
  const {
    department,
    setDepartment,
    addDepartment,
    editDepartment,
    setDepartmentInActive,
    setDepartmentActive,
    selectedDepartmentId,
    setSelectedDepartmentId,
    refreshDepartment,
  } = useDepartment();

  return (
    <DepartmentContext.Provider
      value={{
        department,
        setDepartment,
        addDepartment,
        editDepartment,
        setDepartmentInActive,
        setDepartmentActive,
        selectedDepartmentId,
        setSelectedDepartmentId,
        refreshDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};
