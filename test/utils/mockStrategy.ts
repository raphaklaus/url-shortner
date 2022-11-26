import { IStrategy, URLShortnerMap } from "../../src/core/strategy.interface";

export default class NotUniqueStrategy implements IStrategy {
  run(url: string): URLShortnerMap {
    return {
      from: url,
      to: "1",
    };
  }
}
