import FormProcessor from "src/components/FormProcessor";
import RegisterForm from "src/components/RegisterForm";
import Button from "src/components/shared/Button";
import schema from "./schema";
import { motion } from "framer-motion";

const animation_variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

export default function Register({ onSubmit, handleSelectForm }) {
  return (
    <motion.div variants={animation_variants} initial="hidden" animate="show">
      <h4>Crearse una cuenta</h4>
      <FormProcessor schema={schema} onSubmit={onSubmit} Form={RegisterForm} />
      <Button onClick={handleSelectForm}>Ya tengo una cuenta</Button>
    </motion.div>
  );
}
