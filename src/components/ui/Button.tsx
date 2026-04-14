import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    
    let variantClass = "bg-[var(--color-pgf-primary)] text-white hover:bg-[var(--color-pgf-primary)]/90 shadow-md";
    if (variant === "secondary") variantClass = "bg-[var(--color-pgf-secondary)] text-white hover:bg-[var(--color-pgf-secondary)]/90 shadow-md";
    if (variant === "outline") variantClass = "border border-[var(--color-pgf-primary)] bg-transparent hover:bg-[var(--color-pgf-primary)] hover:text-white text-[var(--color-pgf-primary)]";
    if (variant === "ghost") variantClass = "hover:bg-[var(--color-pgf-primary)]/10 text-[var(--color-pgf-primary)]";
    if (variant === "link") variantClass = "text-[var(--color-pgf-primary)] underline-offset-4 hover:underline";

    let sizeClass = "h-11 px-6 py-2";
    if (size === "sm") sizeClass = "h-9 rounded-md px-3 text-xs";
    if (size === "lg") sizeClass = "h-12 rounded-md px-8 text-base";
    if (size === "icon") sizeClass = "h-11 w-11";

    const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50";

    return (
      <button
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
