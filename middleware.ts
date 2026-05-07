export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/new-order/:path*", "/ai-tools/:path*", "/settings/:path*"]
};
