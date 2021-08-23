import { useState } from "react";
import FormProcessor from "src/components/FormProcessor";
import LoginForm from "src/components/LoginForm";
import RegisterForm from "src/components/RegisterForm";
import Button from "src/components/shared/Button";
import If, { Else, Then } from "src/components/shared/If";

const FORMS = {
  register: Symbol("register"),
  login: Symbol("login"),
};

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(FORMS.register);

  const selectRegisterForm = () => {
    setSelectedForm(FORMS.register);
  };

  const selectLoginForm = () => {
    setSelectedForm(FORMS.login);
  };

  return (
    <div>
      <If predicate={selectedForm === FORMS.register}>
        <Then>
          <FormProcessor Form={RegisterForm} />
          <Button onClick={selectLoginForm}>Ya tengo una cuenta</Button>
        </Then>
        <Else>
          <FormProcessor Form={LoginForm} />
          <Button onClick={selectRegisterForm}>No tengo una cuenta</Button>
        </Else>
      </If>
    </div>
  );
}
