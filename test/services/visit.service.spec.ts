import {PrismaClient} from "@prisma/client";
import URLShortnerService from "../../src/services/urlShortner.service";
import VisitService from "../../src/services/visit.service";
import NotUniqueStrategy from "../utils/mockStrategy";

const repository = new PrismaClient()

afterAll(async () => {
  await repository.$disconnect();
});

afterEach(async () => {
  await repository.$transaction([repository.shortURL.deleteMany()]);
});

describe("Visit service", () => {
  test("should count the visit", async () => {
    const strategy = new NotUniqueStrategy();
    const urlService = new URLShortnerService(strategy, repository.shortURL);
    const visitService = new VisitService(repository.visit, repository.shortURL)
    const url = await urlService.create("https://google.com");
    const shortURL = await urlService.get(url)
    console.log(shortURL)
    
    expect(await visitService.getCount(shortURL.id)).toEqual(0)
    expect(await visitService.incrementCount(shortURL.id))
    expect(await visitService.getCount(shortURL.id)).toEqual(1)
  });
});
