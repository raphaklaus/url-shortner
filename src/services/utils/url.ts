export function extractCode(url: string): string {
  const parsedURL = new URL(url);
  return parsedURL.pathname.replace(/^\//, "");
}

export function buildURL(baseDomain: string, code: string): string {
  return `https://${baseDomain}/${code}`;
}
