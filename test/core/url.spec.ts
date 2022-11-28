import URLShortner from "../../src/core/url-shortner";
import { NotUniqueStrategy } from "../utils/mock-strategies";

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
