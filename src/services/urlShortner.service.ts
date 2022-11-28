import { Repository } from "typeorm";
import URLShortner from "../core/urlShortner.core";
import { ShortURL } from "../database/models/url";
import { Visit } from "../database/models/visit";
import { buildURL, extractCode } from "./utils/url";

export default class URLService {
  constructor(
    private readonly shortURLRepository: Repository<ShortURL>,
    private readonly baseDomain = "tier.app"
  ) {
    this.baseDomain = baseDomain;
    this.shortURLRepository = shortURLRepository;
  }

  async create(url: string, urlShortner: URLShortner): Promise<ShortURL> {
    const existingShortURL = await this.shortURLRepository.findOneBy({
      source: url,
    });

    if (existingShortURL) {
      return existingShortURL;
    }

    const shortURL = new ShortURL();
    shortURL.source = url;
    shortURL.visit = new Visit();
    shortURL.code = urlShortner.process(url).to;

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
