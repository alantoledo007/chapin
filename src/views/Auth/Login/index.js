import FormProcessor from "src/components/FormProcessor";
import LoginForm from "src/components/LoginForm";
import Button from "src/components/shared/Button";
import schema from "./schema";
import { motion } from "framer-motion";

const animation_variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

export default function Login({ onSubmit, handleSelectForm }) {
  return (
    <motion.div variants={animation_variants} initial="hidden" animate="show">
      <h4>Iniciar sesión</h4>
      <FormProcessor schema={schema} onSubmit={onSubmit} Form={LoginForm} />
      <Button onClick={handleSelectForm}>No tengo una cuenta</Button>
    </motion.div>
  );
}
