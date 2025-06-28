/**
 * Analyzes a binary sequence, calculating percentage divergence using sliding window.
 * @param {string} sequence - Binary sequence (e.g. "010101001100").
 * @param {number} windowSize - Size of the sliding window.
 * @param {number} thresholdPercent - Minimum diffPercent value to be observed.
 * @param {number} [nextNSteps=0] - Optional: steps forward to analyze the effect of divergence.
 * @returns {Array<{
 *   index: number,
 *   percentOnes: number,
 *   percentZeros: number,
 *   diffPercent: number,
 *   diffAfterNextSteps: number|null,
 *   predominantBit: '1'|'0'|null
 * }>}
 * @throws {TypeError} - If windowSize is not a positive integer.
 * @throws {RangeError} - If windowSize or nextNSteps is greater than sequence length.
 */
export function analyzeBinarySequence(
  sequence,
  windowSize,
  thresholdPercent,
  nextNSteps = 0
) {
  if (sequence.length == 0) return [];

  if (!Number.isInteger(windowSize) || windowSize < 1) {
    throw new TypeError("The windowSize parameter must be a positive integer.");
  }

  const rangeErrorMessage = (parameter) =>
    `The length of the ${parameter} parameter cannot be greater than the length of the sequence.`;

  if (windowSize > sequence.length) {
    throw new RangeError(rangeErrorMessage("windowSize"));
  }

  if (nextNSteps > sequence.length) {
    throw new RangeError(rangeErrorMessage("nextNSteps"));
  }

  const results = [];
  const maxIndex = sequence.length - windowSize;
  
  for (let i = 0; i <= maxIndex; i++) {
    const slidingWindow = sequence.slice(i, i + windowSize);
    const onesCount = [...slidingWindow].filter((b) => b === "1").length;
    const zerosCount = windowSize - onesCount;
    const percentOnes = (onesCount / windowSize) * 100;
    const percentZeros = (zerosCount / windowSize) * 100;
    const diffPercent = (Math.abs(onesCount - zerosCount) / windowSize) * 100;

    if (diffPercent < thresholdPercent) continue;

    const oneIsPredominant = onesCount > zerosCount;
    const zeroIsPredominant = zerosCount > onesCount;
    
    const predominantBit = oneIsPredominant
      ? "1"
      : zeroIsPredominant
      ? "0"
      : null;

    let diffAfterNextSteps = null;
    const nextIndex = i + nextNSteps;

    if (nextNSteps > 0 && nextIndex <= maxIndex) {
      const nextStepsWindow = sequence.slice(nextIndex, nextIndex + windowSize);
      const onesNext = [...nextStepsWindow].filter((b) => b === "1").length;
      const zerosNext = windowSize - onesNext;
      diffAfterNextSteps = (Math.abs(onesNext - zerosNext) / windowSize) * 100;
    }

    results.push({
      index: i,
      percentOnes,
      percentZeros,
      diffPercent,
      diffAfterNextSteps,
      predominantBit,
    });
  }

  return results;
}
