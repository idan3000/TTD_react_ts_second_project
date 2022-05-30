import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import "./pets.css";
import Cards from "../../component/cards/Cards";
import Filter from "../../component/filter/Filter";
import cat from "../../types&interface/cat_Interface";
import fav from "../../types&interface/favourite_enum";
import gen from "../../types&interface/gender_enum";

type PatsContextType = {
  cats: cat[];
  setCats: React.Dispatch<React.SetStateAction<cat[]>>;
};

export const PatsContext = createContext({
  cats: [],
  setCats: () => {},
} as PatsContextType);

const Pets = () => {
  const [cats, setCats] = useState<cat[]>([]);
  const [filters, setFilters] = useState({
    favourite: fav.any,
    gender: gen.any,
  });
  const [filteredCats, setFilteredCats] = useState<cat[]>([]);

  const fetchCats = async () =>
    (await axios.get(`http://localhost:4000/cats`)).data as cat[];

  useEffect(() => {
    fetchCats().then((catsData) => {
      setCats(() => catsData);
      setFilteredCats(() => catsData);
    });
  }, []);

  useEffect(() => {
    setFilteredCats(() =>
      cats.filter((cat) => {
        const okGender =
          filters.gender === gen.any || filters.gender === cat.gender;
        const okFav =
          filters.favourite === fav.any ||
          (cat.favoured && filters.favourite === fav.favourite) ||
          (!cat.favoured && filters.favourite === fav.notFavourite);
        return okGender && okFav;
      })
    );
  }, [filters, cats]);

  return (
    <div className="container">
      <div className="app-container">
        <PatsContext.Provider value={{ cats: filteredCats, setCats: setCats }}>
          <Filter data={filters} setData={setFilters} />
          <Cards />
        </PatsContext.Provider>
      </div>
    </div>
  );
};
export default Pets;
