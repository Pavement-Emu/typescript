enum Codec {
  ENCODE = +1,
  DECODE = -1
}

type CharCode = number;
interface Alphabet {
  length: () => number;
  characters: string;
  FIRST: CharCode;
  LAST: CharCode;
}
const LatinAlphabet: Alphabet = {
  FIRST: "a".charCodeAt(0),
  LAST: "z".charCodeAt(0),
  characters: "abcdefghijklmnopqrstuvwxyz",
  length: function () {
    return this.LAST - this.FIRST + 1;
  }
};

function randomKey(length: number) {
  // codesandbox only supports browser cryptography
  // this projects assumes serverside (NodeJS)
  const seed = new Array(length).fill(1);
  // const keyCodex = LatinAlphabet.characters.repeat(
  //   255 / LatinAlphabet.length()
  // );
  // window.Crypto.getRandomValues(seed);
  // const key: string = seed.map((s) => keyCodex.charAt(s) as any).join("");
  // return key;

  // use Math.random as a workaround
  // This is not cryptographically secure
  // but it doesn't matter, since the
  // simple-cipher isn't secure anyway!
  const toRandomLetterPos = (_: any) => {
    return Math.floor(Math.random() * LatinAlphabet.length());
  };

  const toLetter = (pos: number) => LatinAlphabet.characters.charAt(pos);

  return seed.map(toRandomLetterPos).map(toLetter).join("");
}

class SimpleCipher {
  _key: string;
  constructor(key?: string) {
    this._key = key ? key : randomKey(100);
  }

  private ensureKeyLongerThan(length: number) {
    return this.key.length > length
      ? this.key
      : this.key.repeat(Math.ceil(length / this.key.length));
  }

  private codec(text: string, direction: Codec) {
    const key = this.ensureKeyLongerThan(text.length);
    const shiftCipher = (char: string, idx: number) => {
      const offset = key.charCodeAt(idx) - LatinAlphabet.FIRST;
      const encodedChar = char.charCodeAt(0) + direction * offset;

      // wrap char codes if required
      if (encodedChar > LatinAlphabet.LAST) {
        return encodedChar - LatinAlphabet.length();
      }
      if (encodedChar < LatinAlphabet.FIRST) {
        return encodedChar + LatinAlphabet.length();
      } else {
        return encodedChar;
      }
    };

    const transformed: number[] = text.split("").map(shiftCipher);

    return String.fromCharCode(...transformed);
  }

  encode(plaintext: string) {
    return this.codec(plaintext, Codec.ENCODE);
  }

  decode(ciphertext: string) {
    return this.codec(ciphertext, Codec.DECODE);
  }

  get key() {
    return this._key;
  }
}

export default SimpleCipher;
