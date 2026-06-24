type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** cream-dark surface used for testimonials */
  tone?: "white" | "cream";
};

export function Card({ children, className = "", tone = "white" }: CardProps) {
  const surface =
    tone === "cream" ? "bg-cream-dark" : "bg-white";
  return (
    <div
      className={`rounded-[16px] border border-border ${surface} p-8 shadow-sm transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sm:p-10 ${className}`}
    >
      {children}
    </div>
  );
}
