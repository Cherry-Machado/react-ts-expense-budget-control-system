
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number} } |
    { type: 'show-modal'}

export type BudgetState = {
    budget: number
    modal: boolean
}

export const initiateSate : BudgetState = {
    budget: 0,
    modal: false
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

    return state
}