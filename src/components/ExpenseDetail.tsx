// This component will be used to show the details of an expense when the user clicks on an expense in the list. It will show the name, amount, date, and category of the expense. It will also have a button to delete the expense and a button to edit the expense.
import { formatDate } from "../helpers"
import type { Expense} from "../types"
import AmountDisplay from "./AmountDisplay"

type ExpenseDetailProps = {
    expense: Expense
}
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
        <div>

        </div>
        <div>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{ formatDate(expense.date!.toString() || '')}</p>
        </div>

        <AmountDisplay
            amount={expense.amount}
        />
    </div>
  )
}
