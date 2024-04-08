import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SunDim } from "lucide-react";
import React from "react";

export const UvIndex = ({ data }: { data: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="select-none flex flex-col items-center">
            <SunDim />
            <span className="text-xs pt-1 text-center">{data}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>UV Index</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
