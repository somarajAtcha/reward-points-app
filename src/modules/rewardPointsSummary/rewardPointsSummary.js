import React, { useEffect, useState } from 'react';
import { fetchRewardPointsData } from '../../services/rewardPointsService';
import CustomerTotalRewards from '../../components/customerTotalRewards/customerTotalRewards';
import CustomerTransactions from '../../components/customerTransactions/customerTransactions';
import CustomerRecentMonthlyRewards from '../../components/customerRecentMonthlyRewards/customerRecentMonthlyRewards';
import './rewardPointsSummary.css'


const RewardPointsSummary = () => {
  const [rewardPointsData, setRewardPointsData] = useState(null);
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
              <h3>Recent 3 Months Reward Points</h3>
              <CustomerRecentMonthlyRewards rewardPointsData={rewardPointsData} />
            </div>
            <div>
              <h3>Recent 3 Months Total Reward Points</h3>
              <CustomerTotalRewards rewardPointsData={rewardPointsData} totalType='recent' />
            </div>
            <div>
              <h3>Customer Total Rewards</h3>
              <CustomerTotalRewards rewardPointsData={rewardPointsData} totalType='all' />
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