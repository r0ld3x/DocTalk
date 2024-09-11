"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme(
          theme === "dark"
            ? "light"
            : theme === "light"
            ? "dark"
            : theme === "system"
            ? "dark"
            : "light"
        );
      }}
      variant="outline"
      className="rounded-full"
      size="icon"
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]rounded-full" />
      ) : theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]  rounded-full" />
      ) : (
        <Monitor className="h-[1.2rem] w-[1.2rem]  rounded-full" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>

    // <DropdownMenuContent align="end">
    //   <DropdownMenuItem onClick={() => setTheme("light")}>
    //     Light
    //   </DropdownMenuItem>
    //   <DropdownMenuItem onClick={() => setTheme("dark")}>
    //     Dark
    //   </DropdownMenuItem>
    //   <DropdownMenuItem onClick={() => setTheme("system")}>
    //     System
    //   </DropdownMenuItem>
    // </DropdownMenuContent>
  );
}
