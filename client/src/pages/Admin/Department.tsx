import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Client.css";
import { useDepartmentContext } from "../../context/department.context";
import { useLocationContext } from "../../context/location.context";
import { useHeadquarterContext } from "../../context/headquarter.context";
import DepartmentCard from "../../components/Shared/DepartmentCard";
import ModalComponent from "../../components/Admin/Modals/ModalComponent";
import SearchBar from "../../components/Shared/SearchBar";
import { RoutesEnum } from "../../routsEnum";
import AddDepartmentForm from "../../components/Admin/Forms/AddDepartmentForm";

function Department() {
  const {
    department,
    addDepartment,
    setDepartmentInActive,
    setDepartmentActive,
    setSelectedDepartmentId,
    refreshDepartment,
  } = useDepartmentContext();

  const { location, refreshLocation } = useLocationContext(); // Dodano: refreshLocation
  const { headquarter, refreshHeadquarter } = useHeadquarterContext(); // Dodano: refreshHeadquarter

  const [filteredDepartment, setFilteredDepartment] = useState(department);
  const formRef = useRef<{ submit: () => void } | null>(null);
  const navigate = useNavigate();

  const updateDepartment = (id: string) => {
    setSelectedDepartmentId(id);
    navigate(`${RoutesEnum.UPDATE_DEPARTMENT_URL}/${id}`);
  };

  const handleSubmit = async (newDepartment: {
    department_name: string;
    id_headquarters: string;
    id_locality: string;
  }) => {
    await addDepartment({
      id: "",
      department_name: newDepartment.department_name,
      id_headquarters: newDepartment.id_headquarters,
      id_locality: newDepartment.id_locality,
      is_deleted: false,
      locality_name: "",
      polinom: "",
    });
    console.log("Department added:", newDepartment);
    await refreshDepartment();
  };

  const handleInActiveDepartment = async (id: any) => {
    console.log(`Attempting to deactivate department with ID: ${id}`);
    await setDepartmentInActive(id);
    await refreshDepartment();
  };

  const handleActiveDepartment = async (id: any, dep: any) => {
    const isRelatedEntityDeleted =
      location.some((loc) => loc.id === dep.id_locality && loc.is_deleted) ||
      headquarter.some((hq) => hq.id === dep.id_headquarters && hq.is_deleted);

    if (isRelatedEntityDeleted) {
      console.log("Cannot activate department due to deleted related entity");
      return;
    }

    console.log(`Attempting to activate department with ID: ${id}`);
    await setDepartmentActive(id);
    await refreshDepartment();
  };

  const handleFilter = (searchTerm: string) => {
    const filtered = department.filter((dep) =>
      dep.department_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartment(filtered);
  };

  useEffect(() => {
    setFilteredDepartment(department);
  }, [department]);

  useEffect(() => {
    const fetchInitialData = async () => {
      await refreshDepartment(); // DODANO: Ažuriraj i podatke o lokacijama i sjedištima
      await refreshLocation();
      await refreshHeadquarter();
    };
    fetchInitialData();

    const interval = setInterval(() => {
      refreshDepartment();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <ModalComponent
        addButton="Novi Odjel"
        title="Novi Odjel"
        bodyContent={
          <AddDepartmentForm ref={formRef} submitForm={handleSubmit} />
        }
        primaryButtonText="Dodaj"
        secondaryButtonText="Zatvori"
        onPrimaryButtonClick={() => {
          formRef.current?.submit();
        }}
      />

      <div className="display">
        <SearchBar
          placeholder="Odjeli..."
          type="text"
          data={department}
          onFilter={handleFilter}
        />
        <br />
        {filteredDepartment.map((dep) => {
          const isLocalityDeleted = location.some(
            (loc) => loc.id === dep.id_locality && loc.is_deleted
          );
          const isHeadquarterDeleted = headquarter.some(
            (hq) => hq.id === dep.id_headquarters && hq.is_deleted
          );
          const isDisabled = isLocalityDeleted || isHeadquarterDeleted;

          return (
            <DepartmentCard
              key={dep.id}
              department={dep.department_name}
              locality={dep.locality_name}
              polinom={dep.polinom}
              editText="Uredi"
              deleteText="Isključi"
              undeleteText="Uključi"
              isDeleted={dep.is_deleted}
              isDisabled={isDisabled}
              update={() => updateDepartment(dep.id)}
              onInActive={() => handleInActiveDepartment(dep.id)}
              onActive={() => handleActiveDepartment(dep.id, dep)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Department;
