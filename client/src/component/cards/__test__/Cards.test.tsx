import React from "react";
import { screen, render } from "@testing-library/react";
import Cards from "../Cards";
import cats from "../../cats.json";
import { PatsContext } from "../../Pets/Pets";

describe(`cards start default`, () => {
  test(`have all cars`, () => {
    render(
      <PatsContext.Provider
        value={{
          cats,
          setCats: () => {},
        }}
      >
        <Cards />
      </PatsContext.Provider>
    );

    expect(screen.queryAllByRole(`article`).length).toBe(5);
  });
});
