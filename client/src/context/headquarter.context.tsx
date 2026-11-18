import React, { createContext, useContext, ReactNode } from "react";
import { Headquarters } from "../models/Headquarters";
import { useHeadquarter } from "../hooks/useHeadquarter";

// Ažuriran type da uključi refresh funkciju
interface HeadquarterContextType {
  headquarter: Headquarters[];
  setHeadquarter: (headquarters: Headquarters[]) => void;
  addHeadquarter: (newHeadquarter: Headquarters) => void;
  editHeadquarter: (updatedHeadquarter: Headquarters) => void;
  setHeadquarterInActive: (id: string) => Promise<void>;
  setHeadquarterActive: (id: string) => Promise<void>;
  refreshHeadquarter: () => Promise<void>; // Dodano
  selectedHeadquarterId: string | null;
  setSelectedHeadquarterId: (id: string | null) => void;
}

const HeadquarterContext = createContext<HeadquarterContextType | undefined>(
  undefined
);

export const useHeadquarterContext = () => {
  const context = useContext(HeadquarterContext);
  if (!context) {
    throw new Error(
      "useHeadquarterContext must be used within a HeadquarterProvider"
    );
  }
  return context;
};

export const HeadquarterProvider = ({ children }: { children: ReactNode }) => {
  const {
    headquarter,
    setHeadquarter,
    addHeadquarter,
    editHeadquarter,
    selectedHeadquarterId,
    setSelectedHeadquarterId,
    setHeadquarterInActive,
    setHeadquarterActive,
    refreshHeadquarter, // Funkcija je preuzeta iz hooka
  } = useHeadquarter();

  return (
    <HeadquarterContext.Provider
      value={{
        headquarter,
        setHeadquarter,
        addHeadquarter,
        editHeadquarter,
        selectedHeadquarterId,
        setSelectedHeadquarterId,
        setHeadquarterInActive,
        setHeadquarterActive,
        refreshHeadquarter, // Dodano u value
      }}
    >
      {children}
    </HeadquarterContext.Provider>
  );
};