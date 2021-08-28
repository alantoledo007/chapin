export default function getToastConfig(appearance, override = {}) {
  return {
    appearance,
    autoDismiss: true,
    ...override,
  };
}
