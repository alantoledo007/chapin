import Button from "src/components/shared/Button";
import withReactHookForm from "src/hocs/withReactHookForm";
import schema from "./schema";

const Form = ({ onSubmit, isSubmitting, register, errorHandler }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="fullname">Nombre completo</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Nombre completo"
          {...register("fullname")}
        />
        {errorHandler("fullname")}
      </div>
      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-Mail"
          {...register("email")}
        />
        {errorHandler("email")}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          {...register("password")}
        />
        {errorHandler("password")}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Registrarse
      </Button>
    </form>
  );
};

const RegisterForm = withReactHookForm(schema)(Form);

export default RegisterForm;
