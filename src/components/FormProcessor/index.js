import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createFormErrorHandler from "src/utils/createFormErrorHandler";

export default function FormProcessor({ Form, schema, onSubmit }) {
  if (!schema) throw new Error("The schema is required");
  if (typeof onSubmit !== "function")
    throw new Error("onSubmit must be a function");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const errorHandler = createFormErrorHandler(errors);

  return (
    <Form
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      errorHandler={errorHandler}
    />
  );
}
