import React from "react";
import { RECENT_MONTHLY_TABLE_HEADINGS } from "../../constants";

/** Render the  monthly reward points table for last 3 months */
const CustomerRecentMonthlyRewards = ({ rewardPointsData }) => {
    return (
        (rewardPointsData.last3Months && rewardPointsData.last3Months.length > 0) ? rewardPointsData.last3Months.map(month => (
            <table className="rewards-table" key={month}>
                <caption>{month}</caption>
                <thead>
                    <tr >
                        {
                            Object.keys(RECENT_MONTHLY_TABLE_HEADINGS).map(heading => (
                                <th key={heading}>{RECENT_MONTHLY_TABLE_HEADINGS[heading]} </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rewardPointsData.months[month].transactions.map(customer => (
                            <tr key={`${customer.customerId}-${customer.transactionId}`}>
                                <td>{customer.customerId}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.transactionId}</td>
                                <td>${customer.amount}</td>
                                <td>{customer.transactionDate}</td>
                                <td>{month.split(' ')[1]}</td>
                                <td>{customer.rewardPoints}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )) : <div>No data found</div>
    );
}

export default CustomerRecentMonthlyRewards;