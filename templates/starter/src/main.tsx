import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!
rootEl.style.margin = '0'
rootEl.style.padding = '0'

createRoot(rootEl).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
