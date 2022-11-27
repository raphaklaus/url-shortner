import { PrismaClient } from "@prisma/client";
import { AppDataSource } from "../../src/database/client";
import { ShortURL } from "../../src/database/models/url";
import { Visit } from "../../src/database/models/visit";
import URLShortnerService from "../../src/services/urlShortner.service";
import VisitService from "../../src/services/visit.service";
import NotUniqueStrategy from "../utils/mockStrategy";

const repository = new PrismaClient();

afterAll(async () => {
  await repository.$disconnect();
});

afterEach(async () => {
  await repository.$transaction([repository.shortURL.deleteMany()]);
});

describe("Visit service", () => {
  test("should count the visit", async () => {
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
