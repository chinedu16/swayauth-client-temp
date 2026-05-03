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
  const verifierBuffer = randomBytes(32);
  const verifier = base64url(verifierBuffer);
  // PKCE spec requires hashing the ASCII string representation of the verifier
  const challenge = createHash("sha256").update(verifier).digest();
  return {
    code_verifier: verifier,
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

    const verifyToken = searchParams.get("token") || "";
    const verifyReference = searchParams.get("reference") || "";

    if (verifyToken && verifyReference) {
      const verifyRes = await fetch(
        `${CONST.BASE_URL}/auth/token/verify?token=${verifyToken}&reference=${verifyReference}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const verifyJson = await verifyRes.json();
      return NextResponse.json(verifyJson, { status: verifyRes.status });
    }

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

      if (!(registerJson as any)?.status && !(registerJson as any)?.success) {
        return NextResponse.json(
          {
            status: false,
            message: (registerJson as any)?.message || (registerJson as any)?.error_description || "Register failed",
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
          user_id: (registerJson as any).user_id || (registerJson as any).data?.user_id,
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
      console.log("Forgot password payload:", { email, client_id: appId });
      // Using standard OAuth password reset request flow
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
      const forgotText = await forgotRes.text();
      console.log("Forgot password raw response:", forgotText);
      let forgotJson: any;
      try {
        forgotJson = JSON.parse(forgotText);
      } catch (e) {
        console.error("Failed to parse forgot password response as JSON:", e);
        return NextResponse.json(
          { status: false, message: "Invalid response from reset server", data: null },
          { status: 500 }
        );
      }
      if (!forgotJson?.status && !forgotJson?.success) {
        return NextResponse.json(
          {
            status: false,
            message: forgotJson?.message || "Request failed",
            data: forgotJson,
          },
          { status: 400 },
        );
      }
      return NextResponse.json({
        status: true,
        message: forgotJson.message || "Ok",
        data: forgotJson.data,
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
        (await verifyRes.json()) as any;
      if (!verifyJson?.status && !verifyJson?.success || (!verifyJson.data?.access_token && !verifyJson.access_token)) {
        return NextResponse.json(
          {
            status: false,
            message: verifyJson?.message || "Invalid token",
            data: null,
          },
          { status: 400 },
        );
      }

      const access_token = verifyJson.data?.access_token || verifyJson.access_token;

      const redirect = buildRedirectUrl(effectiveRedirectUrl, {
        intent: "login",
        status: "true",
        access_token,
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

    console.log("Authorize payload:", {
      client_id: appId,
      redirect_uri: effectiveRedirectUrl,
      code_challenge,
      code_challenge_method: "S256",
      email,
      password,
    });

    // We use redirect: "manual" because the authorize endpoint returns a 302 Found
    // which fetch would otherwise follow, potentially leading to HTML pages (like Google Drive)
    // that cause JSON parsing errors.
    const authorizeRes = await fetch(`${CONST.BASE_URL}/oauth/authorize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      redirect: "manual",
      body: JSON.stringify({
        client_id: appId,
        redirect_uri: effectiveRedirectUrl,
        code_challenge,
        code_challenge_method: "S256",
        email,
        password,
      }),
    });

    let authorizeData: {
      code?: string;
      state?: string;
      two_factor?: boolean;
      reference?: string;
      two_factor_type?: string;
      message?: string;
      status?: boolean;
    } = {};

    // Handle 302 Redirect
    if (authorizeRes.status === 302 || authorizeRes.status === 301) {
      const location = authorizeRes.headers.get("location");
      console.log("Authorize redirect location:", location);
      
      if (location) {
        try {
          const url = new URL(location);
          const code = url.searchParams.get("code");
          const error = url.searchParams.get("error");
          const error_description = url.searchParams.get("error_description");
          
          if (code) {
            authorizeData = { code, status: true };
          } else if (error) {
            return NextResponse.json(
              {
                status: false,
                message: error_description || error || "Login failed",
                data: null,
              },
              { status: 400 },
            );
          }
        } catch (e) {
          console.error("Failed to parse redirect URL:", e);
        }
      }
    } else {
      // If it's not a redirect, try parsing as JSON (for cases where it returns JSON)
      const authorizeText = await authorizeRes.text();
      console.log("Authorize raw response:", authorizeText);
      try {
        const json = JSON.parse(authorizeText);
        authorizeData = {
          ...json.data,
          status: json.status,
          message: json.message
        };
      } catch (e) {
        console.error("Failed to parse authorize response as JSON:", e);
        return NextResponse.json(
          { status: false, message: "Invalid response from authorization server", data: null },
          { status: 500 }
        );
      }
    }

    if (!authorizeData.code && !authorizeData.two_factor) {
      return NextResponse.json(
        {
          status: false,
          message: authorizeData.message || "Login failed",
          data: null,
        },
        { status: 400 },
      );
    }

    if (authorizeData.two_factor && authorizeData.reference) {
      return NextResponse.json({
        status: true,
        message: "Two-factor required",
        data: {
          two_factor: true,
          reference: authorizeData.reference,
          two_factor_type: authorizeData.two_factor_type || "app",
        },
      });
    }

    if (!authorizeData.code) {
      return NextResponse.json(
        { status: false, message: "Login failed", data: null },
        { status: 400 },
      );
    }

    // Exchange code for tokens
    console.log("Token exchange payload:", {
      grant_type: "authorization_code",
      client_id: appId,
      redirect_uri: effectiveRedirectUrl,
      code: authorizeData.code,
      code_verifier,
    });

    const tokenRes = await fetch(`${CONST.BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: appId,
        redirect_uri: effectiveRedirectUrl,
        code: authorizeData.code,
        code_verifier,
      }),
    });

    const tokenText = await tokenRes.text();
    console.log("Token raw response:", tokenText);
    let tokenJson: any;
    try {
      tokenJson = JSON.parse(tokenText);
    } catch (e) {
      console.error("Failed to parse token response as JSON:", e);
      return NextResponse.json(
        { status: false, message: "Invalid response during token exchange", data: null },
        { status: 500 }
      );
    }

    const access_token = tokenJson?.access_token || tokenJson?.data?.access_token;

    if (!access_token) {
      console.log("Token exchange failed (no access_token):", tokenJson);
      return NextResponse.json(
        { 
          status: false, 
          message: tokenJson?.message || tokenJson?.error_description || tokenJson?.error || "Token exchange failed", 
          data: tokenJson 
        },
        { status: 400 },
      );
    }

    const redirect = buildRedirectUrl(effectiveRedirectUrl, {
      intent: "login",
      status: "true",
      access_token: access_token,
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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { token, reference } = body;

    if (!token || !reference) {
      return NextResponse.json(
        { status: false, message: "Missing token or reference", data: null },
        { status: 400 },
      );
    }

    const res = await fetch(`${CONST.BASE_URL}/auth/register/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, reference }),
    });

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error?.message || "Error", data: null },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, client_id, reset_token, new_password } = body;

    if (!email || !client_id || !reset_token || !new_password) {
      return NextResponse.json(
        {
          status: false,
          message: "Missing required fields (email, client_id, reset_token, new_password)",
          data: null,
        },
        { status: 400 },
      );
    }

    console.log("Password reset payload:", {
      email,
      client_id,
      reset_token,
      new_password,
    });

    const res = await fetch(
      `${CONST.BASE_URL}/oauth/password-reset/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, client_id, reset_token, new_password }),
      },
    );

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error?.message || "Error", data: null },
      { status: 500 },
    );
  }
}
