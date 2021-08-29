import { FORMS_ERROR_MESSAGES } from "src/constants";
import * as yup from "yup";

const description_messages = FORMS_ERROR_MESSAGES.description;

const schema = yup.object().shape({
  description: yup
    .string()
    .required(description_messages.required)
    .min(10, description_messages.min),
});

export default schema;
