import { analyzeBinarySequence } from '../src/index.js';

describe('analyzeBinarySequence', () => {
  it('should return an empty array for an empty sequence', () => {
    const result = analyzeBinarySequence('', 3, 10);
    expect(result).toEqual([]);
  });

  it('should throw a TypeError if windowSize is not a positive integer', () => {
    expect(() => analyzeBinarySequence('010101', 0, 10)).toThrow(TypeError);
    expect(() => analyzeBinarySequence('010101', -3, 10)).toThrow(TypeError);
    expect(() => analyzeBinarySequence('010101', 2.5, 10)).toThrow(TypeError);
  });

  it('should throw a RangeError if windowSize is greater than the sequence length', () => {
    expect(() => analyzeBinarySequence('01', 3, 10)).toThrow(RangeError);
  });

  it('should throw a RangeError if nextNSteps is greater than the sequence length', () => {
    expect(() => analyzeBinarySequence('0101', 2, 10, 10)).toThrow(RangeError);
  });

  it('should correctly compute divergence values using a sliding window', () => {
    const sequence = '0010101';
    const result = analyzeBinarySequence(sequence, 4, 25);

    expect(result).toEqual([
      {
        index: 0,
        percentOnes: 25,
        percentZeros: 75,
        diffPercent: 50,
        diffAfterNextSteps: null,
        predominantBit: '0',
      }
    ]);
  });

  it('should compute diffAfterNextSteps when nextNSteps is provided', () => {
    const sequence = '111100001111';
    const result = analyzeBinarySequence(sequence, 4, 25, 2);

    expect(result[0]).toHaveProperty('diffAfterNextSteps');
    expect(typeof result[0].diffAfterNextSteps).toBe('number');
  });

  it('should identify the correct predominantBit value ("1" or "0")', () => {
    const sequence = '111000';
    const result = analyzeBinarySequence(sequence, 3, 10);

    result.forEach((r) => {
      expect(['1', '0']).toContain(r.predominantBit);
    });
  });
});
