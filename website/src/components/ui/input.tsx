import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex items-center hover:text-orangeCustom">
        <Search size={24} className="md:w-6 md:h-6 w-5 h-5" />
        <input
          type={type}
          className={cn(
            // Layout & Spacing
            "flex w-full h-10 px-3 py-2 ml-2 justify-center", // Default for larger screens
            "md:h-9 md:px-2", // For medium screens
            "sm:h-8 sm:px-1 sm:ml-1", // For small screens (phones)

            // Border & Background
            "rounded-md border border-input bg-background ring-offset-background",

            // Text
            "text-sm placeholder:text-muted-foreground",
            "sm:text-xs", // Smaller text for phones

            // File input styles
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

            // Focus & Active States
            "focus-visible:outline-none focus-visible:ring-ring focus-visible:border-orangeCustom focus-visible:ring-offset-2",

            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",

            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
