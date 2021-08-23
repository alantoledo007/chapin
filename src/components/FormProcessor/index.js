import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createFormErrorHandler from "src/utils/createFormErrorHandler";

export default function FormProcessor({ Form, schema, onSubmit }) {
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
