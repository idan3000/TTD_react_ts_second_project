import React, { useContext } from "react";
import Card from "../oneCard/Card";
import "./cards.css";
import { PatsContext } from "../Pets/Pets";

const Cards = () => {
  const { cats } = useContext(PatsContext);

  return (
    <div className="pet-cards-container">
      {cats.map((cat) => (
        <Card key={String(cat.id)} {...cat} />
      ))}
    </div>
  );
};

export default Cards;
