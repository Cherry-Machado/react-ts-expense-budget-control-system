
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number} }

export type BudgetState = {
    budget: number
}

export const initiateSate : BudgetState = {
    budget: 0
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
    return state
}