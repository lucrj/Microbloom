/**
 * Returns the configured API base URL.
 * On the server, it replaces localhost with 127.0.0.1.
 */
export function getApiBaseUrl(): string {
  const isServer = typeof window === "undefined";

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  return isServer
    ? baseUrl.replace("localhost", "127.0.0.1")
    : baseUrl;
}

/**
 * Creates a full API URL by appending the path to the base API URL.
 */
export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getApiBaseUrl().replace(/\/+$/, "")}${normalizedPath}`;
}