import { useEffect, useState } from "react";
import { environment } from "../environment";
import { Location } from "../models/Location";
import axios from "axios";

export const useLocation = () => {
  const [location, setLocation] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance = axios.create({
    baseURL: `${environment.backendServer}`,
  });

  const refreshLocations = async () => {
    try {
      const res = await axiosInstance.get(environment.getLocation);
      setLocation(res.data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching locations:", err);
    }
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  const addLocation = async (newLocation: {
    locality_name: string;
    locality_color: string;
    is_deleted: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post(
        environment.addLocation,
        newLocation
      );
      const addedLocation = res.data;
      setLocation(prev => [...prev, addedLocation]);
      console.log("Location added successfully:", addedLocation);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding location:", err);
    } finally {
      setLoading(false);
    }
  };

  const editLocation = async (updatedLocation: Location) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        `${environment.setLocation}/${updatedLocation.id}`,
        updatedLocation
      );
      setLocation(
        location.map((loc) => (loc.id === updatedLocation.id ? res.data : loc))
      );
      console.log("Location updated successfully:", updatedLocation);
    } catch (err: any) {
      setError(err.message);
      console.error("Error updateing location:", err);
    } finally {
      setLoading(false);
    }
  };

  const setLocationInActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setLocationUnVisible}/${id}`
      );
      if (response.status === 200) {
        setLocation((prevLocations) =>
          prevLocations.map((loc) =>
            loc.id === id ? { ...loc, is_deleted: true } : loc
          )
        );
      } else {
        console.error("Failed to set location as inactive", response.data);
      }
    } catch (error) {
      console.error("Error inactivating location:", error);
    }
  };

  const setLocationActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setLocationVisible}/${id}`
      );
      if (response.status === 200) {
        setLocation((prevLocations) =>
          prevLocations.map((loc) =>
            loc.id === id ? { ...loc, is_deleted: false } : loc
          )
        );
      } else {
        console.error("Failed to activate location", response.data);
      }
    } catch (error) {
      console.error("Error activating location:", error);
    }
  };

  return {
    location,
    setLocation,
    addLocation,
    editLocation,
    selectedLocationId,
    setSelectedLocationId,
    setLocationInActive,
    setLocationActive,
    refreshLocations,
  };
};