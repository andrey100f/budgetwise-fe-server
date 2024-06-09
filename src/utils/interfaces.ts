export interface Budget {
    id: string;
    name: string;
    amount: number;
    createdAt: string;
    color: string;
}

export interface Expense {
    id: string;
    name: string;
    amount: number;
    createdAt: string;
    budgetId: string;
}

export interface Color {
    id: string;
    color: string;
}

export interface RegisterLoaderData {
    username: string;
}

export interface BudgetLoaderData {
    budget: Budget;
    expenses: Expense[];
}

export interface DashboardLoaderData {
    username: string;
    budgets: Budget[];
    expenses: Expense[];
}

export interface RouteError {
    message: string;
    statusText: string;
}

export interface ExpensesLoaderData {
    expenses: Expense[];
}

export interface MainLoaderData {
    username: string;
}

export interface BudgetLoaderParams {
    id: string | FormDataEntryValue;
}
