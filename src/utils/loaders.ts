import { LoaderFunctionArgs } from "react-router-dom";

import { fetchData, setColors } from "./helpers";
import { getBudgetById, getBudgetsByUserId, getExpensesByUserId } from "./api";
import { BudgetLoaderParams } from "./interfaces";

export function editLoader() {
    const username = fetchData("username") ? fetchData("username") : "";
    return { username };
}

export async function budgetLoader({ params } : LoaderFunctionArgs | { params: BudgetLoaderParams }) {
    const token = fetchData("token");
    const budget = await getBudgetById(params.id as string, token);
    const expenses = budget.expenses;

    if(!budget) {
        throw new Error("The budget you're triying to find does not exist...");
    }

    return { budget, expenses }
}

export async function dashboardLoader() {
    const username = fetchData("username");
    const user = fetchData("user");
    const token = fetchData("token");

    let budgets = [];
    let expenses = [];

    if(user) {
        budgets = await getBudgetsByUserId(user.id, token);
        expenses = await getExpensesByUserId(user.id, token);
    }
   
    setColors(budgets);

    return { username, budgets, expenses };
}

export async function expensesLoader() {
    const token = fetchData("token");
    const user = fetchData("user");

    const expenses = await getExpensesByUserId(user.id, token);
    return { expenses };
}

export function mainLoader() {
    const username = fetchData("username");
    return { username };

}
