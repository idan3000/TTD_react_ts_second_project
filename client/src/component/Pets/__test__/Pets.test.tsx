import {render, screen, within} from "@testing-library/react";
import React from "react";
import Pets from "../Pets";
import {rest} from "msw";
import {setupServer} from "msw/node";
import catsMock from "../../cats.json";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
import {click} from "@testing-library/user-event/dist/click";
import fav from "../../../types&interface/favourite_enum";
import gen from "../../../types&interface/gender_enum";

const server = setupServer(
    rest.get(`http://localhost:4000/cats`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(catsMock))
    )
);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe(`pets`, () => {
  test(`render 5 cards`, async () => {
    render(<Pets/>);
    expect((await screen.findAllByRole(`article`)).length).toBe(5);
  });

  describe(`filter for`, () => {
    const filterMale = () => {
      const select = screen.getByLabelText(/gender/i) as HTMLSelectElement;
      selectOptions(select, gen.male);
    };
    const filterFemale = () => {
      const select = screen.getByLabelText(/gender/i) as HTMLSelectElement;
      selectOptions(select, gen.female);
    };
    const filterIsFavourite = () => {
      const select = screen.getByLabelText(/favourite/i) as HTMLSelectElement;
      selectOptions(select, String(fav.favourite));
    };
    const filterIsNotFavourite = () => {
      const select = screen.getByLabelText(/favourite/i) as HTMLSelectElement;
      selectOptions(select, String(fav.notFavourite));
    };

    beforeEach(() => render(<Pets/>));
    test(`gender as male`, async () => {
      const cards = await screen.findAllByRole(`article`);
      filterMale();
      const maleCards = await screen.findAllByRole(`article`);
      expect(maleCards).toStrictEqual([cards[1], cards[3]]);
    });
    test(`gender as female`, async () => {
      const cards = await screen.findAllByRole(`article`);
      filterFemale();
      const maleCards = await screen.findAllByRole(`article`);
      expect(maleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
    });
    test(`favourite as favourite`, async () => {
      const cards = await screen.findAllByRole(`article`);
      click(within(cards[0]).getByRole(`button`));
      click(within(cards[3]).getByRole(`button`));
      filterIsFavourite();
      expect(screen.getAllByRole(`article`)).toStrictEqual([
        cards[0],
        cards[3],
      ]);
    });
    test(`favourite as not favourite`, async () => {
      const cards = await screen.findAllByRole(`article`);
      click(within(cards[0]).getByRole(`button`));
      click(within(cards[3]).getByRole(`button`));
      filterIsNotFavourite();
      expect(screen.getAllByRole(`article`)).toStrictEqual([
        cards[1],
        cards[2],
        cards[4],
      ]);
    });
    test(`favourite and male`, async () => {
      const cards = await screen.findAllByRole(`article`);
      click(within(cards[0]).getByRole(`button`));
      click(within(cards[1]).getByRole(`button`));
      filterIsFavourite();
      filterMale();
      expect(screen.getAllByRole(`article`)).toStrictEqual([cards[1]]);
    });
    test(`favourite and female`, async () => {
      const cards = await screen.findAllByRole(`article`);
      click(within(cards[0]).getByRole(`button`));
      click(within(cards[1]).getByRole(`button`));
      filterIsFavourite();
      filterFemale();
      expect(screen.getAllByRole(`article`)).toStrictEqual([cards[0]]);
    });
    test(`not favourite and male`, async () => {
      const cards = await screen.findAllByRole(`article`);
      click(within(cards[0]).getByRole(`button`));
      click(within(cards[1]).getByRole(`button`));
      filterIsNotFavourite();
      filterMale();
      expect(screen.getAllByRole(`article`)).toStrictEqual([cards[3]]);
    });
    test(`not favourite and female`, async () => {
      const cards = await screen.findAllByRole(`article`);
      click(within(cards[0]).getByRole(`button`));
      click(within(cards[1]).getByRole(`button`));
      filterIsNotFavourite();
      filterFemale();
      expect(screen.getAllByRole(`article`)).toStrictEqual([
        cards[2],
        cards[4],
      ]);
    });

  });
});
