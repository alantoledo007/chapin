import { useToasts } from "react-toast-notifications";
import RegisterForm from "src/components/forms/RegisterForm";
import Button from "src/components/shared/Button";
import { PATH_ROUTES } from "src/constants";
import { registerWithEmailAndPassword } from "src/firebase/auth";
import AppLayout from "src/layouts/AppLayout";
import getErrorMessage from "src/utils/getErrorMessage";
import getToastConfig from "src/utils/getToastConfig";

export default function RegisterView() {
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    registerWithEmailAndPassword(data.email, data.password).catch((error) => {
      addToast(getErrorMessage(error?.code), getToastConfig("error"));
    });
  };

  return (
    <AppLayout>
      <h1>Crearse una cuenta</h1>
      <RegisterForm onSubmit={onSubmit} />
      <Button to={PATH_ROUTES.login}>Ya tengo una cuenta</Button>
    </AppLayout>
  );
}
