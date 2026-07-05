/**
 * Creates a full API URL by appending the path to the base API URL.
 * Handles client-side and server-side environments.
 *
 * On the server, it prefers 127.0.0.1 to avoid potential DNS/network issues
 * with 'localhost' in server-to-server requests.
 */
export function apiUrl(path: string): string {
  const isServer = typeof window === "undefined";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const finalBaseUrl = isServer
    ? baseUrl.replace("localhost", "127.0.0.1")
    : baseUrl;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${finalBaseUrl.replace(/\/+$/, "")}${normalizedPath}`;
}
