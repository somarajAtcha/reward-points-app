import { TOTAL_REWARDS_TABLE_HEADINGS } from "../../constants";

/** Render the total reward points table */
const CustomerTotalRewards = ({ rewardPointsData, totalType }) => {
    return (<table className="rewards-table">
        <thead>
            <tr>
                {
                    Object.keys(TOTAL_REWARDS_TABLE_HEADINGS).map(heading => (
                        <th key={heading}>{TOTAL_REWARDS_TABLE_HEADINGS[heading]}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                (rewardPointsData.customers && rewardPointsData.customers.length > 0) ? rewardPointsData.customers.map(customer => (
                    <tr key={customer.customerName}>
                        {
                            Object.keys(TOTAL_REWARDS_TABLE_HEADINGS).map(heading => (
                                <td key={`${customer.customerName}-${heading}`}>{totalType === 'recent' ? customer.last3MonthsTotal : customer[heading]}</td>
                            ))}
                    </tr>
                )) : (<tr><td colSpan="3">No data found</td></tr>)
            }
        </tbody>
    </table>);
}

export default CustomerTotalRewards;