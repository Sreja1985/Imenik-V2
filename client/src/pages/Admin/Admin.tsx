import { useState } from "react";
import "../../styles/Admin.css";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import Location from "./Location";
import Dashbord from "./Dashbord";
import Headquarter from "./Headquarter";
import Department from "./Department";
import { Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../../routsEnum";
import UpdateLocation from "./UpdateLocation";
import UpdateHeadquarter from "./UpdateHeadquarter";
import UpdateDepartment from "./UpdateDepartment";
import SingleNumber from "./SingleNumber";
import PhoneNumbers from "./PhoneNumbers";
import UpdateNumber from "./UpdateNumber";
import DeletedNumbers from "./DeletedNumbers";
import UpdateDeletedNumber from "./UpdateDeletedNumber";



function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <Routes>
        <Route path={RoutesEnum.DASHBORD_URL} element={<Dashbord />} />
        <Route path={RoutesEnum.NUMBER_URL} element={<SingleNumber />} />
        <Route path={RoutesEnum.PHONEBOOK_URL} element={<PhoneNumbers />} />
        <Route path={RoutesEnum.DEPARTMENT_URL} element={<Department />} />
        <Route path={RoutesEnum.HEADQUOTERS_URL} element={<Headquarter />} />
        <Route path={RoutesEnum.LOCATION_URL} element={<Location />} />
        <Route path={`${RoutesEnum.UPDATE_LOCATION_URL}/:id`} element={<UpdateLocation/>} />
        <Route path={`${RoutesEnum.UPDATE_HEADQUOTERS_URL}/:id`} element={<UpdateHeadquarter/>} />
        <Route path={`${RoutesEnum.UPDATE_DEPARTMENT_URL}/:id`} element={<UpdateDepartment/>} />
        <Route path={`${RoutesEnum.UPDATE_NUMBER_URL}/:id`} element={<UpdateNumber/>}/>        
        <Route path={RoutesEnum.DELETED_NUMBERS_URL} element={<DeletedNumbers/>}/>
        <Route path={`${RoutesEnum.UPDATE_DELETED_NUMBER_URL}/:id`} element={<UpdateDeletedNumber/>}/>
       
      </Routes>
    </div>
  );
}
export default Admin;
