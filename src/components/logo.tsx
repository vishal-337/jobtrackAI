"use client";

import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.ComponentProps<"img">) => {
  return (
    <img
      src="/src/assets/jobtrackAI_logo.png"
      alt="logo"
      className={cn("h-12 w-100", className)}
      {...props}
    />
  );
};
