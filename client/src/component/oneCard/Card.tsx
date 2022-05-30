import React, { useContext } from "react";
import "./card.css";
import cat from "../../types&interface/cat_Interface";
import heartFilled from "../../svg/heartFilled.svg";
import heartOutlined from "../../svg/heartOutlined.svg";
import { PatsContext } from "../Pets/Pets";

const Card = (props: cat) => {
  const { setCats } = useContext(PatsContext);
  const { name, phone, email, image, id, favoured } = props;

  const handleFavoured = () => {
    setCats((oldCats) => {
      const newCats = [...oldCats];
      const currentCatIndex = newCats.findIndex((cat) => cat.id === id);
      newCats[currentCatIndex].favoured = !favoured;
      return newCats;
    });
  };
  return (
    <article className="card">
      <div className="card-header">
        <button onClick={handleFavoured} className="heart">
          {favoured ? (
            <img src={heartFilled} alt="filled hart" />
          ) : (
            <img src={heartOutlined} alt="outLined hart" />
          )}
        </button>
        <img
          src={String(image.url)}
          alt={String(image.alt)}
          className="card-img"
        />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};
export default Card;
