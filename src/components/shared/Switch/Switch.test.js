import { render, screen } from "@testing-library/react";
import Switch, { Case, Default } from ".";

describe("<Switch />", () => {
  test("Si el valor matchea, renderiza el <Case /> correspondiente", () => {
    render(
      <Switch value={2}>
        <Case match={1}>case 1</Case>
        <Case match={2}>case 2</Case>
        <Case match={3}>case 3</Case>
        <Default>other</Default>
      </Switch>
    );

    screen.getByText(/case 2/i);
    expect(screen.queryByText(/case 1/i)).toBe(null);
    expect(screen.queryByText(/case 3/i)).toBe(null);
    expect(screen.queryByText(/other/i)).toBe(null);
  });

  test("Si el valor NO matchea, renderiza <Default />", () => {
    render(
      <Switch value={20}>
        <Case match={1}>case 1</Case>
        <Case match={2}>case 2</Case>
        <Case match={3}>case 3</Case>
        <Default>other</Default>
      </Switch>
    );

    screen.getByText(/other/i);
    expect(screen.queryByText(/case 1/i)).toBe(null);
    expect(screen.queryByText(/case 2/i)).toBe(null);
    expect(screen.queryByText(/case 3/i)).toBe(null);
  });
});
