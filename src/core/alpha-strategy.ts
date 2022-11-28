import { URLShortnerMap, IStrategy } from "./strategy-interface";

export default class AlphanumericStrategy implements IStrategy {
  readonly characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  readonly numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  run(url: string): URLShortnerMap {
    return {
      from: url,
      to: this.generate(),
    };
  }

  private generate(): string {
    let result = "";
    for (let i = 0; i <= 7; i++) {
      const isCharacter = Math.random() > 0.5;

      if (isCharacter) {
        const characterIndex = Math.floor(
          Math.random() * this.characters.length
        );

        result += this.characters[characterIndex];
      } else {
        const numberIndex = Math.floor(Math.random() * this.numbers.length);
        result += this.numbers[numberIndex];
      }
    }

    return result;
  }
}
