
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/profile")) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      if (!req.nextUrl.pathname.endsWith(req.nextauth.token.username)) {
        return NextResponse.redirect(new URL('/profile/' + req.nextauth.token.username, req.url))
      }
    }
    if (req.nextUrl.pathname.startsWith("/admin/signin")) {
      if (req.nextauth.token && req.nextauth.token.role === "admin") {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!req.nextauth.token || req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/admin/signin', req.url))
      }
    }
    if (req.nextUrl.pathname.includes("/restaurant/createOrUpdate") || req.nextUrl.pathname.includes("/event/createOrUpdate") || req.nextUrl.pathname.includes("/product/createOrUpdate") ||
    req.nextUrl.pathname.includes("/productcustomization/createOrUpdate") || req.nextUrl.pathname.includes("/productcustomizationchoice/createOrUpdate") || req.nextUrl.pathname.includes("/productoption/createOrUpdate") 
    || req.nextUrl.pathname.includes("/productoptionchoice/createOrUpdate") || req.nextUrl.pathname.includes("/subtype/createOrUpdate") || req.nextUrl.pathname.includes("/subtypeproduct/createOrUpdate") || req.nextUrl.pathname.includes("/type/createOrUpdate")) {
      if (req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // dưới này là check có token không, có token thì chạy trong code,ko là bắt đăng nhập
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return true
        }

        // else if (req.nextUrl.pathname.startsWith("/profile")) {
        //   return true
        // }
      } 
    },
  }
)

export const config = { matcher: ["/admin/:path*", "/api/restaurant/createOrUpdate", "/api/event/createOrUpdate", "/api/product/createOrUpdate", "/api/productcustomization/createOrUpdate", "/api/productcustomizationchoice/createOrUpdate", "/api/productoption/createOrUpdate", "/api/productoptionchoice/createOrUpdate", "/api/subtype/createOrUpdate", "/api/subtypeproduct/createOrUpdate", "/api/type/createOrUpdate"] }
