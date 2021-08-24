import { useState } from "react";
import FormProcessor from "src/components/FormProcessor";
import LoginForm from "src/components/LoginForm";
import Button from "src/components/shared/Button";
import If, { Else, Then } from "src/components/shared/If";
import * as yup from "yup";
import Login from "./Login";
import Register from "./Register";

const FORMS = {
  register: Symbol("register"),
  login: Symbol("login"),
};

const schema = yup.object().shape({
  password: yup.string().required("error"),
});

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
          <Register onSubmit={() => {}} handleSelectForm={selectLoginForm} />
        </Then>
        <Else>
          <Login onSubmit={() => {}} handleSelectForm={selectRegisterForm} />
        </Else>
      </If>
    </div>
  );
}
