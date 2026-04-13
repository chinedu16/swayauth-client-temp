import { CONST } from "@/lib/constant";
import { NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";

const base64url = (buffer: Buffer) => {
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const generatePKCE = () => {
  const verifier = randomBytes(32);
  const challenge = createHash("sha256").update(verifier).digest();
  return {
    code_verifier: base64url(verifier),
    code_challenge: base64url(challenge),
  };
};

type TokenConfig = {
  id?: string;
  name?: string;
  api_key?: string;
  redirect_url?: string;
  origins?: string[];
  two_factor_type?: ("sms" | "app" | "mail")[];
  verify_registration?: boolean;
  verify_registration_type?: "sms" | "mail_link" | "mail_token";
  permissions?: ("read" | "write" | "delete")[];
  scope?: ("manual" | "facebook" | "google" | "two_factor" | "mail" | "sms")[];
  organization_id?: string;
  company_id?: string;
  template?: "classic" | "modern" | "minimal";
};

type UserLoginResponse = {
  access_token?: string;
  refresh_token?: string;
  two_factor_enabled?: boolean;
  reference?: string;
  two_factor_type?: "mail-link" | "mail-token" | "sms" | "app" | "mail";
};

const getApplicationKey = () => {
  return (
    process.env.SWAYAUTH_IDENTITY ||
    process.env.SWAYAUTH_IDENTIFIER ||
    process.env.APPLICATION_KEY ||
    ""
  );
};

const buildRedirectUrl = (
  redirectUrl: string,
  params: Record<string, string>,
) => {
  const url = new URL(redirectUrl);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
};

const isAllowedRedirect = (redirectUrl: string, token: TokenConfig) => {
  const configured = token.redirect_url || "";
  if (configured && redirectUrl === configured) return true;
  try {
    const u = new URL(redirectUrl);
    const origin = u.origin;
    const allowedOrigins = token.origins || [];
    return allowedOrigins.some(
      (o) => redirectUrl.startsWith(o) || origin === o,
    );
  } catch {
    return false;
  }
};

const fetchTokenConfig = async (appId: string): Promise<TokenConfig> => {
  const applicationKey = getApplicationKey();
  if (!applicationKey) {
    throw new Error("MISSING_APPLICATION_KEY");
  }

  const res = await fetch(
    `${CONST.BASE_URL}/client/organizations/tokens/${appId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Application-Key": applicationKey,
        "Swayauth-Identifier": applicationKey,
      },
      cache: "no-store",
    },
  );

  const json = (await res.json()) as ResponseProp<TokenConfig | null>;
  if (!json?.status || !json.data) {
    throw new Error(json?.message || "INVALID_APP_ID");
  }
  return json.data;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("app_id") || "";
    const redirectUrlParam = searchParams.get("redirect_url") || "";
    const templateParam = (searchParams.get("template") || "") as
      | "classic"
      | "modern"
      | "minimal"
      | "";
    const defaultPage = (searchParams.get("default") || "login") as
      | "login"
      | "register";

    if (!appId) {
      return NextResponse.json(
        { status: false, message: "Missing app_id", data: null },
        { status: 400 },
      );
    }

    const token = await fetchTokenConfig(appId);
    const effectiveRedirectUrl = redirectUrlParam || token.redirect_url || "";
    if (!effectiveRedirectUrl) {
      return NextResponse.json(
        { status: false, message: "Missing redirect_url", data: null },
        { status: 400 },
      );
    }
    if (!isAllowedRedirect(effectiveRedirectUrl, token)) {
      return NextResponse.json(
        { status: false, message: "Invalid redirect_url", data: null },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: true,
      message: "Ok",
      data: {
        app_id: token.id || appId,
        name: token.name || "Swayauth",
        redirect_url: effectiveRedirectUrl,
        scope: token.scope || [],
        two_factor_type: token.two_factor_type || [],
        verify_registration: !!token.verify_registration,
        verify_registration_type: token.verify_registration_type || null,
        default: defaultPage,
        template: templateParam || token.template || "classic",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error?.message || "Error", data: null },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      action?: "login" | "two_factor_verify" | "register" | "forgot";
      app_id?: string;
      redirect_url?: string;
      default?: "login" | "register";
      email?: string;
      password?: string;
      token?: string;
      reference?: string;
    };

    const action = body.action || "login";
    const appId = body.app_id || "";
    const redirectUrlParam = body.redirect_url || "";

    if (!appId) {
      return NextResponse.json(
        { status: false, message: "Missing app_id", data: null },
        { status: 400 },
      );
    }

    const token = await fetchTokenConfig(appId);
    const effectiveRedirectUrl = redirectUrlParam || token.redirect_url || "";
    if (!effectiveRedirectUrl) {
      return NextResponse.json(
        { status: false, message: "Missing redirect_url", data: null },
        { status: 400 },
      );
    }
    if (!isAllowedRedirect(effectiveRedirectUrl, token)) {
      return NextResponse.json(
        { status: false, message: "Invalid redirect_url", data: null },
        { status: 400 },
      );
    }

    if (action === "register") {
      const payload = body as any;
      console.log({
        client_id: appId,
          email: payload.email,
          password: payload.password,
          first_name: payload.first_name,
          last_name: payload.last_name,
          phone: payload.phone,
      })
      const registerRes = await fetch(`${CONST.BASE_URL}/oauth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: appId,
          email: payload.email,
          password: payload.password,
          first_name: payload.first_name,
          last_name: payload.last_name,
          phone: payload.phone,
        }),
      });

      const registerJson = (await registerRes.json()) as ResponseProp<{
        reference?: string;
        verification?: boolean;
        verification_type?: "sms" | "mail_link" | "mail_token";
      } | null>;

      console.log('Register payload sent:', {
        client_id: appId,
        email: payload.email,
        password: payload.password,
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
      });
      console.log('Register API response:', registerJson);

      if (!registerJson?.status && !registerJson?.success) {
        return NextResponse.json(
          {
            status: false,
            message: registerJson?.message || registerJson?.error_description || "Register failed",
            data: registerJson, // Include the full backend response
          },
          { status: 400 },
        );
      }

      return NextResponse.json({
        status: true,
        message: registerJson.message || "Registered",
        data: {
          registered: true,
          verification: registerJson.data?.verification ?? true,
          verification_type:
            registerJson.data?.verification_type || "mail_token",
          reference: registerJson.data?.reference || "",
          user_id: registerJson.user_id || registerJson.data?.user_id,
        },
      });
    }
    if (action === "forgot") {
      const email = (body.email || "").trim();
      if (!email) {
        return NextResponse.json(
          { status: false, message: "Missing email", data: null },
          { status: 400 },
        );
      }
      const forgotRes = await fetch(
        `${CONST.BASE_URL}/oauth/password-reset/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, client_id: appId }),
        },
      );
      const forgotJson = (await forgotRes.json()) as ResponseProp<{
        verification_method?: "mail_link" | "mail_token" | "sms";
        reference?: string;
      } | null>;
      if (!forgotJson?.status) {
        return NextResponse.json(
          {
            status: false,
            message: forgotJson?.message || "Request failed",
            data: null,
          },
          { status: 400 },
        );
      }
      return NextResponse.json({
        status: true,
        message: forgotJson.message || "Ok",
        data: {
          verification_method:
            forgotJson.data?.verification_method || "mail_link",
          reference: forgotJson.data?.reference || "",
        },
      });
    }

    if (action === "two_factor_verify") {
      const otp = (body.token || "").trim();
      const reference = (body.reference || "").trim();
      if (!otp || !reference) {
        return NextResponse.json(
          { status: false, message: "Missing token/reference", data: null },
          { status: 400 },
        );
      }

      const verifyRes = await fetch(`${CONST.BASE_URL}/auth/2fa/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: otp, reference }),
      });

      const verifyJson =
        (await verifyRes.json()) as ResponseProp<UserLoginResponse | null>;
      if (!verifyJson?.status || !verifyJson.data?.access_token) {
        return NextResponse.json(
          {
            status: false,
            message: verifyJson?.message || "Invalid token",
            data: null,
          },
          { status: 400 },
        );
      }

      const redirect = buildRedirectUrl(effectiveRedirectUrl, {
        intent: "login",
        status: "true",
        access_token: verifyJson.data.access_token,
      });

      return NextResponse.json({
        status: true,
        message: "Ok",
        data: { redirect },
      });
    }

    const email = (body.email || "").trim();
    const password = body.password || "";
    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: "Missing email/password", data: null },
        { status: 400 },
      );
    }

    const { code_verifier, code_challenge } = generatePKCE();

    console.log({
      client_id: appId,
      redirect_uri: effectiveRedirectUrl,
      code_challenge,
      code_challenge_method: "S256",
      email,
      password,
    });
    const authorizeRes = await fetch(`${CONST.BASE_URL}/oauth/authorize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        client_id: appId,
        redirect_uri: effectiveRedirectUrl,
        code_challenge,
        code_challenge_method: "S256",
        email,
        password,
      }),
    });

    const authorizeJson = (await authorizeRes.json()) as ResponseProp<{
      code?: string;
      state?: string;
      two_factor?: boolean;
      reference?: string;
      two_factor_type?: string;
    } | null>;
    if (!authorizeJson?.status || !authorizeJson.data) {
      return NextResponse.json(
        {
          status: false,
          message: authorizeJson?.message || "Login failed",
          data: null,
        },
        { status: 400 },
      );
    }

    if (authorizeJson.data.two_factor && authorizeJson.data.reference) {
      return NextResponse.json({
        status: true,
        message: "Two-factor required",
        data: {
          two_factor: true,
          reference: authorizeJson.data.reference,
          two_factor_type: authorizeJson.data.two_factor_type || "app",
        },
      });
    }

    if (!authorizeJson.data.code) {
      return NextResponse.json(
        { status: false, message: "Login failed", data: null },
        { status: 400 },
      );
    }

    // Exchange code for tokens
    const tokenRes = await fetch(`${CONST.BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: appId,
        redirect_uri: effectiveRedirectUrl,
        code: authorizeJson.data.code,
        code_verifier,
      }),
    });

    const tokenJson = (await tokenRes.json()) as ResponseProp<{
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      scope?: string;
    } | null>;
    if (!tokenJson?.status || !tokenJson.data?.access_token) {
      return NextResponse.json(
        { status: false, message: "Token exchange failed", data: null },
        { status: 400 },
      );
    }

    const redirect = buildRedirectUrl(effectiveRedirectUrl, {
      intent: "login",
      status: "true",
      access_token: tokenJson.data.access_token,
    });

    return NextResponse.json({
      status: true,
      message: "Ok",
      data: { redirect },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error?.message || "Error", data: null },
      { status: 500 },
    );
  }
}
