import React, { useEffect, useRef, useState } from "react";
import "../../styles/Client.css";
import { useNumberContext } from "../../context/number.context";
import { useLocationContext } from "../../context/location.context";
import { useHeadquarterContext } from "../../context/headquarter.context";
import { useDepartmentContext } from "../../context/department.context";
import ModalComponent from "../../components/Admin/Modals/ModalComponent";
import AddNumberForm from "../../components/Admin/Forms/AddNumberForm";
import SearchBar from "../../components/Shared/SearchBar";
import { useNavigate } from "react-router-dom";
import { Numbers } from "../../models/Numbers";
import NumberCard from "../../components/Shared/NumberCard";
import { RoutesEnum } from "../../routsEnum";

function SingleNumber() {
  const formRef = useRef<{ submit: () => void } | null>(null);
  const {
    number,
    addNumber,
    setNumberInActive,
    setNumberActive,
    setNumberDeleted,
    refreshNumber,
  } = useNumberContext();

  const { location, refreshLocation } = useLocationContext();
  const { headquarter, refreshHeadquarter } = useHeadquarterContext();
  const { department, refreshDepartment } = useDepartmentContext();

  const [filteredNumber, setFilteredNumber] = useState<Numbers[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedNumber, setSelectedNumber] = useState<Numbers | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (numberData: {
    id_locality: string;
    id_headquarters: string;
    id_departments: string;
    phone_name: string;
    phone_number: number;
    vip_number?: string | null;
  }) => {
    await addNumber(numberData);
    console.log("Broj uspješno dodan!");
  };

  const handleFilter = (term: string) => {
    setSearchTerm(term);
    setSelectedNumber(null);
  };

  const updateNumber = (id: string) => {
    console.log(`Navigating to update number with ID: ${id}`);
    navigate(`${RoutesEnum.UPDATE_NUMBER_URL}/${id}`);
  };

  const handleInActiveNumber = async (id: string) => {
    if (!selectedNumber) return;

    // Optimistic update
    setSelectedNumber({ ...selectedNumber, is_active: false });

    try {
      await setNumberInActive(id);
      await refreshNumber(); // Optional: sync with backend
    } catch (error) {
      console.error(error);
      // Rollback if failed
      setSelectedNumber({ ...selectedNumber, is_active: true });
    }
  };

  const handleActiveNumber = async (num: Numbers) => {
    if (num.is_deleted) return;

    const isRelatedEntityDeleted =
      location.some((loc) => loc.id === num.id_locality && loc.is_deleted) ||
      headquarter.some(
        (hq) => hq.id === num.id_headquarters && hq.is_deleted
      ) ||
      department.some((dep) => dep.id === num.id_departments && dep.is_deleted);

    if (isRelatedEntityDeleted) return;

    // Optimistic update
    setSelectedNumber({ ...num, is_active: true });

    try {
      await setNumberActive(num.id);
      await refreshNumber(); // Optional: sync with backend
    } catch (error) {
      console.error(error);
      // Rollback if failed
      setSelectedNumber({ ...num, is_active: false });
    }
  };

  const handleDeleteNumber = async (id: string) => {
    await setNumberDeleted(id);
    await refreshNumber();
    setSelectedNumber(null);
  };

  const handleSuggestionClick = async (phoneNumber: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/number/details/${phoneNumber}`
      );
      if (!response.ok) throw new Error("Broj nije pronađen.");
      const numberDetails = await response.json();
      setSelectedNumber(numberDetails);
      setSearchTerm(phoneNumber.toString());
    } catch (err) {
      console.error(err);
      setSelectedNumber(null);
    }
  };

  useEffect(() => {
    const fetchRelatedData = async () => {
      await refreshLocation();
      await refreshHeadquarter();
      await refreshDepartment();
    };
    fetchRelatedData();

    if (!searchTerm) {
      setFilteredNumber([]);
    } else {
      const filtered = number.filter((num) =>
        num.phone_number.toString().includes(searchTerm)
      );
      setFilteredNumber(filtered.slice(0, 5));
    }
  }, [number, searchTerm]);

  const isDisabled = selectedNumber
    ? location.some(
        (loc) => loc.id === selectedNumber.id_locality && loc.is_deleted
      ) ||
      headquarter.some(
        (hq) => hq.id === selectedNumber.id_headquarters && hq.is_deleted
      ) ||
      department.some(
        (dep) => dep.id === selectedNumber.id_departments && dep.is_deleted
      )
    : false;

  return (
    <div className="main-container">
      <ModalComponent
        addButton="Novi Broj"
        title="Novi Broj"
        bodyContent={<AddNumberForm ref={formRef} submitForm={handleSubmit} />}
        primaryButtonText="Dodaj"
        secondaryButtonText="Zatvori"
        onPrimaryButtonClick={() => formRef.current?.submit()}
      />
      <div className="display">
        <SearchBar
          placeholder="Broj..."
          type="text"
          onFilter={handleFilter}
          data={number}
        />
        {searchTerm && !selectedNumber && (
          <div className="suggestions-container">
            {filteredNumber.map((num) => (
              <div
                key={num.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(num.phone_number)}
              >
                {num.phone_number}
              </div>
            ))}
          </div>
        )}
        {selectedNumber && (
          <NumberCard
            key={selectedNumber.id}
            locality={selectedNumber.locality_name}
            department={selectedNumber.department_name}
            polinom={selectedNumber.short_name}
            phone_name={selectedNumber.phone_name}
            phone_number={selectedNumber.phone_number}
            vip_number={selectedNumber.vip_number}
            editText="Uredi"
            deleteText="Isključi"
            undeleteText="Uključi"
            toDeleteText="Izbriši"
            isDeleted={selectedNumber.is_deleted}
            isActive={selectedNumber.is_active}
            isDisabled={isDisabled}
            disabledReason="Povezani entitet je izbrisan"
            update={() => updateNumber(selectedNumber.id)}
            onInActive={() => handleInActiveNumber(selectedNumber.id)}
            onActive={() => handleActiveNumber(selectedNumber)}
            toDelete={() => handleDeleteNumber(selectedNumber.id)}
          />
        )}
      </div>
    </div>
  );
}

export default SingleNumber;
