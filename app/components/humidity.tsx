import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Droplet } from "lucide-react";
import React from "react";

export const Humidity = ({ data }: { data: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="select-none flex flex-col items-center">
            <Droplet />
            <span className="text-xs pt-1 text-center">{data}°</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Humidity</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
