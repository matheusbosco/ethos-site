import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  surface?: boolean;
  as?: "section" | "div" | "article";
}

export function Section({
  surface = false,
  as: Tag = "section",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={`w-full px-6 py-20 md:py-28 ${surface ? "bg-[#F0EEE6]" : "bg-[#FAF9F5]"} ${className}`}
      {...props}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </Tag>
  );
}
