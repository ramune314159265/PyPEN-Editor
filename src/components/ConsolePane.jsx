import { Tooltip } from '@/components/ui/tooltip'
import { Box, Button, Flex, Grid, IconButton, Input, NativeSelectField, NativeSelectIndicator, NativeSelectRoot, Stack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { HiNoSymbol, HiStop } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'
import { useRunner } from '../atoms/runner'

export const ConsolePane = () => {
	const [outputData, { addOutputData, clearOutput }] = useOutput()
	const [runner, { abortRunner }] = useRunner()
	const [inputContent, setInputContent] = useState('')
	const [waitingForInput, setWaitingForInput] = useState(false)
	const [inputMode, setInputMode] = useState('letter')
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
			setTimeout(() => inputRef.current.focus(), 0)
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

	const keyHandle = e => {
		if (inputMode === 'key') {
			runner.emit('input', e.key)
			e.preventDefault()
			setInputContent('')
			setWaitingForInput(false)
			return
		}
		if (e.key === 'Enter') input()
	}

	return (
		<Flex direction="column" w="full" h="full" position="relative">
			<Stack
				justifyContent="flex-start"
				alignItems="center"
				direction="row"
				position="absolute"
				top={0}
				right={0}
				h="2.5rem">
				<Tooltip showArrow content="出力をクリア">
					<IconButton size="xs" variant="ghost" onClick={() => clearOutput()}>
						<HiNoSymbol />
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content="中断">
					<IconButton size="xs" variant="ghost" onClick={() => abortRunner()}>
						<HiStop />
					</IconButton>
				</Tooltip>
			</Stack>
			<Box
				width="full"
				height="calc(100% - 2.5rem)"
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
			<Grid alignItems="center" gridTemplateColumns={"1fr 4.5rem 3rem"} w="full" h="2.5rem" gap={0}>
				<Input
					placeholder={waitingForInput ? 'ここに入力...' : '入力欄'}
					disabled={!waitingForInput}
					ref={inputRef}
					value={inputContent}
					onInput={e => setInputContent(e.target.value)}
					onKeyDown={keyHandle}
				/>
				<NativeSelectRoot>
					<NativeSelectField
						value={inputMode}
						onChange={e => setInputMode(e.currentTarget.value)}
					>
						<option value="letter">文字入力モード</option>
						<option value="key">キー入力モード</option>
					</NativeSelectField>
					<NativeSelectIndicator></NativeSelectIndicator>
				</NativeSelectRoot>
				<Button onClick={input} disabled={!waitingForInput || inputMode === 'key'}>入力</Button>
			</Grid>
		</Flex>
	)
}
