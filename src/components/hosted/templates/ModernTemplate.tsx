"use client";
import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import "@/styles/hosted-modern.css";

interface ModernTemplateProps {
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
    accentGlow?: string;
    textPrimary?: string;
    textMuted?: string;
  };
  copyright?: string;
  policyText?: string;
  policyLink?: string;
}

const ModernTemplate = ({
  title,
  defaultPage,
  navLink,
  children,
  logo,
  colors = {},
  copyright = "© 2026 All rights reserved.",
  policyText = "Privacy Policy",
  policyLink = "/privacy",
}: ModernTemplateProps) => {
  const vars = {
    "--mo-bg":     colors.background  ?? "#070b0f",
    "--mo-card":   colors.cardBg      ?? "#0d1318",
    "--mo-border": colors.cardBorder  ?? "rgba(0,212,255,0.18)",
    "--mo-accent": colors.accent      ?? "#00d4ff",
    "--mo-glow":   colors.accentGlow  ?? "rgba(0,212,255,0.22)",
    "--mo-text":   colors.textPrimary ?? "#e8f4f8",
    "--mo-muted":  colors.textMuted   ?? "#5a7a88",
  } as React.CSSProperties;

  const renderLogo = () => {
    if (!logo) return null;
    if (typeof logo === "string")
      return (
        <Image
          src={logo}
          alt={title}
          className="h-7 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      );
    return <span className="flex items-center">{logo}</span>;
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <div
        className="mo-shell relative min-h-svh w-full flex flex-col items-center justify-center px-4 py-10 sm:py-14"
        style={vars}
      >
        <div className="fixed top-4 left-4 z-30">{renderLogo()}</div>
        <div className="mo-animate relative z-10 w-full max-w-md sm:max-w-[460px]">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-3 px-px">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="mo-syne text-base sm:text-lg font-extrabold uppercase tracking-widest truncate"
                style={{ color: "var(--mo-text)" }}
              >
                {title.length > 1
                  ? <>{title.slice(0, -1)}<span style={{ color: "var(--mo-accent)" }}>{title.slice(-1)}</span></>
                  : title
                }
              </span>
            </div>

          
          </div>

          {/* Card */}
          <div
            className="mo-card-shadow relative rounded-sm px-5 py-8 sm:px-9 sm:py-10"
            style={{
              background: "var(--mo-card)",
              border: "1px solid var(--mo-border)",
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-[10%] right-[10%] h-px opacity-60"
              style={{ background: "linear-gradient(90deg, transparent, var(--mo-accent), transparent)" }}
            />

            {/* Corner brackets */}
            <span className="absolute -top-px -left-px w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: "var(--mo-accent)" }} />
            <span className="absolute -top-px -right-px w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: "var(--mo-accent)" }} />
            <span className="absolute -bottom-px -left-px w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: "var(--mo-accent)" }} />
            <span className="absolute -bottom-px -right-px w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: "var(--mo-accent)" }} />

            {/* Scanlines overlay */}
            <div className="mo-scanlines absolute inset-0 pointer-events-none rounded-sm" />

            {/* Children */}
            <div className="mo-scope relative z-10">{children}</div>

            {/* Divider */}
            <div
              className="my-5 h-px"
              style={{ background: "linear-gradient(to right, transparent, var(--mo-border), transparent)" }}
            />

            {/* Switch link */}
            <p className="mo-mono text-center text-[0.72rem] sm:text-[0.78rem]" style={{ color: "var(--mo-muted)" }}>
              {defaultPage === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <a
                    href={navLink("register")}
                    className="transition-all duration-150 hover:opacity-80"
                    style={{
                      color: "var(--mo-accent)",
                      borderBottom: "1px solid rgba(0,212,255,0.35)",
                      paddingBottom: "1px",
                    }}
                  >
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a
                    href={navLink("login")}
                    className="transition-all duration-150 hover:opacity-80"
                    style={{
                      color: "var(--mo-accent)",
                      borderBottom: "1px solid rgba(0,212,255,0.35)",
                      paddingBottom: "1px",
                    }}
                  >
                    Sign in
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Footer */}
          <footer
            className="mo-mono mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.6rem] sm:text-[0.65rem] tracking-widest"
            style={{ color: "#2e4a54" }}
          >
            <span>{copyright}</span>
            <span className="opacity-40">·</span>
            <a
              href={policyLink}
              className="transition-colors duration-150 hover:opacity-70"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.18)", paddingBottom: "1px" }}
            >
              {policyText}
            </a>
          </footer>

        </div>
      </div>
    </>
  );
};

export default ModernTemplate;
