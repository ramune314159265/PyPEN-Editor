import { Tooltip } from '@/components/ui/tooltip'
import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { HiNoSymbol } from 'react-icons/hi2'
import { useOutput } from '../atoms/output'

export const ConsolePane = () => {
	const [outputData, { clearOutput }] = useOutput()

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
				height="calc(100% - 2.5rem)"
				padding={2}
				flexDirection="column"
				background="#000000"
				fontFamily="consolas, monospace"
				fontSize={16}
				lineHeight={1.25}
				overflowX="hidden"
				overflowY="auto"
				whiteSpace="pre-wrap"
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
							default: {
								return (<span key={i}>{d.content}</span>)
							}
						}
					})
				}
			</Box>
		</Flex>
	)
}
