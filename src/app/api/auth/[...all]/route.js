import { toNextJsHandler } from "better-auth/next-js";

export async function GET(req) {
  const { auth } = await import("@/lib/auth");
  const handler = toNextJsHandler(auth);
  return handler.GET(req);
}

export async function POST(req) {
  const { auth } = await import("@/lib/auth");
  const handler = toNextJsHandler(auth);
  return handler.POST(req);
}
