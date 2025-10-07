import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useOutput } from '../atoms/output'

export const ConsolePane = () => {
	const [outputData] = useOutput()

	return (
		<Flex direction="column" w="full" h="30%">
			<Stack h="2.5rem" justifyContent="center" paddingInline={4} gap={8}>
				<Text>出力</Text>
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
