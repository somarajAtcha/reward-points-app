import { calculatePoints } from "./calculator";

/**
 * 
 * @param {string} transactionA 
 * @param {string} transactionB 
 * @returns list of sorted array
 */
export const sortTransactions = (transactionA, transactionB) => {
  return new Date(transactionB.transactionDate) - new Date(transactionA.transactionDate);
}

/**
 * 
 * @param {array} rewardPointsData 
 * @returns formatted customers reward points data 
 */
export const formatRewardPointsData = (rewardPointsData) => {
  return rewardPointsData.map(customer => {
    const { customerId, customerName, transactions } = customer;
    const sortedTransactions = transactions.sort(sortTransactions);
    let pointsByCustomer = { total: 0, months: {}, transactions: [] };
    pointsByCustomer = sortedTransactions.reduce((transactionOutput, transaction) => {
      const { amount, transactionDate } = transaction;
      const month = new Date(transactionDate).toLocaleString('default', { month: 'long', year: 'numeric' });
      const points = calculatePoints(amount);
      if (!transactionOutput.months[month]) {
        transactionOutput.months[month] = 0;
      }
      transactionOutput.months[month] += points;
      transactionOutput.total += points;
      transactionOutput.transactions.push({
        ...transaction,
        rewardPoints: points
      })
      return transactionOutput;
    }, pointsByCustomer);
    return {
      customerId, customerName, ...pointsByCustomer
    }

  });
}