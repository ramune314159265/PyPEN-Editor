import { Box, Flex, IconButton, Spinner, Stack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'
import { usePyPen } from '../atoms/pypen'
import { PyPenRunner } from '../utils/pypen'

export const PyPenPane = () => {
	const [pyPenContent, { setPyPenContent }] = usePyPen()
		const [output, { clearOutput, addOutputData }] = useOutput()
	const [isRunning, setIsRunning] = useState(false)

	const runPyPen = async () => {
		setIsRunning(true)
		clearOutput()
		const pyPenRunner = new PyPenRunner(pyPenContent)
		pyPenRunner.on('output', e => {
			addOutputData({
				type: 'text',
				content: e
			})
		})
		await pyPenRunner.run()
		setIsRunning(false)
	}

	return (
		<Flex w="calc(50% - calc(2.5rem / 2))" h="full" direction="column">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" paddingInline={4} gap={2} w="full" h="2.5rem">
				<Text>PyPEN</Text>
				<IconButton variant="ghost" onClick={runPyPen} disabled={isRunning}>
					{
						isRunning ? <Spinner /> : <HiPlay />
					}
				</IconButton>
			</Stack>
			<Box w="full" h="calc(100% - 2.5rem)">
				<Editor
					defaultLanguage="python"
					height="100%"
					width="100%"
					theme="vs-dark"
					value={pyPenContent}
					onChange={e => setPyPenContent(e)}
					options={{
						automaticLayout: true
					}}
				/>
			</Box>
		</Flex>
	)
}
