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
 * @param {string} transactionMonthA
 * @param {string} transactionMonthB 
 * @returns list of sorted array
 */
export const sortTransactionsByMonthYear = (transactionMonthA, transactionMonthB) => {
  return new Date(transactionMonthB) - new Date(transactionMonthA);
}

/**
 * 
 * @param {array} rewardPointsData 
 * @returns formatted customers reward points data 
 */
export const formatRewardPointsData = (rewardPointsData) => {
  rewardPointsData = rewardPointsData.sort(sortTransactions);
  rewardPointsData = rewardPointsData.reduce((response, transaction) => {
    const { customerId, customerName, amount, transactionDate } = transaction;
    const month = new Date(transactionDate).toLocaleString('default', { month: 'long', year: 'numeric' });
    const points = calculatePoints(amount);
    if (!response.months[month]) {
      response.months[month] = { transactions: [] };
    }
    response.months[month].transactions.push({
      ...transaction,
      rewardPoints: points
    });
    let pointsByCustomer = { total: 0, months: {}, transactions: [] };
    if (!response.customers[customerId]) {
      response.customers[customerId] = {
        customerId, customerName, ...pointsByCustomer
      }
    }
    if (!response.customers[customerId].months[month]) {
      response.customers[customerId].months[month] = 0;
    }
    response.customers[customerId].months[month] += points;
    response.customers[customerId].total += points;
    response.customers[customerId].transactions.push({
      ...transaction,
      rewardPoints: points
    })
    return response;
  }, { customers: {}, months: {} });
  rewardPointsData.customers = Object.values(rewardPointsData.customers);
  rewardPointsData.last3Months = Object.keys(rewardPointsData.months).sort(sortTransactionsByMonthYear).slice(0, 3);
  rewardPointsData.customers = rewardPointsData.customers.map(customer => {
    customer.last3MonthsTotal = rewardPointsData.last3Months.reduce((total, month) => {
      total += customer.months[month] ? customer.months[month] : 0;
      return total;
    }, 0)
    return customer;
  });
  return rewardPointsData;
}