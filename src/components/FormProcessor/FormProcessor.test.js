import { act, fireEvent, render, screen } from "@testing-library/react";
import FormProcessor from ".";
import RegisterForm from "../RegisterForm";
import * as yup from "yup";

describe("<FormProcessor />", () => {
  let schema;
  let onSubmit;
  const password_error_message = "La contraseña es requerida.";
  beforeEach(() => {
    schema = yup.object().shape({
      password: yup.string().required(password_error_message),
    });
    onSubmit = jest.fn();
  });

  test("renderiza correctamente el form recibido", () => {
    render(<FormProcessor Form={RegisterForm} />);

    screen.getByText(/Contraseña/i); //label
  });

  test("si la validación falla, NO se ejecuta 'onSubmit'", async () => {
    render(
      <FormProcessor schema={schema} Form={RegisterForm} onSubmit={onSubmit} />
    );
    const button = screen.getByText(/registrarse/i);
    await act(async () => fireEvent.click(button));
    expect(onSubmit).toBeCalledTimes(0);
  });

  test("si la validación falla, renderiza un mensaje de error", async () => {
    render(<FormProcessor schema={schema} Form={RegisterForm} />);
    const button = screen.getByText(/registrarse/i);
    await act(async () => fireEvent.click(button));
    screen.getByText(password_error_message); //label
  });

  test("si la validación pasa, ejecuta la función 'onSubmit'", async () => {
    render(
      <FormProcessor schema={schema} Form={RegisterForm} onSubmit={onSubmit} />
    );

    const button = screen.getByText(/registrarse/i);
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    await act(async () =>
      fireEvent.change(passwordInput, { target: { value: "1234" } })
    );
    await act(async () => fireEvent.click(button));

    expect(onSubmit).toBeCalledTimes(1);
  });
});
