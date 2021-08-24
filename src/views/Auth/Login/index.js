import FormProcessor from "src/components/FormProcessor";
import LoginForm from "src/components/LoginForm";
import Button from "src/components/shared/Button";
import schema from "./schema";

export default function Login({ onSubmit, handleSelectForm }) {
  return (
    <div>
      <FormProcessor schema={schema} onSubmit={onSubmit} Form={LoginForm} />
      <Button onClick={handleSelectForm}>No tengo una cuenta</Button>
    </div>
  );
}
