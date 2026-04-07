"use client";

import Input from "@/components/input";
import App2factor from "@/components/onboarding/app2factor";
import { CONST } from "@/lib/constant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import ClassicTemplate from "@/components/hosted/templates/ClassicTemplate";
import ModernTemplate from "@/components/hosted/templates/ModernTemplate";
import MinimalTemplate from "@/components/hosted/templates/MinimalTemplate";

type HostedConfig = {
  app_id: string;
  name: string;
  redirect_url: string;
  scope: string[];
  two_factor_type: string[];
  verify_registration: boolean;
  verify_registration_type: string | null;
  default: "login" | "register";
  template: "classic" | "modern" | "minimal";
};

const OAuthHosted = () => {
  const searchParams = useSearchParams();
  const appId = searchParams.get("app_id") || "";
  const redirectUrl = searchParams.get("redirect_url") || "";
  const defaultPage = (searchParams.get("default") || "login") as
    | "login"
    | "register"
    | "forgot";
  const templateParam = (searchParams.get("template") ||
    "classic") as HostedConfig["template"];

  return (
    <HostedAuth
      appId={appId}
      redirectUrl={redirectUrl}
      defaultPage={defaultPage}
      templateParam={templateParam}
    />
  );
};

const HostedAuth = ({
  appId,
  redirectUrl,
  defaultPage,
  templateParam,
}: {
  appId: string;
  redirectUrl: string;
  defaultPage: "login" | "register" | "forgot";
  templateParam: HostedConfig["template"];
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
    if (templateParam) q.set("template", templateParam);
    return q.toString();
  }, [appId, redirectUrl, defaultPage, templateParam]);

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
  const template = templateParam || config?.template || "minimal";
  const title = config?.name || "Swayauth";

  const navLink = (target: "login" | "register") => {
    const q = new URLSearchParams();
    q.set("app_id", appId);
    if (redirectUrl) q.set("redirect_url", redirectUrl);
    q.set("default", target);
    if (templateParam) q.set("template", templateParam);
    return `/oauth?${q.toString()}`;
  };
  const forgotHref = () => {
    const q = new URLSearchParams();
    q.set("app_id", appId);
    if (redirectUrl) q.set("redirect_url", redirectUrl);
    q.set("default", "forgot");
    if (templateParam) q.set("template", templateParam);
    return `/oauth?${q.toString()}`;
  };

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

  const templatePage: "login" | "register" = defaultPage === "register" ? "register" : "login";
  const AuthTemplate = () => {
    if (template === "modern") {
      return (
        <ModernTemplate title={title} defaultPage={templatePage} navLink={navLink}>
          {defaultPage === "register" ? (
            <>
              <h1 className="text-2xl mb-2 font-bold">Create an account</h1>
              <p className="text-slate-600 mb-6">
                {loading ? "Loading..." : "Fill in the details to register"}
              </p>
              {message ? (
                <div className="text-red-500 mb-4">
                  <small>* {message}</small>
                </div>
              ) : (
                <div className="min-h-[1.2rem] mb-4"></div>
              )}
              <RegisterForm
                submitting={submitting}
                appId={appId}
                redirectUrl={effectiveRedirectUrl}
                setMessage={setMessage}
                setSubmitting={setSubmitting}
              />
            </>
          ) : defaultPage === "login" ? (
            <>
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
                <a href={forgotHref()} className="text-blue-700">Forgot your password?</a>
              </div>
            </>
          ) : null}
          {defaultPage === "forgot" ? (
            <>
              <h1 className="text-2xl mb-2 font-bold">Reset your password</h1>
              <p className="text-slate-600 mb-6">
                {loading ? "Loading..." : "Enter your email to receive a reset link"}
              </p>
              {message ? (
                <div className="text-red-500 mb-4">
                  <small>* {message}</small>
                </div>
              ) : (
                <div className="min-h-[1.2rem] mb-4"></div>
              )}
              <ForgotForm
                submitting={submitting}
                appId={appId}
                redirectUrl={effectiveRedirectUrl}
                setMessage={setMessage}
                setSubmitting={setSubmitting}
              />
            </>
          ) : null}
        </ModernTemplate>
      );
    }
    if (template === "minimal") {
      return (
        <MinimalTemplate title={title} defaultPage={templatePage} navLink={navLink}>
          {defaultPage === "register" ? (
            <>
              <h1 className="text-2xl mb-2 font-bold">Create an account</h1>
              <p className="text-slate-600 mb-6">
                {loading ? "Loading..." : "Fill in the details to register"}
              </p>
              {message ? (
                <div className="text-red-500 mb-4">
                  <small>* {message}</small>
                </div>
              ) : (
                <div className="min-h-[1.2rem] mb-4"></div>
              )}
              <RegisterForm
                submitting={submitting}
                appId={appId}
                redirectUrl={effectiveRedirectUrl}
                setMessage={setMessage}
                setSubmitting={setSubmitting}
              />
            </>
          ) : defaultPage === "login" ? (
            <>
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
                <a href={forgotHref()} className="text-blue-700">Forgot your password?</a>
              </div>
            </>
          ) : null}
          {defaultPage === "forgot" ? (
            <>
              <h1 className="text-2xl mb-2 font-bold">Reset your password</h1>
              <p className="text-slate-600 mb-6">
                {loading ? "Loading..." : "Enter your email to receive a reset link"}
              </p>
              {message ? (
                <div className="text-red-500 mb-4">
                  <small>* {message}</small>
                </div>
              ) : (
                <div className="min-h-[1.2rem] mb-4"></div>
              )}
              <ForgotForm
                submitting={submitting}
                appId={appId}
                redirectUrl={effectiveRedirectUrl}
                setMessage={setMessage}
                setSubmitting={setSubmitting}
              />
            </>
          ) : null}
        </MinimalTemplate>
      );
    }
    return (
      <ClassicTemplate title={title} defaultPage={templatePage} navLink={navLink}>
        {defaultPage === "register" ? (
          <>
            <h1 className="text-2xl mb-2 font-bold">Create an account</h1>
            <p className="text-slate-600 mb-6">
              {loading ? "Loading..." : "Fill in the details to register"}
            </p>
            {message ? (
              <div className="text-red-500 mb-4">
                <small>* {message}</small>
              </div>
            ) : (
              <div className="min-h-[1.2rem] mb-4"></div>
            )}
            <RegisterForm
              submitting={submitting}
              appId={appId}
              redirectUrl={effectiveRedirectUrl}
              setMessage={setMessage}
              setSubmitting={setSubmitting}
            />
          </>
        ) : defaultPage === "login" ? (
          <>
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
              <a href={forgotHref()} className="text-blue-700">Forgot your password?</a>
            </div>
          </>
        ) : null}
        {defaultPage === "forgot" ? (
          <>
            <h1 className="text-2xl mb-2 font-bold">Reset your password</h1>
            <p className="text-slate-600 mb-6">
              {loading ? "Loading..." : "Enter your email to receive a reset link"}
            </p>
            {message ? (
              <div className="text-red-500 mb-4">
                <small>* {message}</small>
              </div>
            ) : (
              <div className="min-h-[1.2rem] mb-4"></div>
            )}
            <ForgotForm
              submitting={submitting}
              appId={appId}
              redirectUrl={effectiveRedirectUrl}
              setMessage={setMessage}
              setSubmitting={setSubmitting}
            />
          </>
        ) : null}
      </ClassicTemplate>
    );
  };
  return (
    <main className="flex justify-center items-center min-h-[100svh]">
      <AuthTemplate />
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

export default OAuthHosted;

const RegisterForm = ({
  submitting,
  appId,
  redirectUrl,
  setMessage,
  setSubmitting,
}: {
  submitting: boolean;
  appId: string;
  redirectUrl: string;
  setMessage: (v: string) => void;
  setSubmitting: (v: boolean) => void;
}) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/hosted/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          app_id: appId,
          redirect_url: redirectUrl,
          first_name,
          last_name,
          email,
          password,
        }),
      });
      const json = (await res.json()) as ResponseProp<any>;
      if (json?.status) {
        setMessage("Registration successful. Please check your email or phone to verify your account.");
      } else {
        setMessage(json?.message || "Registration failed");
      }
    } catch {
      setMessage("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label>First name</label>
        <div className="mt-1">
          <Input
            type="text"
            required
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            name="first_name"
            placeholder="e.g John"
            autoComplete="given-name"
          />
        </div>
      </div>
      <div className="mb-4">
        <label>Last name</label>
        <div className="mt-1">
          <Input
            type="text"
            required
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            name="last_name"
            placeholder="e.g Doe"
            autoComplete="family-name"
          />
        </div>
      </div>
      <div className="mb-4">
        <label>Email address</label>
        <div className="mt-1">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            pattern="^(.*).{6,}$"
            title="Password must be at least 6 character."
            placeholder="*********"
            autoComplete="new-password"
          />
        </div>
      </div>

      <button
        disabled={submitting}
        type="submit"
        className="my-2 disabled:bg-blue-500 active:[&:not(:disabled)]:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white"
      >
        {submitting ? "Creating..." : "Create account"}
      </button>
    </form>
  );
};

const ForgotForm = ({
  submitting,
  appId,
  redirectUrl,
  setMessage,
  setSubmitting,
}: {
  submitting: boolean;
  appId: string;
  redirectUrl: string;
  setMessage: (v: string) => void;
  setSubmitting: (v: boolean) => void;
}) => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/hosted/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "forgot",
          app_id: appId,
          redirect_url: redirectUrl,
          email,
        }),
      });
      const json = (await res.json()) as ResponseProp<any>;
      if (json?.status) {
        setMessage("Request sent. Please check your email or phone to complete password reset.");
      } else {
        setMessage(json?.message || "Request failed");
      }
    } catch {
      setMessage("Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label>Email address</label>
        <div className="mt-1">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="e.g johndoe@email.com"
            autoComplete="email"
          />
        </div>
      </div>
      <button
        disabled={submitting}
        type="submit"
        className="my-2 disabled:bg-blue-500 active:[&:not(:disabled)]:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white"
      >
        {submitting ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
};
