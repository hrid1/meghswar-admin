import { Search } from "lucide-react";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

const CustomSearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      inputClassName,
      iconClassName,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative w-full", className)}>
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400",
            iconClassName
          )}
        />

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-9 rounded-md shadow-xs focus:outline-none",
            "border border-[#FFBE93]/50 focus:border-[#FFBE93]",
            "pl-9 pr-3",
            inputClassName
          )}
          {...props}
        />
      </div>
    );
  }
);

CustomSearchInput.displayName = "CustomSearchInput";

export default CustomSearchInput;
