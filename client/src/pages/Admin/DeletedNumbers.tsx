import React, { useEffect, useRef, useState } from "react";
import "../../styles/Client.css";
import { useNumberContext } from "../../context/number.context";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routsEnum";
import ReturnNumberCard from "../../components/Shared/ReturnNumberCard";

function DeletedNumbers() {
  const {
    deletedNumber,
    setNumberReturned,
    getDeletedNumbers,
    refreshNumber,
    loading,
  } = useNumberContext();

  const navigate = useNavigate();

  useEffect(() => {
    getDeletedNumbers();
  }, []);

  const updateNumber = (id: string) => {
    console.log(`Navigating to update number with ID: ${id}`);
    navigate(`${RoutesEnum.UPDATE_DELETED_NUMBER_URL}/${id}`);
  };

  const handleReturnNumber = async (id: string) => {
    await setNumberReturned(id);
    await getDeletedNumbers();
  };

  return (
    <div className="main-container">
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <h3>Učitavanje...</h3>
        </div>
      ) : (
        <div className="display">
          {deletedNumber.length > 0 ? (
            deletedNumber.map((num) => (
              <ReturnNumberCard
                key={num.id}
                locality={num.locality_name}
                department={num.department_name}
                polinom={num.short_name}
                phone_name={num.phone_name}
                phone_number={num.phone_number}
                vip_number={num.vip_number}
                editText="Uredi"
                update={() => updateNumber(num.id)}
                returnText="Vrati"
                toReturn="Vrati"
                onReturn={() => handleReturnNumber(num.id)}
              />
            ))
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <h5>Nema obrisanih brojeva.</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default DeletedNumbers;
