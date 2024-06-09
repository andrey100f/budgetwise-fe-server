import { useEffect, useState } from "react";
import { Link, useFetcher, useLocation, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

import { fetchData, formatCurrency, formatDateToLocalString } from "../utils/helpers";
import { getBudgetById } from "../utils/api";
import { Budget, Color, Expense } from "../utils/interfaces";

function ExpenseItem({ expense, showBudget = true } : { expense: Expense, showBudget: boolean }) {
    const fetcher = useFetcher();
    const [budget, setBudget] = useState<Budget>({} as Budget);
    const [color, setColor] = useState("");

    const {id: testBudgetId} = useParams();

    const location = useLocation(); 

    const budgetId = expense.budgetId; 
    const token = fetchData("token");

    const customStyle = {"--accent": color} as React.CSSProperties;

    useEffect(() => {
        const getBudget = async () => {
            if(location.pathname == "/" && budgetId === testBudgetId) return;
            const budget = await getBudgetById(budgetId, token);
            setBudget(budget);
            const colors = JSON.parse(localStorage.getItem("colors")!);
            setColor(colors.find((color: Color) => color.id === budgetId)?.color);
        }

        getBudget();
    });

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocalString(Date.parse(expense.createdAt))}</td>
            
            {showBudget && (
                <td>
                    { budget && <Link to={`/budget/${budget.id}`} style={customStyle}>{budget.name}</Link> }
                </td>
            )}
            
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <input type="hidden" name="budgetId" value={budgetId} />
                    <button type="submit" className="btn btn--warning" aria-label={`Delete ${expense.name} expense`}>
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    );
}

export default ExpenseItem;