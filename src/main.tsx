import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap the App with BudgetProvider to make the context available globally */}
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
