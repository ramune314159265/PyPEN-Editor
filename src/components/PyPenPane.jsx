import { Tooltip } from '@/components/ui/tooltip'
import { Box, Flex, IconButton, Spinner, Stack, Text } from '@chakra-ui/react'
import * as monaco from 'monaco-editor'
import { useEffect, useRef, useState } from 'react'
import { HiArrowLongRight, HiDocument, HiPlay } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'
import { usePyPen } from '../atoms/pypen'
import { usePython } from '../atoms/python'
import { pyPenLanguageConfiguration, pyPenProvideCompletionItems, pyPenTokenizer } from '../utils/monacoPyPen'
import { PyPenRunner } from '../utils/pypen'

export const PyPenPane = () => {
	const [pyPenContent, { setPyPenContent }] = usePyPen()
	const [pythonContent, { setPythonContent }] = usePython()
	const [output, { clearOutput, addOutputData }] = useOutput()
	const [isRunning, setIsRunning] = useState(false)
	const [value, setValue] = useState('')
	const editorRef = useRef(null)

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
		try {
			const converted = await PyPenRunner.convert(pyPenContent)
			setPythonContent(converted)
		} catch (e) {
			addOutputData({
				type: 'error',
				content: e
			})
		}
	}

	useEffect(() => {
		if (value === pyPenContent) {
			return
		}
		editorRef.current.getModel().setValue(pyPenContent)
		setValue(pyPenContent)
	}, [pyPenContent])

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
				<Tooltip showArrow content="PyPENの文法">
					<IconButton variant="ghost">
						<a href="https://watayan.net/prog/PyPEN/manual/syntax.html" target='_blank'>
							<HiDocument />
						</a>
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content="PyPenからPythonに変換する">
					<IconButton variant="ghost" onClick={convert}>
						<HiArrowLongRight />
					</IconButton>
				</Tooltip>
			</Stack>
			<Box w="full" h="calc(100% - 2.5rem)" ref={e => {
				(async () => {
					if (editorRef.current !== null) {
						return
					}

					monaco.languages.register({
						id: 'pypen'
					})
					monaco.languages.registerCompletionItemProvider('pypen', {
						provideCompletionItems: pyPenProvideCompletionItems
					})
					monaco.languages.setMonarchTokensProvider('pypen', {
						tokenizer: pyPenTokenizer
					})
					monaco.languages.setLanguageConfiguration('pypen', pyPenLanguageConfiguration)
					const editor = monaco.editor.create(e, {
						value: '',
						theme: 'vs-dark',
						language: 'pypen',
						automaticLayout: true,
					})
					editorRef.current = editor

					editor.getModel().onDidChangeContent(e => {
						setPyPenContent(editor.getValue())
						setValue(editor.getValue())
					})
				})()
			}}>
			</Box>
		</Flex >
	)
}
