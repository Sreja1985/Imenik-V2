import { useEffect, useState } from "react";
import { environment } from "../environment";
import { Headquarters } from "../models/Headquarters";
import axios from "axios";

export const useHeadquarter = () => {
  const [headquarter, setHeadquarter] = useState<Headquarters[]>([]);
  const [selectedHeadquarterId, setSelectedHeadquarterId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance = axios.create({
    baseURL: `${environment.backendServer}`,
  });

  const refreshHeadquarter = async () => {
    try {
      const res = await axiosInstance.get(environment.getHeadquarter);
      setHeadquarter(res.data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching headquarters:", err);
    }
  };
  
  useEffect(() => {
    refreshHeadquarter();
  }, []);

  const addHeadquarter = async (newHeadquarter: { headquarters_name: string; short_name: string, headquarters_color: string; is_deleted: boolean }) => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await axiosInstance.post(environment.addHeadquarter, newHeadquarter);
      const addedHeadquarter = res.data;
      setHeadquarter(prev => [...prev, addedHeadquarter]);
      console.log("Headquarter added successfully:", addedHeadquarter);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding headqueter:", err);
    } finally {
      setLoading(false);
    }
  };

  const editHeadquarter = async (updatedHeadquarter: Headquarters) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        `${environment.setHeadquarter}/${updatedHeadquarter.id}`,
        updatedHeadquarter
      );
      // Ručno ažuriranje stanja
      setHeadquarter(
        headquarter.map((head) => (head.id === updatedHeadquarter.id ? res.data : head))
      );
      console.log("Headquarter updated successfully:", updatedHeadquarter);
    } catch (err: any) {
      setError(err.message);
      console.error("Error updateing headquarter:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const setHeadquarterInActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setHeadquarterUnVisible}/${id}`
      );
      if (response.status === 200) {
        // Ručno ažuriranje stanja, promijeni is_deleted na true
        setHeadquarter((prevHeadquarter) =>
          prevHeadquarter.map((head) =>
            head.id === id ? { ...head, is_deleted: true } : head
          )
        );
      } else {
        console.error("Failed to set Headquarter as inactive", response.data);
      }
    } catch (error) {
      console.error("Error inactivating Headquarter:", error);
    }
  };

  const setHeadquarterActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setHeadquarterVisible}/${id}`
      );
      if (response.status === 200) {
        // Ručno ažuriranje stanja, promijeni is_deleted na false
        setHeadquarter((prevHeadquarter) =>
          prevHeadquarter.map((head) =>
            head.id === id ? { ...head, is_deleted: false } : head
          )
        );
      } else {
        console.error("Failed to activate Headquarter", response.data);
      }
    } catch (error) {
      console.error("Error activating Headquarter:", error);
    }
  };

  return {
    headquarter,
    setHeadquarter,
    addHeadquarter,
    editHeadquarter,
    selectedHeadquarterId,
    setSelectedHeadquarterId,
    setHeadquarterInActive,
    setHeadquarterActive,
    refreshHeadquarter
  };
};