import { Box, Grid } from '@chakra-ui/react'
import { Layout, Model } from 'flexlayout-react'
import { useLayout } from './atoms/layout'
import { ConsolePane } from './components/ConsolePane'
import { Header } from './components/Header'
import { PyPenPane } from './components/PyPenPane'
import { PythonPane } from './components/PythonPane'
import './flexlayout.css'

function App() {
	const [layout, { saveLayout }] = useLayout()
	const factory = (node) => {
		const comp = node.getComponent()
		if (comp === 'pypen') return <PyPenPane></PyPenPane>
		if (comp === 'python') return <PythonPane></PythonPane>
		if (comp === 'console') return <ConsolePane></ConsolePane>
		return <div>Unknown</div>
	}
	const model = Model.fromJson(layout)

	return (
		<Grid templateRows="3rem calc(100% - 3rem)" w="100dvw" h="100dvh" position="relative">
			<Header></Header>
			<Box position="relative" w="100%" h="100%">
				<Layout
					model={model}
					factory={factory}
					onModelChange={() => saveLayout(model.toJson())}
				/>
			</Box>
		</Grid>
	)
}

export default App
