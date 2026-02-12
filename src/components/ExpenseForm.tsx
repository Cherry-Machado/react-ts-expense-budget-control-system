// This component will be used to create a form for adding new expenses. It will be used in the ExpenseModal component.

import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date(),
    });

    const [error, setError] = useState('');
    const { dispatch, state } = useBudget();

    useEffect(() => { // This effect will run when the component mounts and when the editingId in the global state changes. If there is an editingId, it will find the expense with that id and set it as the current expense in the form.
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0];
            setExpense(editingExpense);
        }
    }, [state.editingId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        });
    };


    const handleChangeDate = (value : Value) => {
       setExpense({
            ...expense,
            date: value
       });
    };
  
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        //vaidation
        if(Object.values(expense).some(value => value === '' || value === 0)) {
            setError('Please fill in all the fields');
            return;
        }

        // Add or update the new expense to the global state
        if(state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } });
        } else {
            dispatch({ type: 'add-expense', payload: { expense } });
        }

        // Reset the form (The state)
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date(),
        });
    }


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl font-black boder-b-4 border-blue-500 py-2"
        >{state.editingId ? 'Save Changes' : 'Add New Expense'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >
                Expense Name:
            </label>

            <input
                type="text"
                id="expenseName"
                placeholder="Add the expense name"
                className="bg-slate-100 p-2"
                name="expenseName"
                onChange={handleChange}
                value={expense.expenseName} // Controlled input
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Amount:
            </label>

            <input
                type="number"
                id="amount"
                placeholder="Add the expense amount ex. 100"
                className="bg-slate-100 p-2"
                name="amount"
                onChange={handleChange}
                value={expense.amount}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >
                Category:
            </label>

            <select
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                onChange={handleChange}
                value={expense.category}
            >
                <option value="">-- Select a category --</option>
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

         <div className="flex flex-col gap-2">
            <label 
                htmlFor="date"
                className="text-xl"
            >
                Expense Date:
            </label>

            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            name="note"
            value={state.editingId ? 'Save Changes' : 'Register Expense'}
        />
    </form>
  )
}
