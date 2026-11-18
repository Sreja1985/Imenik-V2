// hooks/useDepartment.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "../environment";
import { Departments } from "../models/Departments";

export const useDepartment = () => {
  const [department, setDepartment] = useState<Departments[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const axiosInstance = axios.create({ 
    baseURL: `${environment.backendServer}`,
  });

  // Fetch departments from backend
  const getDepartmentsFromBackend = async () => {
    try {
      const res = await axiosInstance.get(environment.getDepartment);
      console.log("Fetched departments:", res.data); // Debugging log
      setDepartment(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  // Use effect to call the fetch function when the component mounts
  useEffect(() => {
    getDepartmentsFromBackend();
  }, []);

  const refreshDepartment = async () => {
    try {
      const res = await axiosInstance.get(environment.getDepartment);
      setDepartment(res.data); // Update the department state with the fresh data from the backend
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching department:", err);
    }
  };

  //Add Department
  const addDepartment= async (newDepartment: {
    department_name: string;
    id_headquarters: string; 
    id_locality: string;
    is_deleted: boolean;
  }) => {
    setLoading(true); // Show loading indicator
    setError(null); // Reset errors if any

    try {
      const res = await axiosInstance.post(
        environment.addDepartment,
        newDepartment
      );
      const addedDepartment = res.data; // The backend should return the added location with its ID

      // After adding the location, refresh the list 
      await refreshDepartment();

      console.log("Department added successfully:", addedDepartment); // Debugging log
    } catch (err: any) {
      setError(err.message); // Handle errors
      console.error("Error adding department:", err);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

    // Update Department (PUT or PATCH)
    const editDepartment = async (updatedDepartment: Departments) => {
      try {
        setLoading(true);
        const res = await axiosInstance.put(
          `${environment.setDepartment}/${updatedDepartment.id}`,
          updatedDepartment
        );
        setDepartment(
          department.map((dep) => (dep.id === updatedDepartment.id ? res.data : dep))
        ); // Update the state
        // After adding the location, refresh the list
        await refreshDepartment();
        console.log("Department updated successfully:", updatedDepartment);
      } catch (err: any) {
        setError(err.message);
        console.error("Error updateing department:", err);
      } finally {
        setLoading(false);
      }
    };

  // Inactivate department
  const setDepartmentInActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setDepartmentUnVisible}/${id}`
      );
      if (response.status === 200) {
        await getDepartmentsFromBackend(); // Fetch departments again after update
      }
    } catch (error) {
      console.error("Error inactivating Department:", error);
    }
  };

  // Activate department
  const setDepartmentActive = async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `${environment.setDepartmentVisible}/${id}`
      );
      if (response.status === 200) {
        await getDepartmentsFromBackend(); // Fetch departments again after update
      }
    } catch (error) {
      console.error("Error activating Department:", error);
    }
  };

  return {
    department,
    setDepartment,
    addDepartment,
    editDepartment,
    selectedDepartmentId,
    setSelectedDepartmentId,
    setDepartmentInActive,
    setDepartmentActive,
    refreshDepartment,
  };
};
