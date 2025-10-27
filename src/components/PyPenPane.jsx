import { Tooltip } from '@/components/ui/tooltip'
import { Box, Flex, IconButton, Spinner, Stack } from '@chakra-ui/react'
import * as monaco from 'monaco-editor'
import { useEffect, useRef, useState } from 'react'
import { FaPython } from 'react-icons/fa'
import { HiArrowDownTray, HiDocument, HiPlay } from 'react-icons/hi2'
import { useLastFocused } from '../atoms/focused'
import { useOutput } from '../atoms/output'
import { usePyPen } from '../atoms/pypen'
import { usePython } from '../atoms/python'
import { useRunner } from '../atoms/runner'
import { pyPenLanguageConfiguration, pyPenProvideCompletionItems, pyPenTokenizer } from '../utils/monacoPyPen'
import { PyPenRunner } from '../utils/pypen'

export const PyPenPane = () => {
	const paneId = 'pypen'
	const [pyPenContent, { setPyPenContent }] = usePyPen()
	const [pythonContent, { setPythonContent }] = usePython()
	const [runner, { setRunner, abortRunner }] = useRunner()
	const [output, { clearOutput, addOutputData }] = useOutput()
	const [lastFocused, { setLastFocused }] = useLastFocused()
	const [value, setValue] = useState('')
	const [fileHandler, setFileHandler] = useState(null)
	const editorRef = useRef(null)
	const lastFocusedRef = useRef(lastFocused)

	const runPyPen = async () => {
		abortRunner()
		const pyPenRunner = new PyPenRunner(pyPenContent)
		setRunner(pyPenRunner)
		await pyPenRunner.run()
		setRunner(null)
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
	const saveNewFile = async () => {
		const handler = await window.showSaveFilePicker({
			suggestedName: 'pypen.PyPEN',
			types: [
				{
					description: "PyPENファイル",
					accept: { "text/pypen": [".PyPEN"] },
				},
			]
		})

		setFileHandler(handler)
		const stream = await handler.createWritable()
		const blob = new Blob([pyPenContent], { type: 'text/plain' })

		await stream.write(blob)
		await stream.close()
	}
	const saveFile = async () => {
		if (!fileHandler) {
			saveNewFile()
			return
		}
		const stream = await fileHandler.createWritable()
		const blob = new Blob([pyPenContent], { type: 'text/plain' })

		await stream.write(blob)
		await stream.close()
	}

	useEffect(() => {
		if (value === pyPenContent) {
			return
		}
		editorRef.current.getModel().setValue(pyPenContent)
		setValue(pyPenContent)
	}, [pyPenContent])

	useEffect(() => {
		lastFocusedRef.current = lastFocused
	}, [lastFocused])

	return (
		<Flex w="full" h="full" direction="column">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" gap={2} w="full">
				<Tooltip showArrow content="PyPenコードを実行(Ctrl + R)">
					<IconButton size="sm" variant="ghost" onClick={runPyPen} disabled={runner}>
						{
							runner ? <Spinner /> : <HiPlay />
						}
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content="PyPENの文法">
					<a href="https://watayan.net/prog/PyPEN/manual/syntax.html" target='_blank'>
						<IconButton size="sm" variant="ghost">
							<HiDocument />
						</IconButton>
					</a>
				</Tooltip>
				<Tooltip showArrow content="PyPenからPythonに変換する">
					<IconButton size="sm" variant="ghost" onClick={convert}>
						<FaPython />
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content="保存">
					<IconButton size="sm" variant="ghost" onClick={saveNewFile}>
						<HiArrowDownTray />
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
						minimap: {
							enabled: false
						}
					})
					editorRef.current = editor
					document.addEventListener('keydown', ev => {
						if (lastFocusedRef.current !== paneId) {
							return
						}
						switch (true) {
							case (ev.key === 'r' && ev.ctrlKey): {
								ev.preventDefault()
								runPyPen()
								break
							}
							case (ev.key === 's' && ev.ctrlKey): {
								ev.preventDefault()
								saveFile()
								break
							}
						}
					})

					editor.getModel().onDidChangeContent(e => {
						setPyPenContent(editor.getValue())
						setValue(editor.getValue())
					})

					editor.onDidFocusEditorText(() => {
						setLastFocused(paneId)
					})
				})()
			}}>
			</Box>
		</Flex >
	)
}
