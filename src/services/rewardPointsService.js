import { fetchRewardPointsDataApi } from './apiService';
import { formatRewardPointsData } from '../utils/rewardPoints';
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
        const formatedData = formatRewardPointsData(res.data);
        setTimeout(() => {
            // logger.info(formatedData);
            setRewardPointsData([...formatedData]);
            setIsLoading(false);
        }, 500);
    }
    catch (err) {
        logger.error(err);
        setIsLoading(false);
        setIsError(true);
    }

}