import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Waves } from "lucide-react";
import React from "react";

export const Temperature = ({ data }: { data: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="select-none flex flex-col items-center pb-6 md:pb-0">
            <Waves />
            <span className="text-xs pt-1 text-center">{data}°</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Temperature</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
