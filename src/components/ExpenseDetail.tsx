// This component will be used to show the details of an expense when the user clicks on an expense in the list. It will show the name, amount, date, and category of the expense. It will also have a button to delete the expense and a button to edit the expense.
import type { Expense} from "../types"

type ExpenseDetailProps = {
    expense: Expense
}
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  return (
    <div>
        ExpenseDetail
    </div>
  )
}
