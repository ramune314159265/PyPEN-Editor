import { Box, Grid } from '@chakra-ui/react'
import { Layout, Model } from 'flexlayout-react'
import { useEffect, useRef } from 'react'
import { useLayout } from './atoms/layout'
import { usePyPen } from './atoms/pypen'
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
	const launchHandled = useRef(false)

	const [pyPenContent, { setPyPenContent }] = usePyPen()
	useEffect(() => {
		if (launchHandled.current) {
			return
		}
		launchHandled.current = true
		if ("launchQueue" in window) {
			launchQueue.setConsumer(async (launchParams) => {
				const file = await launchParams.files[0].getFile()
				const reader = new FileReader()
				reader.readAsText(file)
				reader.addEventListener('load', () => {
					setPyPenContent(reader.result)
				})
			})
		}
	}, [])

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
