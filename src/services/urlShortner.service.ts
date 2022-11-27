import { Repository } from "typeorm";
import { IStrategy } from "../core/strategy.interface";
import URLShortner from "../core/urlShortner.core";
import { ShortURL } from "../database/models/url";
import { Visit } from "../database/models/visit";
import { extractCode } from "./utils/url";

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

  async create(url: string): Promise<string> {
    const shortURL = new ShortURL();
    shortURL.source = url;
    shortURL.visit = new Visit();
    shortURL.code = this.shortner.process(url).to;

    await this.shortURLRepository.save(shortURL);

    return `https://${this.baseDomain}/${shortURL.code}`;
  }

  get(url: string): Promise<ShortURL | null> {
    return this.shortURLRepository.findOneBy({ code: extractCode(url) });
  }
}
