import { PrismaClient } from ".prisma/client";
import { IStrategy, URLShortnerMap } from "../../src/core/strategy.interface";
import URLShortnerService from "../../src/services/urlShortner.service";

class NotUniqueStrategy implements IStrategy {
  baseDomain: string;
  constructor(baseDomain) {
    this.baseDomain = baseDomain;
  }

  run(url: string): URLShortnerMap {
    return {
      from: url,
      to: "1",
    };
  }
}

const repository = new PrismaClient();

afterAll(async () => {
  await repository.$disconnect();
});

afterEach(async () => {
  await repository.$transaction([repository.shortURL.deleteMany()]);
});

describe("URL Shortner service", () => {
  test("should save URL generated in the database", async () => {
    const strategy = new NotUniqueStrategy("tier.app");
    const service = new URLShortnerService(strategy, repository.shortURL);
    const shortURL = await service.create("https://google.com");

    const savedURL = await service.get(shortURL.code);
    expect(savedURL).toMatchObject({
      source: "https://google.com",
      code: shortURL.code,
    });
  });

  test("should throw uniqueness exception", async () => {
    const strategy = new NotUniqueStrategy("tier.app");
    const service = new URLShortnerService(strategy, repository.shortURL);
    expect(async () => {
      await service.create("https://google.com");
      await service.create("https://uol.com.br");
    }).rejects.toThrow();
  });
});
