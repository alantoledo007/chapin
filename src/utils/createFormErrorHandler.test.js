import createFormErrorHandler from "./createFormErrorHandler";
import { render, screen } from "@testing-library/react";

describe("createFormErrorHandler()", () => {
  const email_error_message = "el email es requerido";
  const errors = {
    email: { message: email_error_message },
  };
  let errorHandler;

  beforeEach(() => {
    errorHandler = createFormErrorHandler(errors);
  });
  test("Recibe un objeto de errores y retorna una función", () => {
    expect(typeof errorHandler).toBe("function");
  });

  test("La función recibe el nombre del campo a verificar, si hay un error sobre ese campo, renderiza el mensaje de error", () => {
    render(errorHandler("email"));

    screen.getByText(email_error_message);
  });

  test("Al establecer un campo que no tiene errores, returna null (no renderiza nada)", () => {
    render(errorHandler("password"));
    expect(screen.queryByText(email_error_message)).toBe(null);
  });
});
