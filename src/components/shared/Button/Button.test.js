import { render, screen } from "@testing-library/react";
import Button from ".";

describe("<Button />", () => {
  test("Renderiza un boton", () => {
    render(<Button>Esto es un botón</Button>);
    const button = screen.getByText(/Esto es un botón/i);
    expect(button.tagName).toBe("BUTTON");
  });

  test("Renderiza un link cuando recibe la prop 'href'", () => {
    render(<Button href="#">Esto es un link</Button>);
    const button = screen.getByText(/Esto es un link/i);
    expect(button.tagName).toBe("A");
  });
});
