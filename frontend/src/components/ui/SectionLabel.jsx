export default function SectionLabel({
  children,
  variant = "bebas", // 'bebas' | 'dm'
  color = "accent", // 'accent' | 'gold' | 'neutral'
  className = "",
}) {
  const fonts = {
    bebas: "font-bebas tracking-widest text-sm uppercase",
    dm: "font-bebas tracking-widest text-sm uppercase",
  };

  const colors = {
    accent: "text-yen-accent",
    gold: "text-yen-gold",
    neutral: "text-yen-neutral",
  };

  return (
    <span className={`${fonts[variant]} ${colors[color]} block mb-2 ${className}`}>
      {children}
    </span>
  );
}
