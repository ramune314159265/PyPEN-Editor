import { Tooltip } from '@/components/ui/tooltip'
import { Box, Flex, IconButton, Spinner, Stack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { HiArrowLongRight, HiPlay } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'
import { usePyPen } from '../atoms/pypen'
import { usePython } from '../atoms/python'
import { PyPenRunner } from '../utils/pypen'

export const PyPenPane = () => {
	const [pyPenContent, { setPyPenContent }] = usePyPen()
	const [pythonContent, { setPythonContent }] = usePython()
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
	const convert = async () => {
		clearOutput()
		const converted = await PyPenRunner.convert(pyPenContent)
		setPythonContent(converted)
	}

	return (
		<Flex w="calc(50% - calc(2.5rem / 2))" h="full" direction="column">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" paddingInline={4} gap={2} w="full" h="2.5rem">
				<Text>PyPEN</Text>
				<Tooltip showArrow content="PyPenコードを実行">
					<IconButton variant="ghost" onClick={runPyPen} disabled={isRunning}>
						{
							isRunning ? <Spinner /> : <HiPlay />
						}
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content="PyPenからPythonに変換する">
					<IconButton variant="ghost" onClick={convert}>
						<HiArrowLongRight />
					</IconButton>
				</Tooltip>
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
