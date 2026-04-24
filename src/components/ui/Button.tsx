import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[#C89A4F] text-[#2C2620] hover:bg-[#b88c47] focus-visible:outline-[#C89A4F]",
  secondary:
    "border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white",
  ghost:
    "text-[#8BA5BB] underline underline-offset-4 hover:text-white focus-visible:outline-[#8BA5BB]",
};

export function Button({
  variant = "primary",
  as: Tag = "button",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";

  if (Tag === "a") {
    return (
      <a href={href} className={`${base} ${styles[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
