import { toast } from 'react-toastify';
import { createUser, loginUser } from '../utils/api';
import { createExpense, deleteExpense, createBudget, updateUser } from '../utils/api';
import { budgetLoader, dashboardLoader, expensesLoader } from '../utils/loaders';
import { fetchData } from './helpers';

export async function registerAction({ request } : { request: Request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === "registerUser") {
        try {
            const user = {
                username: values.username as string,
                password: values.password as string
            };
            await createUser(user);

            return toast.success(`Welcome ${values.username}!`);
        }
        catch (error) {
            throw new Error("There was a problem creating your account...");
        }
    }

    if(_action == "editUser") {
        const loggedInUser = fetchData("user");
        try {
            const user = {
                id: loggedInUser.id,
                username: values.username as string,
                password: values.password as string
            };
            const token = fetchData("token");
            await updateUser(user, token);

            return toast.success(`User updated!`);
        }
        catch (error) {
            throw new Error("There was a problem updating your account...");
        }
    }

}

export async function budgetAction({ request } : { request: Request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === "createExpense") {
        const user = fetchData("user");
        try {
            const expense = {
                name: values.newExpense as string,
                amount: Number.parseFloat(values.newExpenseAmount as string),
                budgetId: values.newExpenseBudget as string,
                userId: user.id
            };

            const token = fetchData("token");
            createExpense(expense, token);
            budgetLoader({params: {id: values.newExpenseBudget}});

            return toast.success(`Expense ${values.newExpense} created!`);
        }
        catch(error) {
            throw new Error("There was a problem creating your expense..."); 
        }
    }

    if(_action === "deleteExpense") {
        try {
            const token = fetchData("token");
            await deleteExpense(values.expenseId as string, token);
            budgetLoader({params: {id: values.budgetId}});

            return toast.success(`Expense deleted!`);
        }
        catch(error) {
            throw new Error("There was a problem deleting your expense..."); 
        }
    }
}

export async function dashboardAction({ request } : { request: Request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === "newUser") {
        try {
            const user = {
                username: values.username as string,
                password: values.password as string
            }
            const loginData = await loginUser(user);

            const loggedInUser = JSON.parse(localStorage.getItem("user") as string);

            localStorage.setItem("username", JSON.stringify(loggedInUser.username));
            localStorage.setItem("token", JSON.stringify(loginData.accessToken));
            return toast.success(`Welcome ${values.username}!`);
        }
        catch (error) {
            return toast.error("Invalid credentials. Please try again.");
        }
    }

    if(_action === "createBudget") {
        const user = fetchData("user");

        try {
            const budget = {
                name: values.newBudget as string,
                amount: Number.parseFloat(values.newBudgetAmount as string),
                userId: user.id
            }
            const token = fetchData("token");

            await createBudget(budget, token);
            dashboardLoader();

            return toast.success(`Budget created!`);

        }
        catch(error) {
            throw new Error("There was a problem creating your budget..."); 
        }
    }

    if(_action === "createExpense") {
        const user = fetchData("user");
        try {
            const expense = {
                name: values.newExpense as string,
                amount: Number.parseFloat(values.newExpenseAmount as string),
                budgetId: values.newExpenseBudget as string,
                userId: user.id
            }
            const token = fetchData("token");

            await createExpense(expense, token);
            dashboardLoader();

            return toast.success(`Expense ${values.newExpense} created!`);
        }
        catch(error) {
            throw new Error("There was a problem creating your expense..."); 
        }
    }

    if(_action === "deleteExpense") {
        try {
            const token = fetchData("token");

            await deleteExpense(values.expenseId as string, token);
            dashboardLoader();

            return toast.success(`Expense deleted!`);
        }
        catch(error) {
            throw new Error("There was a problem deleting your expense..."); 
        }
    }
}

export async function expensesAction({ request } : { request: Request }) {
    const data = await request.formData();
    const token = fetchData("token");
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === "deleteExpense") {
        try {
            await deleteExpense(values.expenseId as string, token);
            expensesLoader();

            return toast.success(`Expense deleted!`);
        }
        catch(error) {
            throw new Error("There was a problem deleting your expense..."); 
        }
    }
}
