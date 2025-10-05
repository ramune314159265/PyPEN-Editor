import { Box, Flex, IconButton, Spinner, Stack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'
import { usePython } from '../atoms/python'
import { PythonRunner } from '../utils/python'

export const PythonPane = () => {
	const [pythonContent, { setPythonContent }] = usePython()
	const [output, { clearOutput, addOutputData }] = useOutput()
	const [isRunning, setIsRunning] = useState(false)

	const runPython = async () => {
		setIsRunning(true)
		clearOutput()
		const pythonRunner = new PythonRunner(pythonContent)
		pythonRunner.on('output', e => {
			addOutputData({
				type: 'text',
				content: e
			})
		})
		await pythonRunner.run()
		setIsRunning(false)
	}

	return (
		<Flex w="calc(50% - calc(2.5rem / 2))" h="full" direction="column">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" paddingInline={4} gap={2} w="full" h="2.5rem">
				<Text>Python</Text>
				<IconButton variant="ghost" onClick={runPython} disabled={isRunning}>
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
					value={pythonContent}
					onChange={e => setPythonContent(e)}
					options={{
						automaticLayout: true
					}}
				/>
			</Box>
		</Flex >
	)
}
