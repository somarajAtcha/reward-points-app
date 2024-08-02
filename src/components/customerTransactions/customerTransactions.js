import { TRANSACTIONS_TABLE_HEADINGS } from "../../constants";

 /** Render the  transactions with reward points table */
 const CustomerTransactions = ({rewardPointsData}) => {
    return (<table className="rewards-table">
      <thead>
      <tr >
        {
          Object.keys(TRANSACTIONS_TABLE_HEADINGS).map(heading => (
            <th key={heading}>{TRANSACTIONS_TABLE_HEADINGS[heading]}</th>      
          ))
        }
         </tr>
      </thead>
      <tbody>
        {
          rewardPointsData.map(customer => (
            customer.transactions.map(transaction => (
              <tr key={`${customer.customerId}-${transaction.transactionId}`}>
                <td>{transaction.transactionId}</td>
                <td>{customer.customerName}</td>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.product}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.rewardPoints}</td>
              </tr>
            ))
          ))
        }
      </tbody>
    </table>);
  }

  export default CustomerTransactions;
