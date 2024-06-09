import { Expense } from "./interfaces";
import { getAllExpenses } from "./api";
import { Budget } from "./interfaces";

interface DeleteItemArgs {
    key: string;
    id?: string | number;
}

interface Item {
    id: string | number;
}

export const wait = () => new Promise(res => setTimeout(res, Math.random() * 2000));

export const generateRandomColor = (index : number) => {
    return `${index * 34} 50% 70%`;
}

export const fetchData = (key: string) => {
    const result = localStorage.getItem(key);
    return JSON.parse(result!);
}

export const deleteItem = ({key, id} : DeleteItemArgs) => {
    const existingData = fetchData(key);
    
    if(id) {
        const newData = existingData.filter((item : Item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }

    return localStorage.removeItem(key);
}

export const calculateSpentByBudget = async (budgetId : string) => {
    const token = fetchData("token");
    const expenses = await getAllExpenses(token);
    
    const budgetSpent = expenses.reduce((acc : number, expenese : Expense) => {
        if(expenese.budgetId !== budgetId) {
            return acc;
        }
        return acc + expenese.amount;
    }, 0);

    return budgetSpent;
}

export const formatDateToLocalString = (epoch : number) => {
   return new Date(epoch).toLocaleDateString();
}

export const formatPercentage = (amount : number) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
}

export const formatCurrency = (ammount : number) => {
    return ammount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    });
}

export function setColors(budgets : Budget[]) {
    const colors = [];
    for(let i = 0; i < budgets.length; i++) { 
        colors.push({id: budgets[i].id, color: generateRandomColor(i)});
    }
    localStorage.setItem("colors", JSON.stringify(colors));
}
