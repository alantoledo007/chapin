import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Button from ".";

describe("<Button />", () => {
  test("Renderiza un boton", () => {
    render(<Button>Esto es un botón</Button>);
    const button = screen.getByText(/Esto es un botón/i);
    expect(button.tagName).toBe("BUTTON");
  });

  test("Renderiza un link cuando recibe la prop 'to'", () => {
    render(
      <BrowserRouter>
        <Button to="#">Esto es un link</Button>
      </BrowserRouter>
    );
    const button = screen.getByText(/Esto es un link/i);
    expect(button.tagName).toBe("A");
  });
});
