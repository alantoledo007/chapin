import FormProcessor from "src/components/FormProcessor";
import RegisterForm from "src/components/RegisterForm";
import Button from "src/components/shared/Button";
import schema from "./schema";

export default function Register({ onSubmit, handleSelectForm }) {
  return (
    <div>
      <FormProcessor schema={schema} onSubmit={onSubmit} Form={RegisterForm} />
      <Button onClick={handleSelectForm}>Ya tengo una cuenta</Button>
    </div>
  );
}
