import React from "react";
import { render, screen } from "@testing-library/react";
import Filter from "../Filter";
import { selectOptions } from "@testing-library/user-event/dist/select-options";
import fav from "../../../types&interface/favourite_enum";
import gen from "../../../types&interface/gender_enum";

describe(`filter`, () => {
  describe(`start default`, () => {
    const props = { favourite: fav.any, gender: gen.any };
    const setProps = () => {};
    beforeEach(() => render(<Filter data={props} setData={setProps} />));
    test(`able to change value of favourite`, () => {
      const select = screen.getByLabelText(/favourite/i) as HTMLSelectElement;
      expect(select.value).toBe(String(fav.any));
      selectOptions(select, String(fav.favourite));
      expect(select.value).toBe(String(fav.favourite));
      selectOptions(select, String(fav.notFavourite));
      expect(select.value).toBe(String(fav.notFavourite));
    });
    test(`able to change value of gender`, () => {
      const select = screen.getByLabelText(/gender/i) as HTMLSelectElement;
      expect(select.value).toBe(String(gen.any));
      selectOptions(select, String(gen.male));
      expect(select.value).toBe(String(gen.male));
      selectOptions(select, String(gen.female));
      expect(select.value).toBe(String(gen.female));
    });
  });
  describe(`get props`, () => {
    describe(`fav`, () => {
      test(`favourite`, () => {
        const props = { favourite: fav.favourite, gender: gen.any };
        const setProps = () => {};
        render(<Filter data={props} setData={setProps} />);
        const select = screen.getByLabelText(/favourite/i) as HTMLSelectElement;
        expect(select.value).toBe(String(fav.favourite));
      });
      test(`not favourite`, () => {
        const props = { favourite: fav.notFavourite, gender: gen.any };
        const setProps = () => {};
        render(<Filter data={props} setData={setProps} />);
        const select = screen.getByLabelText(/favourite/i) as HTMLSelectElement;
        expect(select.value).toBe(String(fav.notFavourite));
      });

      describe(`gen`, () => {
        test(`male`, () => {
          const props = { favourite: fav.any, gender: gen.male };
          const setProps = () => {};
          render(<Filter data={props} setData={setProps} />);
          const select = screen.getByLabelText(/gender/i) as HTMLSelectElement;
          expect(select.value).toBe(String(gen.male));
        });
        test(`female`, () => {
          const props = { favourite: fav.any, gender: gen.female };
          const setProps = () => {};
          render(<Filter data={props} setData={setProps} />);
          const select = screen.getByLabelText(/gender/i) as HTMLSelectElement;
          expect(select.value).toBe(String(gen.female));
        });
      });
    });
  });
});
