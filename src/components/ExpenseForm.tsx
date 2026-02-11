// This component will be used to create a form for adding new expenses. It will be used in the ExpenseModal component.

import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {
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
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseAmount"
                className="text-xl"
            >
                Amount:
            </label>

            <input
                type="number"
                id="expenseAmount"
                placeholder="Add the expense amount ex. 100"
                className="bg-slate-100 p-2"
                name="expenseAmount"
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
                htmlFor="expenseAmount"
                className="text-xl"
            >
                Expense Date:
            </label>

            <DatePicker
                className="bg-slate-100 p-2 border-0"
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
