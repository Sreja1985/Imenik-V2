import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../../routsEnum";
import Navbar from "../../components/Client/Navbar";
import Footer from "../../components/Client/Footer";
import Login from "./Login";
import SearchByNumber from "./SearchByNumber";
import SearchByName from "./SearchByName";


function Client() {
  return (
    <>
      <Navbar />;
      <Routes>
        <Route path={RoutesEnum.LOGIN_URL} element={<Login />} />
        <Route path={RoutesEnum.ROOT} element={<SearchByNumber />} />
        <Route path={RoutesEnum.SEARCH_DEPARTMENT_URL} element={<SearchByName />} />
      </Routes>
      <Footer />
    </>
  );
}
export default Client;
