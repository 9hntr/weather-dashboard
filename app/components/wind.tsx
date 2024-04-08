import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WindIcon } from "lucide-react";
import React from "react";

export const Wind = ({ data }: { data: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="select-none flex flex-col items-center">
            <WindIcon />
            <span className="text-xs pt-1 text-center">
              {Math.floor(data)}km/h
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Wind</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
