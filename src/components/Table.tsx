import ExpenseItem from "./ExpenseItem"; 
import { Expense } from "../utils/interfaces";

function Table({ expenses, showBudget = true } : { expenses: Expense[], showBudget?: boolean }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        expenses.map((expense) => (
                            <tr key={expense.id}>
                                <ExpenseItem expense={expense} showBudget={showBudget} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
