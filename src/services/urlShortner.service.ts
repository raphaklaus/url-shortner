import { IStrategy } from "../core/strategy.interface";
import URLShortner from "../core/urlShortner.core";
import IRepository from "../repository/repository.interface";
import { extractCode } from "./utils/url";

export default class URLShortnerService {
  private readonly shortner: URLShortner;
  private readonly shortURLRepository: IRepository;
  private readonly baseDomain: string;
  constructor(
    strategy: IStrategy,
    shortURLRepository: IRepository,
    baseDomain = "tier.app"
  ) {
    this.baseDomain = baseDomain;
    this.shortURLRepository = shortURLRepository;
    this.shortner = new URLShortner(strategy);
  }

  async create(url: string): Promise<string> {
    const result = this.shortner.process(url);

    const shortURL = await this.shortURLRepository.create({
      data: { source: result.from, code: result.to, visit: { create: {} } },
    });

    return `https://${this.baseDomain}/${shortURL.code}`;
  }

  get(url: string): Promise<any> {
    return this.shortURLRepository.findUnique({
      where: { code: extractCode(url) },
    });
  }
}
