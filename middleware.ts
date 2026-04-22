import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasCookie(req: NextRequest, name: string) {
  return Boolean(req.cookies.get(name)?.value);
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Allow public design preview (no auth / no payment).
  if (pathname.startsWith("/success/preview")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/dashboard/preview")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin/preview")) {
    return NextResponse.next();
  }

  const isLoggedIn = hasCookie(req, "rh_session");
  const hasPlan = hasCookie(req, "rh_plan");
  const isPaid = hasCookie(req, "rh_paid");
  const role = req.cookies.get("rh_role")?.value ?? "user";
  const isAdmin = role === "admin";
  const plan = req.cookies.get("rh_plan")?.value ?? "";
  const paymentStatus = req.cookies.get("rh_payment_status")?.value ?? "none";
  const signalsRequestStatus = req.cookies.get("rh_signals_request_status")?.value ?? "none";
  const selective = req.cookies.get("rh_selective_access")?.value ?? "";

  const requiresLogin =
    pathname.startsWith("/plans") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/signals-dashboard") ||
    pathname.startsWith("/success") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profile");

  if (requiresLogin && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Admins bypass plan / payment / dashboard-silo restrictions (full product access).
  if (isAdmin) return NextResponse.next();

  if (pathname.startsWith("/payment")) {
    if (!pathname.startsWith("/payment/status") && !hasPlan) {
      const url = req.nextUrl.clone();
      url.pathname = "/plans";
      return NextResponse.redirect(url);
    }
  }

  function redirectPaymentStatus() {
    const url = req.nextUrl.clone();
    url.pathname = "/payment/status";
    url.searchParams.delete("plan");
    return NextResponse.redirect(url);
  }

  // Manual payment pending or rejected: keep user off paid dashboards until resolved.
  if (pathname.startsWith("/dashboard")) {
    const hasSelective = selective === "basic" || selective === "premium" || selective === "signals";
    const isSelectiveDashboard =
      (selective === "basic" && pathname.startsWith("/dashboard/basic")) ||
      (selective === "premium" && pathname.startsWith("/dashboard/premium")) ||
      (selective === "signals" && pathname.startsWith("/dashboard/signals"));

    if (!hasPlan || !isPaid) {
      // Selective access can bypass payment for a specific dashboard only.
      if (hasSelective && isSelectiveDashboard) {
        return NextResponse.next();
      }
      if (
        (paymentStatus === "pending" || paymentStatus === "rejected") &&
        hasPlan &&
        !isPaid
      ) {
        return redirectPaymentStatus();
      }
      const url = req.nextUrl.clone();
      url.pathname = "/plans";
      return NextResponse.redirect(url);
    }

    const correct = `/dashboard/${plan || "basic"}`;
    if (
      pathname === "/dashboard" ||
      pathname === "/dashboard/" ||
      (!pathname.startsWith(correct) && pathname.startsWith("/dashboard/"))
    ) {
      const url = req.nextUrl.clone();
      url.pathname = correct;
      return NextResponse.redirect(url);
    }
  }

  // Signals dashboard is unlocked by admin approval of `signalsRequests`.
  if (pathname.startsWith("/signals-dashboard")) {
    // Allow paid Signals plan users even if signalsRequestStatus cookie is missing/stale.
    if (!(isPaid && plan === "signals") && signalsRequestStatus !== "approved" && selective !== "signals") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/signals";
      return NextResponse.redirect(url);
    }
  }

  // Success page is only for instant-paid flow.
  if (pathname.startsWith("/success")) {
    if (!hasPlan || !isPaid) {
      if (
        (paymentStatus === "pending" || paymentStatus === "rejected") &&
        hasPlan &&
        !isPaid
      ) {
        return redirectPaymentStatus();
      }
      const url = req.nextUrl.clone();
      url.pathname = "/plans";
      if (hasPlan && !isPaid) url.searchParams.set("plan", searchParams.get("plan") ?? "");
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/plans";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/plans/:path*",
    "/payment/:path*",
    "/dashboard/:path*",
    "/success/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/signals-dashboard",
    "/signals-dashboard/:path*",
  ],
};
