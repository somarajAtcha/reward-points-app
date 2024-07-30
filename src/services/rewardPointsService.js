import { fetchRewardPointsDataApi } from './apiService';
import { formatRewardPointsData } from '../utils/rewardPoints';

/** Fetch the reward points data  from api 
 * @param setIsLoading: function
 * @param setIsError: function
 * @param setRewardPointsData: function
*/
export const fetchRewardPointsData = (setIsLoading, setIsError, setRewardPointsData) => {
    fetchRewardPointsDataApi().then(function (response) {
        return response.json();
    }).
        then(res => {
            const formatedData = formatRewardPointsData(res.data);
            setTimeout(() => {
                console.log(formatedData)
                setRewardPointsData([...formatedData]);
                setIsLoading(false);
            }, 500);
        }, err => {
            console.log(err)
            setIsLoading(false);
            setIsError(true);
        });
}