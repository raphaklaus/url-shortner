export function extractCode(url: string): string {
  const parsedURL = new URL(url);
  console.log(parsedURL);
  return parsedURL.pathname.replace(/^\//, "");
}
