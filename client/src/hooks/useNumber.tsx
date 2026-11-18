import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "../environment";
import { Numbers } from "../models/Numbers";

interface LocalityData {
  locality_name: string;
  locality_color: string;
  number_count: number;
}

export const useNumber = () => {
  const [number, setNumber] = useState<Numbers[]>([]);
  const [selectedNumberId, setSelectedNumberId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletedCounter, setDeletedCounter] = useState<number>(0);
  const [vipCounter, setVIPCounter] = useState<number>(0);
  const [localityCounter, setLocalityCounter] = useState<LocalityData[]>([]);
  const [deletedNumber, setDeletedNumber] = useState<Numbers[]>([]);


  useEffect(() => {
    refreshNumber();
    getDeletedNumbers();
    getCounterDeleted();
    getVIPNumbersCounter();
    getLocalityCounter();
  }, []);

  const axiosInstance = axios.create({
    baseURL: `${environment.backendServer}`,
  });

  const refreshNumber = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(environment.getNumber);
      setNumber(res.data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error refreshing numbers:", err);
    } finally {
      setLoading(false);
    }
  };

  //GET Deleted Numbers
  const getDeletedNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(environment.getDeletedNumbers);
      setDeletedNumber(res.data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error geting deleted numbers:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNumber = async (newNumber: {
    id_locality: string;
    id_headquarters: string;
    id_departments: string;
    phone_name: string;
    phone_number: number;
    vip_number?: string | null;
  }) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post(environment.addNumber, newNumber);
      await refreshNumber();
      console.log("Number added successfully.");
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding number:", err);
    } finally {
      setLoading(false);
    }
  };

  const editNumber = async (updatedNumber: Numbers) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        `${environment.setNumber}/${updatedNumber.id}`,
        updatedNumber
      );
      setNumber(
        number.map((num) => (num.id === updatedNumber.id ? res.data : num))
      ); // Update the state
      // After adding the location, refresh the list
      await refreshNumber();
      await getDeletedNumbers();
      console.log("Number updated successfully:", updatedNumber);
    } catch (err: any) {
      setError(err.message);
      console.error("Error updateing number:", err);
    } finally {
      setLoading(false);
    }
  };

  const setNumberInActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setNumberUnVisible}/${id}`
      );
      if (response.status === 200) {
        await refreshNumber();
      }
    } catch (error) {
      console.error("Error inactivating number:", error);
    }
  };

  const setNumberActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setNumberVisible}/${id}`
      );
      if (response.status === 200) {
        await refreshNumber();
      }
    } catch (error) {
      console.error("Error activating number:", error);
    }
  };

  //DELETE Number
  const setNumberDeleted = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setNumberDeleted}/${id}`
      );
      if (response.status === 200) {
        await refreshNumber();
      }
    } catch (error) {
      console.error("Error deleting number:", error);
    }
  };

  //RETURN NUmber
  const setNumberReturned = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setNumberReturned}/${id}`
      );
      if (response.status === 200) {
        await refreshNumber();
      }
    } catch (error) {
      console.error("Error returning number:", error);
    }
  };

  //Counters
  const getCounterDeleted = async () => {
    try {
      const res = await axiosInstance.get(environment.getDeletedCounter);
      setDeletedCounter(res.data?.deleted_numbers_count || 0);
    } catch (err) {
      console.error("Error fetching deleted numbers:", err);
    }
  };

  const getVIPNumbersCounter = async () => {
    try {
      const res = await axiosInstance.get(environment.getVIPCounter);
      setVIPCounter(res.data?.numbers_count || 0);
    } catch (err) {
      console.error("Error fetching VIP numbers:", err);
    }
  };

  const getLocalityCounter = async () => {
    try {
      const res = await axiosInstance.get(environment.getLocalityCounter);
      console.log("Stanje dobiveno od backenda:", res.data); // <-- Dodajte ovu liniju
      setLocalityCounter(res.data);
    } catch (err) {
      console.error("Error fetching Locality numbers:", err);
    }
  };

  return {
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
    deletedCounter,
    getCounterDeleted,
    vipCounter,
    getVIPNumbersCounter,
    localityCounter,
    getLocalityCounter,
    deletedNumber,
    getDeletedNumbers,    
    loading,
    error,
  };
};
