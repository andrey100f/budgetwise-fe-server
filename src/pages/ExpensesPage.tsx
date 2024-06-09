import { useLoaderData } from "react-router-dom";

import Table from "../components/Table";
import { ExpensesLoaderData } from "../utils/interfaces";

function ExpensesPage() {
    const { expenses } = useLoaderData() as ExpensesLoaderData;

    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <small>{expenses.length} total</small>
                        <Table expenses={expenses} />
                    </div>
                ) : (
                    <p>No Expenses to show...</p>
                )
            }
        </div>
    );
}

export default ExpensesPage;
