import { randomBytes } from "crypto";

/**
 * Generates a random binary sequence of specified size.
 *
 * @param {number} length - How many bits the sequence should have (positive integer).
 * @returns {string} - A string containing '0' and '1' with the given length.
 * @throws {TypeError} - If the length is not a positive integer.
 */
export function generateRandomBinarySequence(length) {
  if (!Number.isInteger(length) || length < 1) {
    throw new TypeError("The length parameter must be a positive integer.");
  }

  const byteCount = Math.ceil(length / 8);
  const buffer = randomBytes(byteCount);

  let bits = "";

  for (let i = 0; i < buffer.length && bits.length < length; i++) {
    const byte = buffer[i];
    for (let bitIndex = 7; bitIndex >= 0 && bits.length < length; bitIndex--) {
      bits += ((byte >> bitIndex) & 1).toString();
    }
  }

  return bits;
}
