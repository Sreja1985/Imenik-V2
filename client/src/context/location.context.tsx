import React, { createContext, useContext, useState, ReactNode } from "react";
import { Location } from "../models/Location";
import { useLocation } from "../hooks/useLocation";

// Ažuriran type da uključi refresh funkciju
interface LocationContextType {
  location: Location[];
  setLocation: (locations: Location[]) => void;
  addLocation: (newLocation: Location) => void;
  editLocation: (updatedLocation: Location) => void;
  setLocationInActive: (id: string) => Promise<void>;
  setLocationActive: (id: string) => Promise<void>;
  refreshLocation: () => Promise<void>; // Dodano
  selectedLocationId: string | null;
  setSelectedLocationId: (id: string | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const {
    location,
    setLocation,
    addLocation,
    editLocation,
    selectedLocationId,
    setSelectedLocationId,
    setLocationInActive,
    setLocationActive,
    refreshLocations, // Funkcija je preimenovana u refreshLocations
  } = useLocation();

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        addLocation,
        editLocation,
        selectedLocationId,
        setSelectedLocationId,
        setLocationInActive,
        setLocationActive,
        refreshLocation: refreshLocations, // Povezano s refreshLocations iz hooka
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};