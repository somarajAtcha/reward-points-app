import { RECENT_MONTHLY_TABLE_HEADINGS } from "../../constants";

/** Render the  monthly reward points table for last 3 months */
const CustomerRecentMonthlyRewards = ({ rewardPointsData }) => {
    return (<table className="rewards-table">
        <thead>
            <tr>
                {
                    Object.keys(RECENT_MONTHLY_TABLE_HEADINGS).map(heading => (
                        <th key={heading}>{RECENT_MONTHLY_TABLE_HEADINGS[heading]}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                rewardPointsData.map(customer => (
                    <tr key={`${customer.customerId}`}>
                        <td>{customer.customerId}</td>
                        <td>{customer.customerName}</td>
                        {Object.keys(customer.last3Months).map(month => (
                            <td>{customer.last3Months[month]}</td>
                        ))}
                        <td>{customer.last3MonthsTotal}</td>
                    </tr>

                ))
            }
        </tbody>
    </table>);
}

export default CustomerRecentMonthlyRewards;