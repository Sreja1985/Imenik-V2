import React from "react";
import { Link } from "react-router-dom"; 
import "../../styles/Card.css";

interface DashbordCardProps {
  color?: string;
  title?: string;
  counter?: string;
  icon?: React.ReactNode;
  linkTo?: string; // <-- linkTo je sada opcionalan
}

const DashbordCard: React.FC<DashbordCardProps> = ({
  color,
  title,
  counter,
  icon,
  linkTo,
}) => {
  // Komponenta za karticu, bez obzira je li link ili ne
  const CardContent = (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-inner">
        <h3>{title}</h3>
        {icon}
      </div>
      <h1>{counter}</h1>
    </div>
  );

  // Provjeri postoji li linkTo prop
  if (linkTo) {
    // Ako postoji, omotaj karticu s <Link> komponentom
    return (
      <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        {CardContent}
      </Link>
    );
  }

  // Ako ne postoji, renderiraj samo div
  return CardContent;
};

export default DashbordCard;