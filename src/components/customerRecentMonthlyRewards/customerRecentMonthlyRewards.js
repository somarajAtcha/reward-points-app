import React from "react";
import { RECENT_MONTHLY_TABLE_HEADINGS } from "../../constants";

/** Render the  monthly reward points table for last 3 months */
const CustomerRecentMonthlyRewards = ({ rewardPointsData }) => {
    return (<table className="rewards-table">
        <thead>
            <tr >
                {
                    Object.keys(RECENT_MONTHLY_TABLE_HEADINGS).map(heading => (
                        <th key={heading} colSpan={heading.includes('recentMonth') ? 3 : ''}>{RECENT_MONTHLY_TABLE_HEADINGS[heading]} </th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                rewardPointsData.map(customer => (
                    <React.Fragment key={`${customer.customerId}-monthly`}>
                        <tr key={`${customer.customerId}-monthly`}>
                            <td>{customer.customerId}</td>
                            <td key={customer.customerName}>{customer.customerName}</td>
                            {Object.keys(customer.last3Months).map(month => (
                                <td key={month}>{month}</td>
                            ))}
                            <td></td>
                        </tr>
                        <tr key={`${customer.customerId}-points`}>
                            <td colSpan={2}>Reward points for month & total </td>
                            {Object.keys(customer.last3Months).map(month => (
                                <td key={month + '-points'}>{customer.last3Months[month]}</td>
                            ))}
                            <td>{customer.last3MonthsTotal}</td>
                        </tr>
                    </React.Fragment>

                ))
            }
        </tbody>
    </table>);
}

export default CustomerRecentMonthlyRewards;