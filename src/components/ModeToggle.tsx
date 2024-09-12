"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const onClick = () => {
    let currentTheme;
    switch (theme) {
      case "dark":
        currentTheme = "light";
        break;
      case "light":
        currentTheme = "dark";
        break;
      case "system":
        currentTheme = "dark";
        break;
      default:
        currentTheme = "dark";
    }
    setTheme(currentTheme);
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="rounded-full"
      size="icon"
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]rounded-full" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]  rounded-full" />
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
