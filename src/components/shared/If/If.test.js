import { render, screen } from "@testing-library/react";
import If, { Else, Then } from ".";

describe("<If />", () => {
  test("Si el predicado es true, renderiza <Then />", () => {
    render(
      <If predicate={true}>
        <Then>
          <p>render then</p>
        </Then>
        <Else>
          <p>render else</p>
        </Else>
      </If>
    );

    screen.getByText(/render then/i);
    expect(screen.queryByText(/render else/i)).toBe(null);
  });

  test("Si el predicado es false, renderiza <Else />", () => {
    render(
      <If predicate={false}>
        <Then>
          <p>render then</p>
        </Then>
        <Else>
          <p>render else</p>
        </Else>
      </If>
    );

    screen.getByText(/render else/i);
    expect(screen.queryByText(/render then/i)).toBe(null);
  });
});
