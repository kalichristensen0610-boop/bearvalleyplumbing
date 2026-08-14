import type { AnchorHTMLAttributes } from "react";

type HardLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export default function HardLink({ href, ...props }: HardLinkProps) {
  return <a href={href} {...props} />;
}
