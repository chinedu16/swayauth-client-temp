"use client";
import { ReactNode } from "react";
import Head from "next/head";
import "@/styles/hosted-classic.css";

interface ClassicTemplateProps {
  title: string;
  defaultPage: "login" | "register";
  navLink: (target: "login" | "register") => string;
  children: ReactNode;
  logo?: ReactNode | string;
  colors?: {
    background?: string;
    cardBg?: string;
    cardBorder?: string;
    gold?: string;
    burgundy?: string;
    textPrimary?: string;
    textMuted?: string;
  };
  copyright?: string;
  policyText?: string;
  policyLink?: string;
}

const ClassicTemplate = ({
  title,
  defaultPage,
  navLink,
  children,
  logo,
  colors = {},
  copyright = "© 2026 All rights reserved.",
  policyText = "Privacy Policy",
  policyLink = "/privacy",
}: ClassicTemplateProps) => {
  const vars = {
    "--cl-bg":       colors.background  ?? "#1a0a0e",
    "--cl-card":     colors.cardBg      ?? "#1f0d12",
    "--cl-border":   colors.cardBorder  ?? "rgba(201,146,42,0.28)",
    "--cl-gold":     colors.gold        ?? "#c9922a",
    "--cl-burg":     colors.burgundy    ?? "#8b1a2f",
    "--cl-text":     colors.textPrimary ?? "#f5e6c8",
    "--cl-muted":    colors.textMuted   ?? "#c9a97a",
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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div
        className="cl-shell min-h-svh w-full flex flex-col items-center justify-center px-4 py-10 sm:py-14"
        style={vars}
      >
        <div className="fixed top-4 left-4 z-30">{renderLogo()}</div>
        <div className="cl-animate w-full max-w-md sm:max-w-[460px]">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-3.5 px-px">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="cl-display flex items-center gap-2 text-lg sm:text-xl font-bold tracking-wide truncate"
                style={{ color: "var(--cl-text)" }}
              >
                <span
                  className="inline-block w-2 h-2 flex-shrink-0 rotate-45"
                  style={{ background: "var(--cl-gold)", boxShadow: "0 0 5px var(--cl-gold)" }}
                />
                {title}
              </span>
            </div>

          </div>

          {/* Card */}
          <div
            className="cl-card-shadow relative rounded-[3px] px-5 py-8 sm:px-9 sm:py-10"
            style={{
              background: "linear-gradient(160deg, var(--cl-card) 0%, #120810 100%)",
              border: "1px solid var(--cl-border)",
            }}
          >
            {/* Corner ornaments */}
            <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l" style={{ borderColor: "var(--cl-gold)", opacity: 0.45 }} />
            <span className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r" style={{ borderColor: "var(--cl-gold)", opacity: 0.45 }} />
            <span className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l" style={{ borderColor: "var(--cl-gold)", opacity: 0.45 }} />
            <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r" style={{ borderColor: "var(--cl-gold)", opacity: 0.45 }} />

            {/* Children */}
            <div className="cl-scope">{children}</div>

            {/* Divider */}
            <div
              className="my-5 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,146,42,0.3), transparent)" }}
            />

            {/* Switch link */}
            <p className="cl-body text-center text-sm sm:text-base" style={{ color: "var(--cl-muted)" }}>
              {defaultPage === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <a href={navLink("register")} className="underline underline-offset-2 hover:opacity-75 transition-opacity" style={{ color: "var(--cl-gold)" }}>
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href={navLink("login")} className="underline underline-offset-2 hover:opacity-75 transition-opacity" style={{ color: "var(--cl-gold)" }}>
                    Sign in
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Footer */}
          <footer
            className="cl-body mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-xs tracking-wide"
            style={{ color: "rgba(201,169,122,0.38)" }}
          >
            <span>{copyright}</span>
            <span className="opacity-50">·</span>
            <a href={policyLink} className="transition-opacity hover:opacity-70" style={{ color: "rgba(201,169,122,0.55)" }}>
              {policyText}
            </a>
          </footer>

        </div>
      </div>
    </>
  );
};

export default ClassicTemplate;
