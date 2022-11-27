import { Repository } from "typeorm";
import { IStrategy } from "../core/strategy.interface";
import URLShortner from "../core/urlShortner.core";
import { ShortURL } from "../database/models/url";
import { Visit } from "../database/models/visit";
import { buildURL, extractCode } from "./utils/url";

export default class URLShortnerService {
  private readonly shortner: URLShortner;
  constructor(
    private readonly strategy: IStrategy,
    private readonly shortURLRepository: Repository<ShortURL>,
    private readonly baseDomain = "tier.app"
  ) {
    this.baseDomain = baseDomain;
    this.shortURLRepository = shortURLRepository;
    this.shortner = new URLShortner(this.strategy);
  }

  async create(url: string): Promise<ShortURL> {
    const existingShortURL = await this.shortURLRepository.findOneBy({
      source: url,
    });

    if (existingShortURL) {
      return existingShortURL;
    }

    const shortURL = new ShortURL();
    shortURL.source = url;
    shortURL.visit = new Visit();
    shortURL.code = this.shortner.process(url).to;

    return this.shortURLRepository.save(shortURL);
  }

  getURL(shortURL: ShortURL): string {
    return buildURL(this.baseDomain, shortURL.code);
  }

  get(url: string): Promise<ShortURL | null> {
    return this.shortURLRepository.findOne({
      relations: { visit: true },
      where: { code: extractCode(url) },
    });
  }
}
