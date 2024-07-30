/** Customer Rewards points api  */
export const fetchRewardPointsDataApi = () => {
  return fetch('/data/rewardPoints.json');
}