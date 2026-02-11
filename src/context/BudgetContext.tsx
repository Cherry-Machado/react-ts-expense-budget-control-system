import { useReducer, createContext } from "react";
import { type Dispatch, type ReactNode } from "react";
import { type BudgetActions, type BudgetState, budgetReducer, initiateSate } from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>; 
}

type BudgetProviderProps = {
  children: ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

//This component will wrap the entire app, and provide the state and dispatch to all components that need it
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initiateSate);

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}