import Button from "src/components/shared/Button";

export default function LoginForm({
  onSubmit,
  isSubmitting,
  register,
  errorHandler,
}) {
  return (
    <form onSubmit={onSubmit}>
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
        Ingresar
      </Button>
    </form>
  );
}
