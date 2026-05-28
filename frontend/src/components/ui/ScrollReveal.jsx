import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  className = "",
}) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 60 },
    right: { x: -60 },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
