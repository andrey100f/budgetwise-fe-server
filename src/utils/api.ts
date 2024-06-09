import axios from "axios";
import { jwtDecode } from "jwt-decode";

const budgetsUrl = "https://budgetwise-gateway-production.up.railway.app/api/budgets";
const expensesUrl = "https://budgetwise-gateway-production.up.railway.app/api/expenses";
const usersUrl = "https://budgetwise-gateway-production.up.railway.app/api/users";
const authUrl = "https://budgetwise-gateway-production.up.railway.app/api/auth";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const securityConfig = (token: string) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
}

export const getAllBudgets = async (token: string) => {
    try {
        const res = await axios.get(budgetsUrl, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const getBudgetById = async (id: string, token: string) => {
    try {
        const res = await axios.get(`${budgetsUrl}/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const getAllExpenses = async (token: string) => {
    try {
        const res = await axios.get(`${expensesUrl}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const deleteExpense = async (id : string, token: string) => {
    try {
        const res = await axios.delete(`${expensesUrl}/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const createBudget = async ({name, amount, userId} : {name: string, amount: number, userId: string}, token: string) => {
    try {
        const res = await axios.post(budgetsUrl, {name, amount, userId}, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const createExpense = async ({name, amount, budgetId, userId} : {name: string, amount: number, budgetId: string, userId: string}, token: string) => {
    try {
        const res = await axios.post(expensesUrl, {name, amount: amount, budgetId, userId}, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const createUser = async({username, password} : {username: string, password: string}) => {
    try {
        const res = await axios.post(`${authUrl}/register`, {username, password}, config);
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const deleteBudget = async(id : string, token: string) => {
    try {
        const res = await axios.delete(`${budgetsUrl}/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const loginUser = async({username, password} : {username: string, password: string}) => {
    try {
        const res = await axios.post(`${authUrl}/login`, {username, password}, config);
        const decodedToken = jwtDecode(res.data.accessToken) as {id: string};
        const user = await getUserById(decodedToken.id, res.data.accessToken);

        localStorage.setItem("user", JSON.stringify(user));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const getUserById = async(id : string, token: string) => {
    try {
        const res = await axios.get(`${usersUrl}/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const getExpensesByBudgetId = async(id : string, token: string) => {
    try {
        const res = await axios.get(`${expensesUrl}/budget/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const getBudgetsByUserId = async(id : string, token: string) => {
    try {
        const res = await axios.get(`${budgetsUrl}/user/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const updateUser = async({id, username, password} : {id: string, username: string, password: string}, token: string) => {
    try {
        const res = await axios.put(`${usersUrl}`, {id, username, password}, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const deleteUser = async(id : string, token: string) => {
    try {
        const res = await axios.delete(`${usersUrl}/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export const getExpensesByUserId = async(id : string, token: string) => {
    try {
        const res = await axios.get(`${expensesUrl}/user/${id}`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch(err) {
        return Promise.reject(err);
    }
}
