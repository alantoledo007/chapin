import { motion } from "framer-motion";

const animation_variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function AppLayout({ children }) {
  return (
    <motion.div variants={animation_variants} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}
