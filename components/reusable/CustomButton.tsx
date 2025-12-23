import * as React from "react";
import { cn } from "@/lib/utils";

export type AppButtonVariant =
  | "primary"
  | "outline"
  | "bulk"
  | "danger"
  | "ghost";

interface AppButtonProps {
  variantType?: AppButtonVariant;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variantType = "primary",
      loading = false,
      disabled = false,
      type = "button",
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      primary: "bg-orange-600/80 hover:bg-orange-600 text-white",
      outline: "border border-orange-600 text-orange-600 hover:bg-orange-50",
      bulk: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-transparent text-orange-600 hover:bg-orange-50",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer",
          "transition-all focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClass[variantType],
          className
        )}
        {...props}
      >
        {loading ? "Processing..." : children}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";

export default AppButton;
