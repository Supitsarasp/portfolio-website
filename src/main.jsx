import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PortfolioErrorBoundary from './components/PortfolioErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioErrorBoundary><App /></PortfolioErrorBoundary>
  </StrictMode>,
)
