// This component will be used to create a form for adding new expenses. It will be used in the ExpenseModal component.

import { useState } from "react";
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date(),
    });
  

  return (
    <form className="space-y-5">
        <legend
            className="uppercase text-center text-2xl font-black boder-b-4 border-blue-500 py-2"
        >
            Add New Expense
        </legend>

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
                placeholder="Select a category"
                className="bg-slate-100 p-2"
                name="category"
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
            />
        </div>

        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            name="note"
            value="Expense Register"
        />
    </form>
  )
}
