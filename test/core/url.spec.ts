import URLShortner from "../../src/core/urlShortner.core";
import NotUniqueStrategy from "../utils/mockStrategy";

describe("URL Shortner core strategy", () => {
  test("should return a valid shortned URL", () => {
    const strategy = new NotUniqueStrategy();
    const urlShortner = new URLShortner(strategy);
    const urlMapping = urlShortner.process("https://google.com");

    expect(urlMapping).toMatchObject({
      from: "https://google.com",
      to: "1",
    });
  });
});
