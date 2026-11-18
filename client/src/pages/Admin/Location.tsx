import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routsEnum";
import "../../styles/Client.css";
import { useLocationContext } from "../../context/location.context";
import Card from "../../components/Shared/Card";
import ModalComponent from "../../components/Admin/Modals/ModalComponent";
import AddLocationForm from "../../components/Admin/Forms/AddLocationForm";

function Location() {
  const { 
    location, 
    addLocation, 
    setLocationInActive, 
    setLocationActive, 
    setSelectedLocationId, 
    refreshLocation // <-- Funkcija za osvježavanje liste
  } = useLocationContext();
  
  // Tip ref-a mora biti prilagođen za asinkroni submit
  const formRef = useRef<{ submit: () => Promise<void> } | null>(null);
  const navigate = useNavigate();

  // Handle the form submission for adding a new location 
  const handleSubmit = async (newLocation: { // <-- FUNKCIJA JE ASINKRONA
    locality_name: string;
    locality_color: string;
  }) => {
    
    // 1. Poziv funkcije za dodavanje (pretpostavljamo da je ova funkcija asinkrona)
    await addLocation({ 
      id: "", 
      locality_name: newLocation.locality_name,
      locality_color: newLocation.locality_color,
      is_deleted: false,
    });
    
    // 2. KLJUČNI KORAK: Osvježi listu iz konteksta (ponovno dohvaćanje podataka)
    await refreshLocation(); 
    
    console.log("Location added and list refreshed:", newLocation);
  };

  // Update location: set the selected location ID and navigate
  const updateLocation = (id: any) => {
    setSelectedLocationId(id); 
    navigate(`${RoutesEnum.UPDATE_LOCATION_URL}/${id}`);
  };

  // Set a location as inactive
  const handleInActivLocation = (id: any) => {
    setLocationInActive(id);
  };

  // Set a location as active
  const handleActivLocation = (id: any) => {
    setLocationActive(id);
  };

  return (
    <div className="main-container">
      <ModalComponent
        addButton="Novi Lokalitet"
        title="Novi Lokalitet"
        bodyContent={
          // Prosljeđujemo asinkronu funkciju
          <AddLocationForm ref={formRef as React.Ref<any>} submitForm={handleSubmit} /> 
        }
        primaryButtonText="Dodaj"
        secondaryButtonText="Zatvori"
        onPrimaryButtonClick={() => {
          // Pozivanje asinkrone submit funkcije forme
          formRef.current?.submit(); 
        }}
      />

      <div className="display">
        {location.map((loc) => (
          <Card
            key={loc.id}
            color={loc.locality_color}
            locality={loc.locality_name}
            editText="Uredi"
            deleteText="Isključi"
            undeleteText="Uključi"
            isDeleted={loc.is_deleted}
            update={() => updateLocation(loc.id)} 
            onInActive={() => handleInActivLocation(loc.id)}
            onActive={() => handleActivLocation(loc.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Location;