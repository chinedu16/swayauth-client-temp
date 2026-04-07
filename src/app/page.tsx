"use client";
import Comment from "@/components/home/comment";
import Dashboard from "@/components/home/dashboard";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import IntroBanner from "@/components/home/introBanner";
import Nav from "@/components/home/nav";
import Pricing from "@/components/home/pricing";
import Trust from "@/components/home/trust";
import Input from "@/components/input";
import App2factor from "@/components/onboarding/app2factor";
import { CONST } from "@/lib/constant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const appId = searchParams.get("app_id") || "";
  const redirectUrl = searchParams.get("redirect_url") || "";
  const defaultPage = (searchParams.get("default") || "login") as
    | "login"
    | "register";

  if (appId) {
    return (
      <HostedAuth
        appId={appId}
        redirectUrl={redirectUrl}
        defaultPage={defaultPage}
      />
    );
  }

  return (
    <main>
      <Nav />
      <div className="linear-blue-2 mt-24 lg:mt-0">
        <IntroBanner />
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Features />
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl  px-5 md:px-10 mx-auto">
          <Dashboard />
        </div>
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Trust />
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl  px-5 md:px-10 mx-auto">
          <Pricing>
            <>
              <h2 className="text-2xl md:text-3xl my-10 font-bold text-center">
                Expand your option with a subscription
              </h2>
              <p className="text-gray-600 pb-10 text-center">
                To choose the right subscription service,
                consider your specific needs and requirements. If you are not sure
                which subscription service is right for you, contact us for a free consultation.
              </p>
            </>
          </Pricing>
        </div>
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Comment />
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl px-5 md:px-10 mx-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}

type HostedConfig = {
  app_id: string;
  name: string;
  redirect_url: string;
  scope: string[];
  two_factor_type: string[];
  verify_registration: boolean;
  verify_registration_type: string | null;
  default: "login" | "register";
};

const HostedAuth = ({
  appId,
  redirectUrl,
  defaultPage,
}: {
  appId: string;
  redirectUrl: string;
  defaultPage: "login" | "register";
}) => {
  const [config, setConfig] = useState<HostedConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [twoFactor, setTwoFactor] = useState<{
    open: boolean;
    reference: string;
    token: string;
    two_factor_type: "app" | "sms" | "mail" | "mail-link" | "mail-token";
  }>({
    open: false,
    reference: "",
    token: "",
    two_factor_type: "app",
  });

  const queryString = useMemo(() => {
    const q = new URLSearchParams();
    q.set("app_id", appId);
    if (redirectUrl) q.set("redirect_url", redirectUrl);
    q.set("default", defaultPage);
    return q.toString();
  }, [appId, redirectUrl, defaultPage]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/hosted/auth?${queryString}`, { method: "GET" })
      .then((r) => r.json())
      .then((json: ResponseProp<HostedConfig | null>) => {
        if (cancelled) return;
        if (json?.status && json.data) {
          setConfig(json.data);
          setMessage("");
        } else {
          setMessage(json?.message || "Invalid app configuration");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setMessage("Invalid app configuration");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [queryString]);

  const effectiveRedirectUrl = config?.redirect_url || redirectUrl || "";

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/hosted/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          app_id: appId,
          redirect_url: effectiveRedirectUrl,
          email,
          password,
        }),
      });
      const json = (await res.json()) as ResponseProp<any>;
      if (json?.status) {
        if (json?.data?.two_factor && json?.data?.reference) {
          setTwoFactor((p) => ({
            ...p,
            open: true,
            reference: json.data.reference,
            two_factor_type: json.data.two_factor_type || "app",
          }));
        } else if (json?.data?.redirect) {
          window.location.href = json.data.redirect;
        } else {
          setMessage("Login failed");
        }
      } else {
        setMessage(json?.message || "Login failed");
      }
    } catch {
      setMessage("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const toggle2Auth = () => {
    if (submitting) return;
    setMessage("");
    setTwoFactor((p) => ({ ...p, open: !p.open }));
  };

  const handle2AuthChange = (v: string) => {
    setMessage("");
    setTwoFactor((p) => ({ ...p, token: v }));
    if (v.length === 6) {
      handle2faVerify(v);
    }
  };

  const handle2faVerify = async (otp?: string) => {
    const token = (typeof otp === "string" ? otp : twoFactor.token).trim();
    if (token.length !== 6 || !twoFactor.reference) return;
    if (submitting) return;
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/hosted/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "two_factor_verify",
          app_id: appId,
          redirect_url: effectiveRedirectUrl,
          token,
          reference: twoFactor.reference,
        }),
      });
      const json = (await res.json()) as ResponseProp<any>;
      if (json?.status && json?.data?.redirect) {
        window.location.href = json.data.redirect;
      } else {
        setMessage(json?.message || "Invalid token");
      }
    } catch {
      setMessage("Invalid token");
    } finally {
      setSubmitting(false);
    }
  };

  const title = config?.name || "Swayauth";

  return (
    <main className="flex justify-center items-center min-h-[100svh] p-2 md:p-12">
      <div className="max-w-xl w-full">
        <Link href="/" className="inline-block mb-4 mx-4">
          <span className="inline-block ml-2 text-xl">{title}</span>
        </Link>

        <div className="p-6 md:p-10 shadow-lg border rounded-md">
          <h1 className="text-2xl mb-2 font-bold">Sign in</h1>
          <p className="text-slate-600 mb-6">
            {loading ? "Loading..." : "Enter your account credentials to sign in"}
          </p>

          {message ? (
            <div className="text-red-500 mb-4">
              <small>* {message}</small>
            </div>
          ) : (
            <div className="min-h-[1.2rem] mb-4"></div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label>Email address</label>
              <div className="mt-1">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={!!message}
                  name="email"
                  placeholder="e.g johndoe@email.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label>Password</label>
              <div className="mt-1">
                <Input
                  required
                  invalid={!!message}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  pattern="^(.*).{6,}$"
                  title="Password must be at least 6 character."
                  placeholder="*********"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              disabled={submitting || loading}
              type="submit"
              className="my-2 disabled:bg-blue-500 active:[&:not(:disabled)]:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex mt-2 justify-center">
            <Link
              href={`${CONST.LOCATION.FORGOT_PASSWORD}?email=${encodeURIComponent(
                email
              )}`}
              className="text-blue-700"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>

      <App2factor
        message={message}
        handle2faVerify={handle2faVerify}
        loading={submitting}
        length={6}
        type={twoFactor.two_factor_type}
        onChange={handle2AuthChange}
        isOpen={twoFactor.open}
        toggle={toggle2Auth}
      />
    </main>
  );
};
