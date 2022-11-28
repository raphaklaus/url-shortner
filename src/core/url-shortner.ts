import { URLShortnerMap, IStrategy } from "./strategy-interface";

export default class URLShortner {
  private strategy: IStrategy;

  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }

  process(url: string): URLShortnerMap {
    return this.strategy.run(url);
  }
}
