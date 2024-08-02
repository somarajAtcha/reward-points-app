import { MONTHLY_TABLE_HEADINGS } from "../../constants";

/** Render the  monthly reward points table */
const CustomerMonthlyRewards = ({ rewardPointsData }) => {
    return (<table className="rewards-table">
        <thead>
            <tr>
                {
                    Object.keys(MONTHLY_TABLE_HEADINGS).map(heading => (
                        <th key={heading}>{MONTHLY_TABLE_HEADINGS[heading]}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                rewardPointsData.map(customer => (
                    Object.keys(customer.months).map(month => (
                        <tr key={`${customer.customerId}-${month}`}>
                            <td>{customer.customerId}</td>
                            <td>{customer.customerName}</td>
                            <td>{month.split(' ')[0]}</td>
                            <td>{month.split(' ')[1]}</td>
                            <td>{customer.months[month]}</td>
                        </tr>
                    ))
                ))
            }
        </tbody>
    </table>);
}

export default CustomerMonthlyRewards;