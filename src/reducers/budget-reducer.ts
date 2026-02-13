import { v4 as uuidv4 } from 'uuid';
import type { Category,DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number} } |
    { type: 'show-modal'} |
    { type: 'close-modal'} |
    { type: 'add-expense', payload: { expense: DraftExpense} } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } } 


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId?: Expense['id']
    currentCategory?: Category['id']
}

// This function will be used to get the initial budget from the local storage. If there is no budget in the local storage, it will return 0.
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? Number(localStorageBudget) : 0;
}

// This function will be used to get the expenses from the local storage. If there are no expenses in the local storage, it will return an empty array.
const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initiateSate : BudgetState = {
    budget: initialBudget(), // This will get the initial budget from the local storage when the app starts. If there is no budget in the local storage, it will start with a budget of 0.
    modal: false,
    expenses: localStorageExpenses(), // This will get the expenses from the local storage when the app starts. If there are no expenses in the local storage, it will start with an empty array.
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initiateSate, 
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense);

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === 'get-expense-by-id') {

        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}