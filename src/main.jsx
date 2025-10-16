import { Provider } from "@/components/ui/provider"
import { Theme } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider>
			<Theme appearance="dark">
				<App />
			</Theme>
		</Provider>
	</StrictMode>,
)
