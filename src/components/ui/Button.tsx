import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[#1C2B3A] text-[#F0E9D6] hover:bg-[#263D54] focus-visible:outline-[#1C2B3A]",
  secondary:
    "border border-[#1C2B3A] text-[#1C2B3A] hover:bg-[#E8DFCB] focus-visible:outline-[#1C2B3A]",
  ghost:
    "text-[#7C5C3E] underline underline-offset-4 hover:text-[#9A7050] focus-visible:outline-[#7C5C3E]",
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
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";

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
