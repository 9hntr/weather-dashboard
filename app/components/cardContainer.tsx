import React from "react";

export const CardContainer = ({ children }: { children: any }) => {
  return (
    <div className="rounded-md shadow-md dark:shadow-sm shadow-slate-200 dark:bg-dark-gray dark:shadow-slate-800 text-card-foreground">
      {children}
    </div>
  );
};
