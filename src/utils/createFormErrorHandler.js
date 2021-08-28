export default function createFormErrorHandler(errors) {
  return (field) => {
    return (
      errors && errors[field]?.message && <span>{errors[field]?.message}</span>
    );
  };
}
