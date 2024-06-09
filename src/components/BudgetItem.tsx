import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

import { calculateSpentByBudget, fetchData, formatCurrency, formatPercentage } from "../utils/helpers";
import { deleteBudget, getBudgetById, deleteExpense } from "../utils/api";
import { Budget, Color } from "../utils/interfaces";

function BudgetItem({ budget, showDelete = false } : { budget: Budget, showDelete?: boolean }) {
    const navigate = useNavigate();

    const { id, name, amount } = budget;
    const [spent, setSpent] = useState(0);
    const color = fetchData("colors").find((color: Color) => color.id === id)?.color;
    const customStyle = { "--accent": color } as React.CSSProperties;

    useEffect(() => {
        const getCost = async () => {
            const res = await calculateSpentByBudget(id);
            return setSpent(res);
        }

        getCost();
    });

    async function handleDeleteBudget(event : React.MouseEvent<HTMLButtonElement>) {
        if(confirm("Are you sure you want to delete this budget?")) {
            event.preventDefault();
            const token = fetchData("token");
            const budget = await getBudgetById(id, token);

            for(const expense of budget.expenses) {
                await deleteExpense(expense.id, token);
            }

            await deleteBudget(id, token);
            navigate("/");
            toast.success("Budget deleted successfully!");
        }
    }

    return (
        <div className="budget budget-item" style={customStyle}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>

            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>

            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>

            {showDelete ? (
                <div className="flex-sm">
                    <button type="submit" className="btn" onClick={(e) => handleDeleteBudget(e)}>
                        <span>Delete Budget</span>
                        <TrashIcon width={20} />
                    </button>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link to={`/budget/${id}`} className="btn">
                        <span>View details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default BudgetItem;
