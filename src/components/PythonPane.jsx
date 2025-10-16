import { Tooltip } from '@/components/ui/tooltip'
import { Box, Flex, IconButton, Spinner, Stack } from '@chakra-ui/react'
import * as monaco from 'monaco-editor'
import { MonacoPyrightProvider } from 'monaco-pyright-lsp'
import { useEffect, useRef, useState } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { usePython } from '../atoms/python'
import { useRunner } from '../atoms/runner'
import { PythonRunner } from '../utils/python'

export const PythonPane = () => {
	const [pythonContent, { setPythonContent }] = usePython()
	const [runner, { setRunner, clearRunner }] = useRunner()
	const [value, setValue] = useState('')
	const editorRef = useRef(null)

	const runPython = async () => {
		if(runner) {
			runner.abort()
		}
		const pythonRunner = new PythonRunner(pythonContent)
		setRunner(pythonRunner)
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
					editor.addCommand(
						monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR,
						() => {
							runPython()
						}
					)

					editor.getModel().onDidChangeContent(e => {
						setValue(editor.getValue())
						setPythonContent(editor.getValue())
					})

					await provider.init(monaco)

					await provider.setupDiagnostics(editor)
				})()
			}}>
			</Box>
		</Flex >
	)
}
