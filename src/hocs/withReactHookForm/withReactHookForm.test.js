import { render, screen } from "@testing-library/react";
import withReactHookForm from ".";
import * as yup from "yup";

describe("withReactHookForm", () => {
  let TestComponent;

  beforeEach(() => {
    TestComponent = (props) => {
      return (
        <div>
          <ul>
            {Object.keys(props).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      );
    };
  });

  test("Si al momento de invocar el HOC, la propiedad 'schema' no es proporcionada, debe retornar un error", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const Component = withReactHookForm()(TestComponent);
    expect(() => render(<Component />)).toThrow("The yup schema is required");
  });

  test("Si al momento de renderizar el componente devuelto por el HOC, no se le proporciona la propiedad 'onSubmit' retorna un error", () => {
    const Component = withReactHookForm({})(TestComponent);
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Component />)).toThrow(
      "The onSubmit prop from component must be a function"
    );
  });

  test("El componente retornado por el hoc, debe recibir las propiedades correspondientes.", () => {
    const schema = yup.object().shape({
      props: yup.string().required(),
    });

    const Component = withReactHookForm(schema)(TestComponent);

    render(<Component onSubmit={() => {}} />);
    screen.getByText("register");
    screen.getByText("errorHandler");
    screen.getByText("onSubmit");
    screen.getByText("isSubmitting");
  });
});
