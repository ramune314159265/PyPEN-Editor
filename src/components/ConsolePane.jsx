import { Tooltip } from '@/components/ui/tooltip'
import { Box, Button, Flex, IconButton, Input, Stack, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { HiNoSymbol } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'
import { useRunner } from '../atoms/runner'

export const ConsolePane = () => {
	const [outputData, { addOutputData, clearOutput }] = useOutput()
	const [runner] = useRunner()
	const [inputContent, setInputContent] = useState('')
	const [waitingForInput, setWaitingForInput] = useState(false)
	const consoleRef = useRef(null)
	const inputRef = useRef(null)

	useEffect(() => {
		if (!runner) {
			return
		}
		clearOutput()
		runner.on('output', e => {
			addOutputData({
				type: 'text',
				content: e
			})
		})
		runner.on('image', e => {
			addOutputData({
				type: 'image',
				content: e
			})
		})
		runner.on('error', e => {
			addOutputData({
				type: 'error',
				content: e
			})
		})
		runner.on('inputRequest', () => {
			setWaitingForInput(true)
			inputRef.current.focus()
		})
	}, [runner])

	useEffect(() => {
		consoleRef.current.scrollTop = consoleRef.current.scrollHeight
	}, [outputData])

	const input = () => {
		if (!inputContent) {
			return
		}
		if (!runner) {
			return
		}
		runner.emit('input', inputContent)
		setInputContent('')
		setWaitingForInput(false)
	}

	return (
		<Flex direction="column" w="full" h="30%">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" paddingInline={4} gap={2} w="full" h="2.5rem">
				<Text>出力</Text>
				<Tooltip showArrow content="出力をクリア">
					<IconButton variant="ghost" onClick={() => clearOutput()}>
						<HiNoSymbol />
					</IconButton>
				</Tooltip>
			</Stack>
			<Box
				width="full"
				height="calc(100% - 5rem)"
				padding={2}
				flexDirection="column"
				background="#000000"
				color="#ffffff"
				fontFamily="consolas, monospace"
				fontSize={16}
				lineHeight={1.25}
				overflowX="hidden"
				overflowY="auto"
				whiteSpace="pre-wrap"
				ref={consoleRef}
			>
				{
					outputData.map((d, i) => {
						switch (d.type) {
							case 'text': {
								return (<span key={i}>{d.content}</span>)
							}
							case 'error': {
								return (<span style={{ color: '#dc2626' }} key={i}>{d.content}</span>)
							}
							case 'image': {
								return (<img src={d.content} key={i} style={{ background: '#ffffff' }} />)
							}
							default: {
								return (<span key={i}>{d.content}</span>)
							}
						}
					})
				}
			</Box>
			<Stack alignItems="center" direction="row" w="full" h="2.5rem" gap={0}>
				<Input
					placeholder={waitingForInput ? 'ここに入力...' : '入力欄'}
					disabled={!waitingForInput}
					w="calc(100% - 3rem)"
					ref={inputRef}
					value={inputContent}
					onInput={e => setInputContent(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') input()
					}}
				/>
				<Button w="3rem" onClick={input} disabled={!waitingForInput}>入力</Button>
			</Stack>
		</Flex>
	)
}
