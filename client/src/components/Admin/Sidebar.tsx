import { useState } from "react";
import { RoutesEnum } from "../../routsEnum";
import {
  BsCart3,
  BsXCircleFill,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsGridFill,
  BsFillTelephoneFill,
  BsJournalBookmarkFill,
  BsGeoAltFill,
} from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

function Sidebar({ openSidebarToggle, OpenSidebar }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the active route based on the current pathname
  const getActiveClass = (path: string) =>
    location.pathname === path ? "active" : "";

  // Function to handle navigation and setting active state
  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the desired route
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <BsXCircleFill />
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className={`sidebar-list-item ${getActiveClass(
            RoutesEnum.DASHBORD_URL
          )}`}
          onClick={() => handleNavigation(RoutesEnum.DASHBORD_URL)}
        >
          <Link to={RoutesEnum.DASHBORD_URL}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${getActiveClass(RoutesEnum.NUMBER_URL)}`}
          onClick={() => handleNavigation(RoutesEnum.NUMBER_URL)}
        >
          <Link to={RoutesEnum.NUMBER_URL}>
            <BsFillTelephoneFill className="icon" /> Broj
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${getActiveClass(RoutesEnum.PHONEBOOK_URL)}`}
          onClick={() => handleNavigation(RoutesEnum.PHONEBOOK_URL)}
        >
          <Link to={RoutesEnum.PHONEBOOK_URL}>
            <BsJournalBookmarkFill className="icon" /> Imenik
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${getActiveClass(RoutesEnum.DEPARTMENT_URL)}`}
          onClick={() => handleNavigation(RoutesEnum.DEPARTMENT_URL)}
        >
          <Link to={RoutesEnum.DEPARTMENT_URL}>
            <BsFillGrid3X3GapFill className="icon" /> Odjeli
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${getActiveClass(RoutesEnum.HEADQUOTERS_URL)}`}
          onClick={() => handleNavigation(RoutesEnum.HEADQUOTERS_URL)}
        >
          <Link to={RoutesEnum.HEADQUOTERS_URL}>
            <BsGridFill className="icon" /> KZOS
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${getActiveClass(RoutesEnum.LOCATION_URL)}`}
          onClick={() => handleNavigation(RoutesEnum.LOCATION_URL)}
        >
          <Link to={RoutesEnum.LOCATION_URL}>
            <BsGeoAltFill className="icon" /> Lokaliteti
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${getActiveClass(RoutesEnum.USERS_URL)}`}
          onClick={() => handleNavigation(RoutesEnum.USERS_URL)}
        >
          <Link to={RoutesEnum.USERS_URL}>
            <BsPeopleFill className="icon" /> Korisnici
          </Link>
        </li>
        <li className={`sidebar-list-item ${getActiveClass("/logout")}`}>
          <Link to="/logout">
            <FaPowerOff className="icon" /> Odjava
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
