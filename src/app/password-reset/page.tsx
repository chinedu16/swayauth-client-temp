"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";
import ModernTemplate from "@/components/hosted/templates/ModernTemplate";
import MinimalTemplate from "@/components/hosted/templates/MinimalTemplate";
import ClassicTemplate from "@/components/hosted/templates/ClassicTemplate";
import Input from "@/components/input";

const PasswordResetPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[100svh]">Loading...</div>}>
      <PasswordResetContent />
    </Suspense>
  );
};

const PasswordResetContent = () => {
  const searchParams = useSearchParams();
  const reset_token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const appId = searchParams.get("app_id") || "";
  const templateParam = (searchParams.get("template") || "minimal") as "classic" | "modern" | "minimal";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    // We need both the token and the client_id (app_id) to proceed
    if (reset_token && appId) {
      setVerified(true);
      setVerifying(false);
    } else {
      setVerifying(false);
    }
  }, [reset_token, appId]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
        return toast.error("Password must be at least 6 characters");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/hosted/auth", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          client_id: appId, 
          reset_token, 
          new_password: password 
        }),
      });
      const json = await res.json();
      if (json.status || json.success) {
        toast.success("Password reset successful. You can now log in.");
        // Redirect to login page
        const q = new URLSearchParams();
        if (appId) q.set("app_id", appId);
        q.set("default", "login");
        q.set("template", templateParam);
        window.location.href = `/oauth?${q.toString()}`;
      } else {
        toast.error(json.message || "Reset failed");
      }
    } catch {
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const template = templateParam || "minimal";
  const TemplateComp = template === "modern" ? ModernTemplate : template === "minimal" ? MinimalTemplate : ClassicTemplate;
  const title = "Swayauth";

  if (verifying) return <div className="flex justify-center items-center min-h-[100svh]">Initializing...</div>;

  return (
    <main className="flex justify-center items-center min-h-[100svh]">
      <TemplateComp title={title} defaultPage="login" navLink={() => "#"}>
        {verified ? (
          <form onSubmit={handleReset}>
            <h1 className="text-2xl mb-2 font-bold">Create new password</h1>
            <p className="text-slate-600 mb-6">Enter your new password for <strong>{email}</strong></p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                autoComplete="new-password"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="*********"
                autoComplete="new-password"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 py-3 rounded-lg text-white disabled:bg-blue-400 active:bg-blue-700 transition-colors"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid Reset Link</h1>
            <p className="text-slate-600">The link is missing required information (token or app_id).</p>
            <button 
                onClick={() => window.location.href = '/oauth'}
                className="mt-6 text-blue-600 hover:underline"
            >
                Back to login
            </button>
          </div>
        )}
      </TemplateComp>
    </main>
  );
};

export default PasswordResetPage;
