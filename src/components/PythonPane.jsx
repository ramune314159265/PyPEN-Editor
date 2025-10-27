import { Tooltip } from '@/components/ui/tooltip'
import { Box, Flex, IconButton, Spinner, Stack } from '@chakra-ui/react'
import * as monaco from 'monaco-editor'
import { MonacoPyrightProvider } from 'monaco-pyright-lsp'
import { useEffect, useRef, useState } from 'react'
import { HiArrowDownTray, HiPlay } from 'react-icons/hi2'
import { useLastFocused } from '../atoms/focused'
import { usePython } from '../atoms/python'
import { useRunner } from '../atoms/runner'
import { PythonRunner } from '../utils/python'

export const PythonPane = () => {
	const paneId = 'python'
	const [pythonContent, { setPythonContent }] = usePython()
	const [runner, { setRunner, clearRunner }] = useRunner()
	const [lastFocused, { setLastFocused }] = useLastFocused()
	const [value, setValue] = useState('')
	const [fileHandler, setFileHandler] = useState(null)
	const editorRef = useRef(null)
	const lastFocusedRef = useRef(lastFocused)

	const runPython = async () => {
		if (runner) {
			abortRunner()
		}
		const pythonRunner = new PythonRunner(pythonContent)
		setRunner(pythonRunner)
	}
	const saveNewFile = async () => {
		const handler = await window.showSaveFilePicker({
			suggestedName: 'python.py',
			types: [
				{
					description: "Pythonファイル",
					accept: { "text/python": [".py"] },
				},
			]
		})

		setFileHandler(handler)
		const stream = await handler.createWritable()
		const blob = new Blob([pythonContent], { type: 'text/plain' })

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
		if (!(runner instanceof PythonRunner)) {
			return
		}
		(async () => {
			await (new Promise(r => setTimeout(r, 0)))
			await runner.run()
			setRunner(null)
		})()
	}, [runner])

	useEffect(() => {
		if (value === pythonContent) {
			return
		}
		editorRef.current.getModel().setValue(pythonContent)
		setValue(pythonContent)
	}, [pythonContent])

	useEffect(() => {
		lastFocusedRef.current = lastFocused
	}, [lastFocused])

	return (
		<Flex w="full" h="full" direction="column">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" gap={2} w="full">
				<Tooltip showArrow content="Pythonコードを実行(Ctrl + R)">
					<IconButton size="sm" variant="ghost" onClick={runPython} disabled={runner}>
						{
							runner ? <Spinner /> : <HiPlay />
						}
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

					const provider = new MonacoPyrightProvider('5261.js')

					const editor = monaco.editor.create(e, {
						value: '',
						theme: 'vs-dark',
						language: 'python',
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
								runPython()
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
						setValue(editor.getValue())
						setPythonContent(editor.getValue())
					})

					editor.onDidFocusEditorText(() => {
						setLastFocused(paneId)
					})

					await provider.init(monaco)

					await provider.setupDiagnostics(editor)
				})()
			}}>
			</Box>
		</Flex >
	)
}
