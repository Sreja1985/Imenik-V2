import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Client.css";
import { useHeadquarterContext } from "../../context/headquarter.context";
import Card from "../../components/Shared/Card";
import ModalComponent from "../../components/Admin/Modals/ModalComponent";
import SearchBar from "../../components/Shared/SearchBar";
import AddHeadquarterForm from "../../components/Admin/Forms/AddHeadquarterForm";
import { RoutesEnum } from "../../routsEnum";

function Headquarter() {
  const {
    headquarter,
    addHeadquarter,
    setHeadquarterInActive,
    setHeadquarterActive,
    setSelectedHeadquarterId,
    refreshHeadquarter,
  } = useHeadquarterContext();
  const [searchTerm, setSearchTerm] = useState("");

  const formRef = useRef<{ submit: () => Promise<void> } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (newHeadquarter: any) => {
    await addHeadquarter({
      id: "",
      headquarters_name: newHeadquarter.headquarters_name,
      short_name: newHeadquarter.short_name,
      headquarters_color: newHeadquarter.headquarters_color,
      is_deleted: false,
    });
    await refreshHeadquarter();
    console.log("Headquarter added and list refreshed:", newHeadquarter);
  };

  const updateHeadquarter = (id: any) => {
    setSelectedHeadquarterId(id);
    navigate(`${RoutesEnum.UPDATE_HEADQUOTERS_URL}/${id}`);
  };

  const handleFilter = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleInActiveHeadquarter = (id: any) => {
    setHeadquarterInActive(id);
  };

  const handleActiveHeadquarter = (id: any) => {
    setHeadquarterActive(id);
  }; // 🌟 ISPRAVLJENA LOGIKA FILTRIRANJA 🌟 // Koristimo ?? '' da osiguramo da je vrijednost string prije poziva .toLowerCase()

  const filteredHeadquarters = headquarter.filter((head) => {
    // Osiguravamo da head.headquarters_name nije null ili undefined
    const name = head.headquarters_name ?? "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="main-container">
      <ModalComponent
        addButton="Novi KZOS"
        title="Novi KZOS"
        bodyContent={
          <AddHeadquarterForm
            ref={formRef as React.Ref<any>}
            submitForm={handleSubmit}
          />
        }
        primaryButtonText="Dodaj"
        secondaryButtonText="Zatvori"
        onPrimaryButtonClick={() => {
          formRef.current?.submit();
        }}
      />

      <div className="display">
        <SearchBar
          placeholder="KZOS..."
          type="text"
          data={headquarter}
          onFilter={handleFilter}
        />
        <br />
        {filteredHeadquarters.map((head) => (
          <Card
            key={head.id} // Dodatna zaštita u Card komponenti (nije obavezna, ali dobra praksa)
            color={head.headquarters_color ?? "#FFFFFF"}
            headquarters={head.headquarters_name ?? "N/A"}
            polinom={head.short_name ?? "N/A"}
            editText="Uredi"
            deleteText="Isključi"
            undeleteText="Uključi"
            isDeleted={head.is_deleted}
            update={() => updateHeadquarter(head.id)}
            onInActive={() => handleInActiveHeadquarter(head.id)}
            onActive={() => handleActiveHeadquarter(head.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Headquarter;
