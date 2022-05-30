import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import Card from "../Card";
import catMock from "./cat.json";
import { click } from "@testing-library/user-event/dist/click";
import { PatsContext } from "../../Pets/Pets";
import CatType from "../../../types&interface/cat_Interface";

describe(`Card`, () => {
  const setUp = (props: CatType) => {
    const Temp = () => {
      const [cast, setCats] = useState([props]);
      return (
        <div>
          <PatsContext.Provider
            value={{
              cats: cast,
              setCats: setCats,
            }}
          >
            <Card {...cast[0]} />
          </PatsContext.Provider>
        </div>
      );
    };
    render(<Temp />);
  };
  describe(`start test all default`, () => {
    beforeEach(() => setUp(catMock));

    test(`show name`, () => {
      screen.getByRole("heading", { name: catMock.name });
    });
    test(`show phone`, () => {
      screen.getByText(catMock.phone);
    });
    test(`show email`, () => {
      screen.getByText(catMock.email);
    });
    test(`hart click to toggle`, async () => {
      const btnFavored = screen.getByRole(`button`);
      click(btnFavored);
      screen.getByAltText(/filled hart/i);
      expect(screen.queryByAltText(/outLined hart/i)).not.toBeInTheDocument();
      click(btnFavored);
      expect(screen.queryByAltText(/filled hart/i)).not.toBeInTheDocument();
      screen.getByAltText(/outLined hart/i);
    });
    test(`show ing whit correct src`, () => {
      const catImg = screen.queryByAltText(
        catMock.image.alt
      ) as HTMLImageElement;
      expect(catImg).toBeInTheDocument();
      expect(catImg?.src).toBe(catMock.image.url);
    });
    test(`show outLined hart`, () => {
      screen.getByAltText(/outLined hart/i);
      expect(screen.queryByAltText(/filled hart/i)).not.toBeInTheDocument();
    });
  });
  test(`show filled hart`, () => {
    setUp({ ...catMock, favoured: true });
    screen.getByAltText(/filled hart/i);
    expect(screen.queryByAltText(/outLined hart/i)).not.toBeInTheDocument();
  });
});
