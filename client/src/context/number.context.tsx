import React, { createContext, useContext, ReactNode } from "react";
import { Numbers } from "../models/Numbers";
import { useNumber } from "../hooks/useNumber";

interface NumberContextType {
  number: Numbers[];
  addNumber: (newNumber: {
    id_locality: string;
    id_headquarters: string;
    id_departments: string;
    phone_name: string;
    phone_number: number;
    vip_number?: string | null;
  }) => void;
  editNumber: (updatedNumber: Numbers) => void;
  setNumberInActive: (id: string) => Promise<void>;
  setNumberActive: (id: string) => Promise<void>;
  setNumberDeleted: (id: string) => Promise<void>;
  setNumberReturned: (id: string) => Promise<void>;
  selectedNumberId: string | null;
  setSelectedNumberId: (id: string | null) => void;
  refreshNumber: () => Promise<void>;
  deletedNumber: Numbers[];
  getDeletedNumbers: () => Promise<void>;  
  loading: boolean;
  error: string | null;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

export const useNumberContext = () => {
  const context = useContext(NumberContext);
  if (!context) {
    throw new Error("useNumberProvider must be used within a NumberProvider");
  }
  return context;
};

export const NumberProvider = ({ children }: { children: ReactNode }) => {
  const {
    number,
    addNumber,
    editNumber,
    selectedNumberId,
    setSelectedNumberId,
    setNumberInActive,
    setNumberActive,
    setNumberDeleted,
    setNumberReturned,
    refreshNumber,
    deletedNumber,
    getDeletedNumbers,    
    loading,
    error,
  } = useNumber();

  return (
    <NumberContext.Provider
      value={{
        number,
        addNumber,
        editNumber,
        selectedNumberId,
        setSelectedNumberId,
        setNumberInActive,
        setNumberActive,
        setNumberDeleted,
        setNumberReturned,
        refreshNumber,
        deletedNumber,
        getDeletedNumbers,        
        loading,
        error,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
};
