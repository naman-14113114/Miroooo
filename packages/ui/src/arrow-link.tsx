import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  label: string;
};

export function ArrowLink({ label, ...props }: ArrowLinkProps) {
  return (
    <Link {...props}>
      <span>{label}</span>
      <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
    </Link>
  );
}
