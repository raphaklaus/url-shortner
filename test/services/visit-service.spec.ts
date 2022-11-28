import URLShortner from "../../src/core/url-shortner";
import { ShortURL } from "../../src/database/models/url";
import { Visit } from "../../src/database/models/visit";
import URLService from "../../src/services/url-service";
import VisitService from "../../src/services/visit-service";
import { NotUniqueStrategy } from "../utils/mock-strategies";
import { createDatabase } from "../utils/test-database";

describe("Visit service", () => {
  test("should count the visit", async () => {
    const AppDataSource = await createDatabase();

    const strategy = new NotUniqueStrategy();
    const urlShortner = new URLShortner(strategy);

    const shortURLRepo = AppDataSource.getRepository(ShortURL);
    const visitRepo = AppDataSource.getRepository(Visit);

    const urlService = new URLService(shortURLRepo);
    const visitService = new VisitService(visitRepo);

    const shortURL = await urlService.create("https://google.com", urlShortner);

    expect(await visitService.getCount(shortURL.id)).toEqual(0);
    expect(
      await visitService.incrementCount(shortURL.id, shortURL.visit.count)
    );
    expect(await visitService.getCount(shortURL.id)).toEqual(1);
  });
});
