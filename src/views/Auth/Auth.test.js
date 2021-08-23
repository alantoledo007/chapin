import { fireEvent, render, screen } from "@testing-library/react";
import Auth from ".";

describe("<Auth />", () => {
  beforeEach(() => {
    render(<Auth />);
  });

  test("Por defecto, renderiza el formulario de registro", () => {
    screen.getByText(/Registrarse/i);
    screen.getByText(/Ya tengo una cuenta/i);
  });

  test("Al precionar (ya tengo/no tengo una cuenta) renderiza el formulario correspondiente", () => {
    //switch to login
    fireEvent.click(screen.getByText(/Ya tengo una cuenta/i));
    expect(screen.queryByText(/Registrarse/i)).toBe(null);
    screen.getByText(/Ingresar/i);
    const buttonToRegister = screen.getByText(/No tengo una cuenta/i);

    //back to register
    fireEvent.click(buttonToRegister);
    expect(screen.queryByText(/No tengo una cuenta/i)).toBe(null);
    expect(screen.queryByText(/Ingresar/i)).toBe(null);
    screen.getByText(/Ya tengo una cuenta/i);
  });
});
