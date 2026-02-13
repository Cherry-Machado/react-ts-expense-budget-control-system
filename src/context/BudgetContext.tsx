import { useReducer, createContext, useMemo } from "react";
import { type Dispatch, type ReactNode } from "react";
import { type BudgetActions, type BudgetState, budgetReducer, initiateSate } from "../reducers/budget-reducer";
//import { useBudget } from "../hooks/useBudget";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
  
}

type BudgetProviderProps = {
  children: ReactNode;
}

// Context creation with type definition
export const BudgetContext = createContext<BudgetContextProps>(null!);

//This component will wrap the entire app, and provide the state and dispatch to all components that need it
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    // useReducer hook to manage complex state logic
    const [state, dispatch] = useReducer(budgetReducer, initiateSate);

  
    // Calculate total expenses and remaining budget. useMemo ensures these are only recalculated when expenses or budget change.
    const totalExpenses = useMemo ( () => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]);
    const remainingBudget = state.budget - totalExpenses;

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}