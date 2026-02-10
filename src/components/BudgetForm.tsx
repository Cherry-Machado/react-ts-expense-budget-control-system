import { useState } from 'react';

export default function BudgetForm() {

  const [budget, setBudget] = useState(0);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
    console.log(budget);
  }

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Set Budget
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          className="w-full bg-white border border-gray-200 p-2"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="Set your budget amount"
        />
      </div>

      <input 
        type="submit"
        value="Set Budget"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase" 
      />

    </form> 
  )
}
