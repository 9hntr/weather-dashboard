import React from "react";
import SiteConfig from "../siteConfg";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex justify-start py-2 text-sm text-muted-foreground">
      <Link
        href={SiteConfig.links.githubProfile}
        target="_blank"
        rel="noreferrer"
        className="flex justify-center items-center w-auto"
      >
        <Heart
          size={15}
          className="text-red-500 transform animate-pulse inline-flex mr-2"
        />
        Built by Carlos
        <ArrowUpRight
          size={15}
          className="group-hover:transform group-hover:animate-pulse inline-flex ml-1"
        />
      </Link>
    </footer>
  );
};
