import { CONST } from "@/lib/constant";
import { NextResponse } from "next/server";

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
  params: Record<string, string>
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
    return allowedOrigins.some((o) => redirectUrl.startsWith(o) || origin === o);
  } catch {
    return false;
  }
};

const fetchTokenConfig = async (appId: string): Promise<TokenConfig> => {
  const applicationKey = getApplicationKey();
  if (!applicationKey) {
    throw new Error("MISSING_APPLICATION_KEY");
  }

  const res = await fetch(`${CONST.BASE_URL}/client/organizations/tokens/${appId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Application-Key": applicationKey,
      "Swayauth-Identifier": applicationKey,
    },
    cache: "no-store",
  });

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
        { status: 400 }
      );
    }

    const token = await fetchTokenConfig(appId);
    const effectiveRedirectUrl = redirectUrlParam || token.redirect_url || "";
    if (!effectiveRedirectUrl) {
      return NextResponse.json(
        { status: false, message: "Missing redirect_url", data: null },
        { status: 400 }
      );
    }
    if (!isAllowedRedirect(effectiveRedirectUrl, token)) {
      return NextResponse.json(
        { status: false, message: "Invalid redirect_url", data: null },
        { status: 400 }
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
      { status: 500 }
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
        { status: 400 }
      );
    }

    const token = await fetchTokenConfig(appId);
    const effectiveRedirectUrl = redirectUrlParam || token.redirect_url || "";
    if (!effectiveRedirectUrl) {
      return NextResponse.json(
        { status: false, message: "Missing redirect_url", data: null },
        { status: 400 }
      );
    }
    if (!isAllowedRedirect(effectiveRedirectUrl, token)) {
      return NextResponse.json(
        { status: false, message: "Invalid redirect_url", data: null },
        { status: 400 }
      );
    }

    const orgSecret = token.api_key || "";
    if (!orgSecret) {
      return NextResponse.json(
        { status: false, message: "Invalid app configuration", data: null },
        { status: 400 }
      );
    }

    if (action === "register") {
      const payload = body as any;
      const registerRes = await fetch(`${CONST.BASE_URL}/auth/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Organization-Secret": orgSecret,
        },
        body: JSON.stringify({
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password,
          phone: payload.phone,
          address: payload.address,
          city: payload.city,
          state: payload.state,
          country: payload.country,
          photo: payload.photo,
        }),
      });

      const registerJson = (await registerRes.json()) as ResponseProp<{
        reference?: string;
        verification?: boolean;
        verification_type?: "sms" | "mail_link" | "mail_token";
      } | null>;

      if (!registerJson?.status) {
        return NextResponse.json(
          { status: false, message: registerJson?.message || "Register failed", data: null },
          { status: 400 }
        );
      }

      return NextResponse.json({
        status: true,
        message: registerJson.message || "Registered",
        data: {
          registered: true,
          verification: registerJson.data?.verification ?? true,
          verification_type: registerJson.data?.verification_type || "mail_token",
          reference: registerJson.data?.reference || "",
        },
      });
    }
    if (action === "forgot") {
      const email = (body.email || "").trim();
      if (!email) {
        return NextResponse.json(
          { status: false, message: "Missing email", data: null },
          { status: 400 }
        );
      }
      const forgotRes = await fetch(`${CONST.BASE_URL}/auth/forgot-password/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Organization-Secret": orgSecret,
        },
        body: JSON.stringify({ email }),
      });
      const forgotJson = (await forgotRes.json()) as ResponseProp<{
        verification_method?: "mail_link" | "mail_token" | "sms";
        reference?: string;
      } | null>;
      if (!forgotJson?.status) {
        return NextResponse.json(
          { status: false, message: forgotJson?.message || "Request failed", data: null },
          { status: 400 }
        );
      }
      return NextResponse.json({
        status: true,
        message: forgotJson.message || "Ok",
        data: {
          verification_method: forgotJson.data?.verification_method || "mail_link",
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
          { status: 400 }
        );
      }

      const verifyRes = await fetch(`${CONST.BASE_URL}/auth/2fa/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Organization-Secret": orgSecret,
        },
        body: JSON.stringify({ token: otp, reference }),
      });

      const verifyJson = (await verifyRes.json()) as ResponseProp<UserLoginResponse | null>;
      if (!verifyJson?.status || !verifyJson.data?.access_token) {
        return NextResponse.json(
          { status: false, message: verifyJson?.message || "Invalid token", data: null },
          { status: 400 }
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
        { status: 400 }
      );
    }

    const loginRes = await fetch(`${CONST.BASE_URL}/auth/login/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Organization-Secret": orgSecret,
      },
      body: JSON.stringify({ email, password }),
    });

    const loginJson = (await loginRes.json()) as ResponseProp<UserLoginResponse | null>;
    if (!loginJson?.status || !loginJson.data) {
      return NextResponse.json(
        { status: false, message: loginJson?.message || "Login failed", data: null },
        { status: 400 }
      );
    }

    if (loginJson.data.two_factor_enabled && loginJson.data.reference) {
      return NextResponse.json({
        status: true,
        message: "Two-factor required",
        data: {
          two_factor: true,
          reference: loginJson.data.reference,
          two_factor_type: loginJson.data.two_factor_type || "app",
        },
      });
    }

    if (!loginJson.data.access_token) {
      return NextResponse.json(
        { status: false, message: "Login failed", data: null },
        { status: 400 }
      );
    }

    const redirect = buildRedirectUrl(effectiveRedirectUrl, {
      intent: "login",
      status: "true",
      access_token: loginJson.data.access_token,
    });

    return NextResponse.json({
      status: true,
      message: "Ok",
      data: { redirect },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error?.message || "Error", data: null },
      { status: 500 }
    );
  }
}
