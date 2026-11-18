import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Client.css";
import { useDepartmentContext } from "../../context/department.context";
import { useLocationContext } from "../../context/location.context";
import { useHeadquarterContext } from "../../context/headquarter.context";
import ModalComponent from "../../components/Admin/Modals/ModalComponent";
import { RoutesEnum } from "../../routsEnum";

function PhoneNumbers() {
  return (
    <div className="main-container">
      <ModalComponent
        addButton="Novi Broj"
        title="Novi Broj"
       // bodyContent={<AddDepartmentForm ref={formRef} submitForm={handleSubmit} /> }
        primaryButtonText="Dodaj"
        secondaryButtonText="Zatvori"
        onPrimaryButtonClick={() => {
          // formRef.current?.submit();
        }}
      />
    </div>
  );
}

export default PhoneNumbers;