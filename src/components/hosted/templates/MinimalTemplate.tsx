"use client";
import { ReactNode } from "react";
import Head from "next/head";
import "@/styles/hosted-minimal.css";

interface MinimalTemplateProps {
  title: string;
  defaultPage: "login" | "register";
  navLink: (target: "login" | "register") => string;
  children: ReactNode;
  logo?: ReactNode | string;
  colors?: {
    background?: string;
    cardBg?: string;
    cardBorder?: string;
    accent?: string;
    textPrimary?: string;
    textMuted?: string;
  };
  copyright?: string;
  policyText?: string;
  policyLink?: string;
}

const MinimalTemplate = ({
  title,
  defaultPage,
  navLink,
  children,
  logo,
  colors = {},
  copyright = "© 2026 All rights reserved.",
  policyText = "Privacy Policy",
  policyLink = "/privacy",
}: MinimalTemplateProps) => {
  const vars = {
    "--mn-bg":     colors.background  ?? "#f2ede6",
    "--mn-card":   colors.cardBg      ?? "#faf8f4",
    "--mn-border": colors.cardBorder  ?? "#ddd7ce",
    "--mn-accent": colors.accent      ?? "#3d6b50",
    "--mn-text":   colors.textPrimary ?? "#1c1c1a",
    "--mn-muted":  colors.textMuted   ?? "#7a7468",
  } as React.CSSProperties;

  const renderLogo = () => {
    if (!logo) return null;
    if (typeof logo === "string")
      return <img src={logo} alt={title} className="h-8 w-auto object-contain" />;
    return <span className="flex items-center">{logo}</span>;
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div
        className="mn-shell min-h-svh w-full flex flex-col items-center justify-center px-4 py-10 sm:py-14"
        style={vars}
      >
        <div className="fixed top-4 left-4 z-30">{renderLogo()}</div>
        <div className="mn-animate w-full max-w-md sm:max-w-[450px]">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-4 px-px">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="mn-display text-xl sm:text-2xl font-normal truncate"
                style={{ color: "var(--mn-text)", letterSpacing: "-0.01em" }}
              >
                {title}
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full ml-0.5 align-super"
                  style={{ background: "var(--mn-accent)" }}
                />
              </span>
            </div>


          </div>

          {/* Card */}
          <div
            className="mn-card-shadow relative overflow-hidden rounded-xl px-5 py-8 sm:px-9 sm:py-10"
            style={{
              background: "var(--mn-card)",
              border: "1px solid var(--mn-border)",
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
              style={{
                background: "linear-gradient(90deg, var(--mn-accent), rgba(61,107,80,0.25))",
              }}
            />

            {/* Children */}
            <div className="mn-scope">{children}</div>

            {/* Divider */}
            <div className="my-5 h-px" style={{ background: "var(--mn-border)" }} />

            {/* Switch link */}
            <p className="mn-body text-center text-sm sm:text-base" style={{ color: "var(--mn-muted)" }}>
              {defaultPage === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <a
                    href={navLink("register")}
                    className="font-medium underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: "var(--mn-accent)", textDecorationColor: "rgba(61,107,80,0.4)" }}
                  >
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a
                    href={navLink("login")}
                    className="font-medium underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: "var(--mn-accent)", textDecorationColor: "rgba(61,107,80,0.4)" }}
                  >
                    Sign in
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Footer */}
          <footer
            className="mn-body mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-xs font-light tracking-wide"
            style={{ color: "#a09890" }}
          >
            <span>{copyright}</span>
            <span className="opacity-50">·</span>
            <a
              href={policyLink}
              className="underline underline-offset-2 transition-colors hover:opacity-70"
              style={{ textDecorationColor: "rgba(61,107,80,0.35)" }}
            >
              {policyText}
            </a>
          </footer>

        </div>
      </div>
    </>
  );
};

export default MinimalTemplate;
