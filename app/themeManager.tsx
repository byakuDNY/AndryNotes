"use client";

import { useEffect } from "react";

export default function ThemeManager() {
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href =
      theme === "dark" ? "/manifest-dark.json" : "/manifest-light.json";
    document.head.appendChild(manifestLink);

    const themeColorMetaTag = document.querySelector(
      "meta[name='theme-color']"
    );
    themeColorMetaTag?.setAttribute(
      "content",
      theme === "dark" ? "#000000" : "#ffffff"
    );

    const listener = (e: MediaQueryListEvent) => {
      manifestLink.href = e.matches
        ? "/manifest-dark.json"
        : "/manifest-light.json";
      themeColorMetaTag?.setAttribute(
        "content",
        e.matches ? "#000000" : "#ffffff"
      );
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
    };
  }, []);

  return null;
}
