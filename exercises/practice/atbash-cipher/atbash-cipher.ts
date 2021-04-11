type CharMapping = {
  [char: string]: string;
};

type MappingFn = (
  mapping: CharMapping,
  srcChar: string,
  idx: number
) => CharMapping;

const numbers = "1234567890";
const plaintextAlphabet = "abcdefghijklmnopqrstuvwxyz";
const ciphertextAlphabet = plaintextAlphabet.split("").reverse().join("");

const mapNumbers2Cipher = (
  mapping: CharMapping,
  plainNumber: string,
  _: number
): CharMapping => {
  // map numbers to itself
  mapping[plainNumber] = plainNumber;
  return mapping;
};

const mapPlain2Cipher = (
  mapping: CharMapping,
  plainChar: string,
  idx: number
): CharMapping => {
  mapping[plainChar] = ciphertextAlphabet.charAt(idx);
  return mapping;
};

const mapCipher2Plain = (
  mapping: CharMapping,
  cipherChar: string,
  idx: number
): CharMapping => {
  mapping[cipherChar] = plaintextAlphabet.charAt(idx);
  return mapping;
};

function encodingMapping(src: string, mappingFn: MappingFn): CharMapping {
  const mappings = src.split("").reduce(mappingFn, {});
  return numbers.split("").reduce(mapNumbers2Cipher, mappings);
}

const plainToCipher: CharMapping = encodingMapping(
  plaintextAlphabet,
  mapPlain2Cipher
);

const cipherToPlain: CharMapping = encodingMapping(
  ciphertextAlphabet,
  mapCipher2Plain
);

/**
 * Apply fn to each character in text and return the result.
 * Example:
 *  maps('abc') === `${fn(a)}${fn(b)}${fn(c)}`
 * @param text
 * @param fn
 */
function maps(this: string, fn: (char: string, idx: number) => string) {
  return this.split("").map(fn).join("");
}

function formatOut(this: string) {
  const toGroupsOf5Chars = (char: string, idx: number): string =>
    idx % 5 === 0 ? ` ${char}` : char;
  return maps.apply(this, [toGroupsOf5Chars]);
}

export default class AtbashCipher {
  encode(plaintext: string) {
    const encoding = (char: string) => plainToCipher[char];

    const ciphertext = maps.apply(plaintext.toLowerCase(), [encoding]);
    return formatOut.apply(ciphertext).trim();
  }

  decode(ciphertext: string) {
    const decoding = (char: string) => cipherToPlain[char];

    const plaintext = maps.apply(ciphertext.toLowerCase(), [decoding]);
    return plaintext;
  }
}
