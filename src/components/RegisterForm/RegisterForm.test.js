import { fireEvent, render, screen } from "@testing-library/react";
import createFormErrorHandler from "src/utils/createFormErrorHandler";
import RegisterForm from ".";

describe("<RegisterForm />", () => {
  test("Renderiza correctamente", () => {
    render(<RegisterForm errorHandler={() => {}} register={() => {}} />);

    //labels
    screen.getByText(/Nombre completo/i);
    screen.getByText(/Correo electrónico/i);
    screen.getByText(/Contraseña/i);

    //button
    const button = screen.getByText(/Registrarse/i);
    expect(button).toHaveAttribute("type");
    expect(button.getAttribute("type")).toBe("submit");

    //inputs
    screen.getByPlaceholderText(/Nombre completo/i);
    screen.getByPlaceholderText(/E-Mail/i);
    screen.getByPlaceholderText(/Contraseña/i);
  });

  test("Submitea correctamente", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <RegisterForm
        errorHandler={() => {}}
        register={() => {}}
        onSubmit={onSubmit}
      />
    );
    const button = screen.getByText(/Registrarse/i);

    fireEvent.click(button);

    expect(onSubmit).toBeCalledTimes(1);
  });

  test("Si el formulario se está enviando, se desactiva el botón", () => {
    const onSubmit = jest.fn();
    render(
      <RegisterForm
        errorHandler={() => {}}
        register={() => {}}
        onSubmit={onSubmit}
        isSubmitting={true}
      />
    );
    const button = screen.getByText(/Registrarse/i);
    fireEvent.click(button);

    expect(onSubmit).toBeCalledTimes(0);
    expect(button).toBeDisabled();
  });

  test("Cuando el formulario tiene errores, renderiza los mensajes de error", () => {
    const errors = {
      email: { message: "error email message." },
      password: { message: "error password message." },
      fullname: {},
    };
    const errorHandler = createFormErrorHandler(errors);
    render(
      <RegisterForm
        register={() => {}}
        errorHandler={errorHandler}
        isSubmitting={true}
      />
    );

    screen.getByText(/error email message./i);
    screen.getByText(/error password message./i);
  });
});
