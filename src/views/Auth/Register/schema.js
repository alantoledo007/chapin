import { FORMS_ERROR_MESSAGES } from "src/constants";
import * as yup from "yup";

const fullname_messages = FORMS_ERROR_MESSAGES.fullname;
const email_messages = FORMS_ERROR_MESSAGES.email;
const password_messages = FORMS_ERROR_MESSAGES.password;

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required(fullname_messages.required)
    .matches(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/, fullname_messages.valid),
  email: yup
    .string()
    .email(email_messages.valid)
    .required(email_messages.required),
  password: yup
    .string()
    .required(password_messages.required)
    .min(6, password_messages.min)
    .max(16, password_messages.max),
});

export default schema;
