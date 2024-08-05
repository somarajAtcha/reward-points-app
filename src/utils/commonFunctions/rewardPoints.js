import { calculatePoints } from "./calculator/calculator";

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
  rewardPointsData = rewardPointsData.reduce((response, customer) => {
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
      if (!response.months[month]) {
        response.months[month] = { transactions: [] };
      }
      transactionOutput.months[month] += points;
      transactionOutput.total += points;
      transactionOutput.transactions.push({
        ...transaction,
        rewardPoints: points
      })
      response.months[month].transactions.push({
        customerId, customerName,
        ...transaction,
        rewardPoints: points
      });
      return transactionOutput;
    }, pointsByCustomer);
    response.customers.push({
      customerId, customerName, ...pointsByCustomer
    });
    return response;
  }, { customers: [], months: {} });
  rewardPointsData.last3Months = Object.keys(rewardPointsData.months).slice(0, 3);
  rewardPointsData.customers = rewardPointsData.customers.map(customer => {
    customer.last3MonthsTotal = rewardPointsData.last3Months.reduce((total, month) => {
      total += customer.months[month];
      return total;
    }, 0)
    return customer;
  });
  return rewardPointsData;
}