import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";

export const Navbar = () => {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="flex w-full sm:w-fit"></div>
      <div className="flex shrink-0 gap-2 sm:w-fit">
        <SearchDialog />
        <ThemeToggle />
      </div>
    </div>
  );
};
