import AlphanumericStrategy from "../../src/core/alpha.strategy";
import URLShortner from "../../src/core/urlShortner.core";

describe("URL Shortner", () => {
  test("should return a valid shortned URL", () => {
    const strategy = new AlphanumericStrategy("tier.app");
    const urlShortner = new URLShortner(strategy);
    const url = urlShortner.process("https://google.com");
    const parsedUrl = new URL(url.to);

    expect(parsedUrl).toMatchObject({
      protocol: "https:",
      host: "tier.app",
    });

    expect(parsedUrl.pathname.length).toBeGreaterThan(1);
  });
});
