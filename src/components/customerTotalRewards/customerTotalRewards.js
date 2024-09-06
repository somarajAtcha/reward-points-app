import { MONTHLY_TABLE_HEADINGS, TOTAL_REWARDS_TABLE_HEADINGS } from "../../constants";

/** Render the total reward points table */
const CustomerTotalRewards = ({ rewardPointsData, totalType }) => {
    const headings = totalType === 'monthly' ?  MONTHLY_TABLE_HEADINGS : TOTAL_REWARDS_TABLE_HEADINGS;
    return (<table className="rewards-table">
        <thead>
            <tr>
                {
                    Object.keys(headings).map(heading => (
                        <th key={heading}>{headings[heading]}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                (rewardPointsData.customers && rewardPointsData.customers.length > 0) ? rewardPointsData.customers.map(customer => (
                    totalType !== 'monthly' ?
                    <tr key={customer.customerName}>
                        {
                            Object.keys(headings).map(heading => (
                                <td key={`${customer.customerName}-${heading}`}>{totalType === 'recent' && heading === 'total' ? customer.last3MonthsTotal : customer[heading]}</td>
                            ))}
                    </tr>
                    :   Object.values(rewardPointsData.last3Months).map(month => (
                        <tr key={customer.customerName + month}>
                            {
                                Object.keys(headings).map(heading => (
                                    <td key={`${customer.customerName}-${heading}`}>
                                        {heading === 'total' ? customer.months[month] : heading === 'month' ? month.split(' ')[0] : heading === 'year' ? month.split(' ')[1]: customer[heading]}
                                    </td>
                                ))}
                        </tr>
                    ))
                    
                )) : (<tr><td colSpan="3">No data found</td></tr>)
            }
        </tbody>
    </table>);
}

export default CustomerTotalRewards;