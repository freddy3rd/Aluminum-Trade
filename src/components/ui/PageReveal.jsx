import { motion } from "framer-motion";

const PageReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      transition={{
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="w-full h-full"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 bg-black rounded-full origin-center"
        />

      {children}
    </motion.div>
  );
};

export default PageReveal;