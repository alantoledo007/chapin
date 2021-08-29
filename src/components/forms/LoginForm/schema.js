import { FORMS_ERROR_MESSAGES } from "src/constants";
import * as yup from "yup";

const email_messages = FORMS_ERROR_MESSAGES.email;
const password_messages = FORMS_ERROR_MESSAGES.password;

const schema = yup.object().shape({
  email: yup
    .string()
    .email(email_messages.valid)
    .required(email_messages.required),
  password: yup.string().required(password_messages.required),
});

export default schema;
