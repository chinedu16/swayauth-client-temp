import { CONST } from "@/lib/constant";
import { isGoodToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

const auth_redirects = [CONST.LOCATION.LOGIN, CONST.LOCATION.FORGOT_PASSWORD, CONST.LOCATION.REGISTER]
const auth_pages = [CONST.LOCATION.CLIENT_AREA]

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(CONST.ACCESS_TOKEN)?.value ?? '';
  const status = isGoodToken(token)
  const pathname = req.nextUrl?.pathname ?? ''
  const url = req.nextUrl?.clone()
  if (auth_redirects.some(link => pathname.includes(link)) && status) {
    url.pathname = CONST.LOCATION.CLIENT_AREA
    return NextResponse.redirect(url)
  }
  if (auth_pages.some(link => pathname.includes(link))) {
    if (!status) {
      url.pathname = CONST.LOCATION.LOGIN
      return NextResponse.redirect(url)
    }
  }
}