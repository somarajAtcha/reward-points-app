import { TOTAL_REWARDS_TABLE_HEADINGS } from "../../constants";

/** Render the total reward points table */
const CustomerTotalRewards = ({ rewardPointsData }) => {
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
                rewardPointsData.map(customer => (
                    <tr key={customer.customerName}>
                        {
                            Object.keys(TOTAL_REWARDS_TABLE_HEADINGS).map(heading => (
                                <td key={`${customer.customerName}-${heading}`}>{customer[heading]}</td>
                            ))}
                    </tr>
                ))
            }
        </tbody>
    </table>);
}

export default CustomerTotalRewards;