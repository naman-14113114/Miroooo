import type { ButtonHTMLAttributes, ReactNode } from "react";
import { VisuallyHidden } from "./visually-hidden";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, type = "button", ...props }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} title={label} {...props}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </button>
  );
}
