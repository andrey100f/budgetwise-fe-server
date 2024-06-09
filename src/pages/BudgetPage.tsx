import { useLoaderData } from "react-router-dom";

import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { BudgetLoaderData } from "../utils/interfaces";

function BudgetPage() {
    const { budget, expenses } = useLoaderData() as BudgetLoaderData;
    const style = {"--accent": budget.color} as React.CSSProperties;

    return (
        <div className="grid-lg" style={style}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>

            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>

            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span> Expenses
                        </h2>
                        <Table expenses={expenses} showBudget={false} />
                    </div>
                )
            }
        </div>
    );
}

export default BudgetPage;
