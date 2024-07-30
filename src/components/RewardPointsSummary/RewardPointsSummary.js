import React, { useEffect, useState } from 'react';
import { fetchRewardPointsData } from '../../services/rewardPointsService';
import { MONTHLY_TABLE_HEADINGS, TOTAL_REWARDS_TABLE_HEADINGS, TRANSACTIONS_TABLE_HEADINGS } from '../../constants';
import './RewardPointsSummary.css'


const RewardPointsSummary = () => {
  const [rewardPointsData, setRewardPointsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /** Fetch the rewards data from api on mounting */
  useEffect(() => {
    setIsLoading(true);
    fetchRewardPointsData(setIsLoading, setIsError, setRewardPointsData);
  }, []);

  /** Render the  monthly reward points table */
  const renderCustomerMonthlyRewards = () => {
    return (<table className="rewards-table">
      <thead>
        {
          MONTHLY_TABLE_HEADINGS.map(heading => (
            <tr key={heading.id}>
              <th>{heading.id}</th>
              <th>{heading.name}</th>
              <th>{heading.month}</th>
              <th>{heading.year}</th>
              <th>{heading.total}</th>
            </tr>
          ))
        }
      </thead>
      <tbody>
        {
          rewardPointsData.map(customer => (
            Object.keys(customer.months).map(month => (
              <tr key={customer.id}>
                <td>{customer.customerId}</td>
                <td>{customer.customerName}</td>
                <td>{month.split(' ')[0]}</td>
                <td>{month.split(' ')[1]}</td>
                <td>{customer.months[month]}</td>
              </tr>
            ))
          ))
        }
      </tbody>
    </table>);
  }

  /** Render the total reward points table */
  const renderCustomerTotalRewards = () => {
    return (<table className="rewards-table">
      <thead>
        {
          TOTAL_REWARDS_TABLE_HEADINGS.map(heading => (
            <tr key={heading.name}>
              <th>{heading.name}</th>
              <th>{heading.total}</th>
            </tr>
          ))
        }
      </thead>
      <tbody>
        {
          rewardPointsData.map(customer => (
            <tr key={customer.customerName}>
              <td>{customer.customerName}</td>
              <td>{customer.total}</td>
            </tr>
          ))
        }
      </tbody>
    </table>);
  }

  /** Render the  transactions with reward points table */
  const renderCustomerTransactions = () => {
    return (<table className="rewards-table">
      <thead>
        {
          TRANSACTIONS_TABLE_HEADINGS.map(heading => (
            <tr key={heading.id}>
              <th>{heading.id}</th>
              <th>{heading.name}</th>
              <th>{heading.transactionDate}</th>
              <th>{heading.product}</th>
              <th>{heading.amount}</th>
              <th>{heading.rewardPoints}</th>
            </tr>
          ))
        }
      </thead>
      <tbody>
        {
          rewardPointsData.map(customer => (
            customer.transactions.map(transaction => (
              <tr key={customer.id}>
                <td>{transaction.transactionId}</td>
                <td>{customer.customerName}</td>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.product}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.rewardPoints}</td>
              </tr>
            ))
          ))
        }
      </tbody>
    </table>);
  }

  return (
    <div className='container'>
      <h1>Customers Reward Points Summary</h1>
      {
        isLoading && (
          <div className='spinner' data-testid="spinner"></div>
        )
      }
      {isError &&
        <div className='error-content' data-testid="error">Error while fetching the rewards points data</div>
      }
      {
        (!isError && !isLoading && rewardPointsData) && (
          <div className="table-container" data-testid="reward-container">
            <div>
              <h3>Customer Monthly Rewards</h3>
              {renderCustomerMonthlyRewards()}
            </div>
            <div>
              <h3>Customer Total Rewards</h3>
              {renderCustomerTotalRewards()}
            </div>
            <div>
              <h3>Customer Transactions</h3>
              {renderCustomerTransactions()}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default RewardPointsSummary;
