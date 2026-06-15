const DEV_API_BASE_URL = "http://localhost:4000";

export function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const baseUrl =
    configuredUrl ||
    (process.env.NODE_ENV === "development" ? DEV_API_BASE_URL : "");

  if (!baseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Set it to your deployed backend URL."
    );
  }

  return baseUrl.replace(/\/+$/, "");
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
