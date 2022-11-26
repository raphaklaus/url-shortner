import { IStrategy } from "../core/strategy.interface";
import URLShortner from "../core/urlShortner.core";
import IRepository from "../repository/repository.interface";

export default class URLShortnerService {
  strategy: IStrategy;
  shortner: URLShortner;
  shortURLRepository: IRepository;
  constructor(strategy: IStrategy, shortURLRepository: IRepository) {
    this.strategy = strategy;
    this.shortURLRepository = shortURLRepository;
    this.shortner = new URLShortner(strategy);
  }

  create(url: string): Promise<any> | undefined {
    const result = this.shortner.process(url);

    return this.shortURLRepository.create({
      data: { source: result.from, code: result.to },
    });
  }

  get(code: string): Promise<any> {
    return this.shortURLRepository.findUnique({ where: { code } });
  }
}
