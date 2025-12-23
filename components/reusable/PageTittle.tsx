import { cn } from "@/lib/utils";
import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  rightSlot,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 mb-4 sm:mb-6",
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-bold leading-tight">{title}</h1>

        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
};

export default PageTitle;
