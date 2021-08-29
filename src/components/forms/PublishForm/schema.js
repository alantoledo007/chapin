import { FORMS_ERROR_MESSAGES } from "src/constants";
import * as yup from "yup";

const email_messages = FORMS_ERROR_MESSAGES.email;

const schema = yup.object().shape({
  description: yup.string().required(email_messages.required),
});

export default schema;
