import React from "react";
import "./filter.css";
import fav from "../../types&interface/favourite_enum";
import gen from "../../types&interface/gender_enum";

type Props = {
  data: { favourite: string; gender: string };
  setData: Function;
};

const Filter = (props: Props) => {
  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favourite">favourite</label>
        <select
          name="favourite"
          id="favourite"
          className="form-select"
          defaultValue={props.data.favourite}
          onChange={(event) => {
            props.setData((oldData: {}) => ({
              ...oldData,
              favourite: event.target.value,
            }));
          }}
        >
          <option value={fav.any}>any</option>
          <option value={fav.favourite}>favourite</option>
          <option value={fav.notFavourite}>not favourite</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">gender</label>
        <select
          name="gender"
          id="gender"
          className="form-select"
          defaultValue={props.data.gender}
          onChange={(event) => {
            props.setData((oldData: {}) => ({
              ...oldData,
              gender: event.target.value,
            }));
          }}
        >
          <option value={gen.any}>any</option>
          <option value={gen.male}>male</option>
          <option value={gen.female}>female</option>
        </select>
      </div>
    </div>
  );
};
export default Filter;
