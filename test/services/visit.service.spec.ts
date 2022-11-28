import { ShortURL } from "../../src/database/models/url";
import { Visit } from "../../src/database/models/visit";
import URLShortnerService from "../../src/services/urlShortner.service";
import VisitService from "../../src/services/visit.service";
import NotUniqueStrategy from "../utils/mockStrategy";
import { createDatabase } from "../utils/testDatabase";

describe("Visit service", () => {
  test("should count the visit", async () => {
    const AppDataSource = await createDatabase();
    const strategy = new NotUniqueStrategy();
    const shortURLRepo = AppDataSource.getRepository(ShortURL);
    const visitRepo = AppDataSource.getRepository(Visit);
    const urlService = new URLShortnerService(strategy, shortURLRepo);
    const visitService = new VisitService(visitRepo);
    const shortURL = await urlService.create("https://google.com");

    expect(await visitService.getCount(shortURL.id)).toEqual(0);
    expect(await visitService.incrementCount(shortURL.id));
    expect(await visitService.getCount(shortURL.id)).toEqual(1);
  });
});
