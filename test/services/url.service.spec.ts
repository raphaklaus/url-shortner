import { PrismaClient } from ".prisma/client";
import URLShortnerService from "../../src/services/urlShortner.service";
import NotUniqueStrategy from "../utils/mockStrategy";

const repository = new PrismaClient();

afterAll(async () => {
  await repository.$disconnect();
});

afterEach(async () => {
  await repository.$transaction([repository.shortURL.deleteMany()]);
});

describe("URL Shortner service", () => {
  test("should save URL generated in the database", async () => {
    const strategy = new NotUniqueStrategy();
    const service = new URLShortnerService(strategy, repository.shortURL);
    const url = await service.create("https://google.com");
    repository.shortURL;

    const savedURL = await service.get(url);
    expect(savedURL).toMatchObject({
      source: "https://google.com",
      code: "1",
    });
  });

  test("should throw uniqueness exception on repeated code", async () => {
    const strategy = new NotUniqueStrategy();
    const service = new URLShortnerService(strategy, repository.shortURL);
    expect(async () => {
      await service.create("https://google.com");
      await service.create("https://uol.com.br");
    }).rejects.toThrow();
  });
});
