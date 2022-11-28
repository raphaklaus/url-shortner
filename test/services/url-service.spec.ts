import URLShortner from "../../src/core/url-shortner";
import { ShortURL } from "../../src/database/models/url";
import URLService from "../../src/services/url-service";
import { NotUniqueStrategy } from "../utils/mock-strategies";
import { createDatabase } from "../utils/test-database";

describe("URL Shortner service", () => {
  test("should save URL generated in the database", async () => {
    const AppDataSource = await createDatabase();

    const strategy = new NotUniqueStrategy();
    const urlShortner = new URLShortner(strategy);

    const shortURLRepo = AppDataSource.getRepository(ShortURL);

    const service = new URLService(shortURLRepo);

    const shortURL = await service.create("https://google.com", urlShortner);

    const url = service.getURL(shortURL);

    const savedURL = await service.get(url);

    expect(savedURL).toMatchObject({
      source: "https://google.com",
      code: "1",
    });
  });

  test("should throw uniqueness exception on repeated code", async () => {
    const AppDataSource = await createDatabase();

    const strategy = new NotUniqueStrategy();
    const urlShortner = new URLShortner(strategy);

    const urlShortRepo = AppDataSource.getRepository(ShortURL);

    const service = new URLService(urlShortRepo);

    await service.create("https://google.com", urlShortner);
    await expect(
      service.create("https://uol.com.br", urlShortner)
    ).rejects.toThrow();
  });
});
