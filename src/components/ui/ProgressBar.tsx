import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  tone?: "primary" | "secondary" | "tertiary";
}

const fillToneClasses: Record<NonNullable<ProgressBarProps["tone"]>, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = "primary",
  className,
  ...props
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = Math.max(0, Math.min(safeMax, value));
  const percent = Math.round((clampedValue / safeMax) * 100);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={clampedValue}
      className={cn(
        "h-2.5 w-full overflow-hidden rounded-full bg-surface-container-high",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300", fillToneClasses[tone])}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
