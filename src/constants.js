export const FORMS_ERROR_MESSAGES = {
  fullname: {
    required: "Por favor, ingrese su nombre completo.",
    valid: "El nombre ingresado no es válido.",
  },
  email: {
    required: "El correo electrónico es requerido.",
    valid: "Se requiere un correo electrónico válido.",
  },
  password: {
    required: "Se requiere una contraseña.",
    min: "Se requiere como mínimo 6 caracteres.",
    max: "La contraseña no puede tener más de 16 caracteres.",
  },
};

export const PATH_ROUTES = {
  login: "/login",
  register: "/register",
  feed: "/feed",
};

export const USER_STATES = {
  NOT_KNOW: undefined,
  NOT_LOGGED: null,
};
