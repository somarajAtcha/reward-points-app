import React, { useEffect, useState } from 'react';
import { fetchRewardPointsData } from '../../services/rewardPointsService';
import { MONTHLY_TABLE_HEADINGS, TOTAL_REWARDS_TABLE_HEADINGS, TRANSACTIONS_TABLE_HEADINGS } from '../../constants';
import CustomerTotalRewards from '../../components/CustomerTotalRewards/CustomerTotalRewards';
import CustomerTransactions from '../../components/CustomerTransactions/CustomerTransactions';
import CustomerMonthlyRewards from '../../components/CustomerMonthlyRewards/CustomerMonthlyRewards';
import CustomerRecentMonthlyRewards from '../../components/CustomerRecentMonthlyRewards/CustomerRecentMonthlyRewards';
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
              <h3>Customer Last 3 Months Rewards</h3>
              <CustomerRecentMonthlyRewards  rewardPointsData={rewardPointsData}/>
            </div>
            <div>
              <h3>Customer Monthly Rewards</h3>
              <CustomerMonthlyRewards  rewardPointsData={rewardPointsData}/>
            </div>
            <div>
              <h3>Customer Total Rewards</h3>
              <CustomerTotalRewards rewardPointsData={rewardPointsData}/>
            </div>
            <div>
              <h3>Customer Transactions</h3>
              <CustomerTransactions rewardPointsData={rewardPointsData} />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default RewardPointsSummary;
