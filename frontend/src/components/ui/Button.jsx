import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary' | 'accent' | 'outline' | 'dark'
  size = "md", // 'sm' | 'md' | 'lg'
  className = "",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-bebas tracking-wider rounded-full transition-colors focus:outline-none cursor-pointer shadow-xs";
  
  const variants = {
    primary: "bg-yen-accent text-yen-white hover:bg-yen-accent/90 border border-yen-accent",
    accent: "bg-yen-gold text-yen-dark hover:bg-yen-gold/90 border border-yen-gold",
    outline: "bg-transparent text-yen-white border border-yen-white/30 hover:border-yen-white hover:bg-yen-white/5",
    dark: "bg-yen-dark text-yen-white hover:bg-yen-dark/90 border border-yen-dark",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
