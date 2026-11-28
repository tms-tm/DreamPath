import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/components/ui/Badge";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  eyebrowVariant?: BadgeProps["variant"];
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  eyebrowVariant = "sky",
  action,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1.5">
        {eyebrow && <Badge variant={eyebrowVariant}>{eyebrow}</Badge>}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-on-surface-variant max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
