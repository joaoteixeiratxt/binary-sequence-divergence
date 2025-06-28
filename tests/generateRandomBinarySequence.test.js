import { generateRandomBinarySequence } from '../src/index.js';

describe('generateRandomBinarySequence', () => {
  it('should throw a TypeError if length is not a positive integer', () => {
    expect(() => generateRandomBinarySequence(0)).toThrow(TypeError);
    expect(() => generateRandomBinarySequence(-10)).toThrow(TypeError);
    expect(() => generateRandomBinarySequence(3.5)).toThrow(TypeError);
    expect(() => generateRandomBinarySequence('10')).toThrow(TypeError);
    expect(() => generateRandomBinarySequence(null)).toThrow(TypeError);
  });

  it('should return a binary string of the specified length', () => {
    const result = generateRandomBinarySequence(16);
    expect(typeof result).toBe('string');
    expect(result.length).toBe(16);
    expect(result).toMatch(/^[01]+$/);
  });

  it('should generate different sequences for multiple calls (most of the time)', () => {
    const a = generateRandomBinarySequence(32);
    const b = generateRandomBinarySequence(32);
    expect(a).not.toBe(b); // very low chance of false negative
  });

  it('should generate a sequence with at least some 1s and 0s for larger sizes', () => {
    const result = generateRandomBinarySequence(256);
    const hasZero = result.includes('0');
    const hasOne = result.includes('1');
    expect(hasZero).toBe(true);
    expect(hasOne).toBe(true);
  });

  it('should correctly handle edge case with length = 1', () => {
    const result = generateRandomBinarySequence(1);
    expect(result.length).toBe(1);
    expect(['0', '1']).toContain(result);
  });
});
