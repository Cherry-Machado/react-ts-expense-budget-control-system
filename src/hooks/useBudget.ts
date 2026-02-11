// Creating hook to easily access the budget context in any component
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBudget = () => {
    const context = useContext(BudgetContext);
    return context;
}