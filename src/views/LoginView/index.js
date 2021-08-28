import { useToasts } from "react-toast-notifications";
import LoginForm from "src/components/LoginForm";
import Button from "src/components/shared/Button";
import { PATH_ROUTES } from "src/constants";
import { loginWithEmailAndPassword } from "src/firebase/auth";
import AppLayout from "src/layouts/AppLayout";
import getErrorMessage from "src/utils/getErrorMessage";
import getToastConfig from "src/utils/getToastConfig";

export default function LoginView() {
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    loginWithEmailAndPassword(data.email, data.password).catch((error) => {
      addToast(getErrorMessage(error?.code), getToastConfig("error"));
    });
  };

  return (
    <AppLayout>
      <h1>Iniciar sesión</h1>
      <LoginForm onSubmit={onSubmit} />
      <Button to={PATH_ROUTES.register}>No tengo una cuenta</Button>
    </AppLayout>
  );
}
