import { fetchRewardPointsDataApi } from './apiService';
import { formatRewardPointsData } from '../utils/commonFunctions/rewardPoints.js';
import logger from '../logger.js';

/** Fetch the reward points data  from api 
 * @param setIsLoading: function
 * @param setIsError: function
 * @param setRewardPointsData: function
*/
export const fetchRewardPointsData = async (setIsLoading, setIsError, setRewardPointsData) => {
    try {
        const response = await fetchRewardPointsDataApi();
        const res = await response.json();
        logger.info(res, 'api response');
        const formatedData = formatRewardPointsData(res.data);
        logger.info(formatedData, 'formatted data');
        setRewardPointsData(formatedData);
        setIsLoading(false);
    }
    catch (err) {
        logger.error(err);
        setIsLoading(false);
        setIsError(true);
    }

}