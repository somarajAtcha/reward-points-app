import { MAX_AMOUNT, MAX_POINTS, MIN_AMOUNT } from "../constants";

/**
 * 
 * @param {number} amount 
 * @returns total amount
 */
export const calculatePoints = (amount) => {
  if (amount <= MIN_AMOUNT) return 0;
  if (amount <= MAX_AMOUNT) return amount - 50;
  return Math.round((amount - MAX_AMOUNT) * MAX_POINTS) + 50;
};