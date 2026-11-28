import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary-container text-on-primary-fixed hover:bg-primary-fixed-dim shadow-soft font-bold",
  secondary:
    "bg-surface-container-lowest border border-hairline text-on-surface hover:bg-surface-container-low shadow-soft font-semibold",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-semibold",
  link: "bg-transparent text-primary hover:underline px-0 shadow-none font-semibold",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3.5 text-xs rounded-xl gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-11 px-5 text-sm rounded-2xl gap-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          variant !== "link" && sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
