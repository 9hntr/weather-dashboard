import React from "react";
import SiteConfig from "../siteConfg";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex justify-center select-none py-4">
      <p className="font-extralight text-center text-sm leading-loose">
        Built by{" "}
        <Link
          href={SiteConfig.links.githubProfile}
          target="_blank"
          rel="noreferrer"
          className="font-xs font-semibold underline underline-offset-4"
        >
          Carlos Barrios
        </Link>
        . Source code available on{" "}
        <Link
          href={SiteConfig.links.sourceCode}
          target="_blank"
          rel="noreferrer"
          className="font-xs font-semibold underline underline-offset-4"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
};
