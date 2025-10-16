import { Box, Grid } from '@chakra-ui/react'
import { Layout, Model } from 'flexlayout-react'
import { useState } from 'react'
import { ConsolePane } from './components/ConsolePane'
import { Header } from './components/Header'
import { PyPenPane } from './components/PyPenPane'
import { PythonPane } from './components/PythonPane'
import './flexlayout.css'

const jsonModel = {
	global: {
		tabSetEnableSingleTabStretch: true,
		tabEnableClose: false,
		tabSetEnableClose: false
	},
	borders: [],
	layout: {
		type: 'row',
		id: '1',
		children: [
			{
				"type": "row",
				"id": "#5e34abe9-5513-4a6b-b62a-98476b278309",
				"children": [
					{
						type: 'row',
						weight: 70,
						children: [
							{
								type: 'tabset',
								weight: 50,
								children: [
									{
										type: 'tab',
										name: 'PyPEN',
										component: 'pypen'
									}
								]
							},
							{
								type: 'tabset',
								weight: 50,
								children: [
									{
										type: 'tab',
										name: 'Python',
										component: 'python',
									}
								]
							}
						]
					},
					{
						type: 'tabset',
						weight: 30,
						children: [
							{
								type: 'tab',
								name: '出力',
								component: 'console',
							}
						]
					}
				]
			}
		]
	},
	popouts: {}
}

function App() {
	const [model] = useState(Model.fromJson(jsonModel))
	const factory = (node) => {
		const comp = node.getComponent()
		if (comp === 'pypen') return <PyPenPane></PyPenPane>
		if (comp === 'python') return <PythonPane></PythonPane>
		if (comp === 'console') return <ConsolePane></ConsolePane>
		return <div>Unknown</div>
	}

	return (
		<Grid templateRows="3rem calc(100% - 3rem)" w="100dvw" h="100dvh" position="relative">
			<Header></Header>
			<Box position="relative" w="100%" h="100%">
				<Layout model={model} factory={factory} />
			</Box>
		</Grid>
	)
}

export default App
