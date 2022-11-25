export interface URLShortnerMap {
  from: string;
  to: string;
}

export interface IStrategy {
  run(url: string): URLShortnerMap;
}
