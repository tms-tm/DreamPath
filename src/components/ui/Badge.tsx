import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "sky" | "sage" | "sunshine" | "blush" | "neutral" | "error";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  sky: "bg-primary-container text-on-primary-fixed",
  sage: "bg-secondary-container text-on-secondary-fixed",
  sunshine: "bg-sunshine-container text-on-sunshine-container",
  blush: "bg-tertiary-container text-on-tertiary-fixed",
  neutral: "bg-surface-container-high text-on-surface-variant",
  error: "bg-error-container text-on-error-container",
};

export function Badge({ className, variant = "sky", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-none",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
