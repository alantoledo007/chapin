import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FORMS_ERROR_MESSAGES } from "src/constants";
import Register from ".";

describe("Auth -> <Register />", () => {
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    render(<Register onSubmit={onSubmit} />);
  });

  test("Si el formulario se completa correctamente, se envía el formulario", async () => {
    await userEvent.type(
      screen.getByPlaceholderText("Nombre completo"),
      "Alan Toledo"
    );
    await userEvent.type(
      screen.getByPlaceholderText("E-Mail"),
      "alantoledo.work@gmail.com"
    );
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "12345678");

    await act(async () => userEvent.click(screen.getByText(/Registrarse/i)));

    expect(onSubmit).toBeCalledTimes(1);
  });

  test("Si el formulario no tiene los campos requeridos, NO envía el formulario y renderiza los errores correspondientes", async () => {
    await act(async () => userEvent.click(screen.getByText(/Registrarse/i)));
    expect(onSubmit).toBeCalledTimes(0);

    screen.getByText(FORMS_ERROR_MESSAGES.fullname.required);
    screen.getByText(FORMS_ERROR_MESSAGES.email.required);
    screen.getByText(FORMS_ERROR_MESSAGES.password.required);
  });

  test("Renderiza los mensajes de error correspondientes cuando los datos no són válidos", async () => {
    await userEvent.type(screen.getByPlaceholderText("Nombre completo"), "asd");
    await userEvent.type(
      screen.getByPlaceholderText("E-Mail"),
      "alantoledo.mail.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Contraseña"),
      "123456789012345673"
    );
    await act(async () => userEvent.click(screen.getByText(/Registrarse/i)));

    screen.getByText(FORMS_ERROR_MESSAGES.fullname.valid);
    screen.getByText(FORMS_ERROR_MESSAGES.email.valid);
    screen.getByText(FORMS_ERROR_MESSAGES.password.max);

    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText("Contraseña"),
        "{selectall}{del}12345"
      );
      userEvent.click(screen.getByText(/Registrarse/i));
    });

    screen.getByText(FORMS_ERROR_MESSAGES.password.min);

    expect(onSubmit).toBeCalledTimes(0);
  });
});
