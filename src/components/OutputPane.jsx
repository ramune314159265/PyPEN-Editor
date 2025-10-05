import { Box, Flex, Stack, Text } from '@chakra-ui/react'

export const OutputPane = () => {
	return (
		<Flex direction="column" w="full" h="20%">
			<Stack h="2.5rem" justifyContent="center" paddingInline={4} gap={8}>
				<Text>出力</Text>
			</Stack>
			<Box
				width="full"
				height="calc(100% - 2.5rem)"
				padding={2}
				color="fg.muted"
				fontFamily="consolas, monospace"
				fontSize={18}
				lineHeight={1.25}
				overflowX="hidden"
				overflowY="auto"
				whiteSpace="collapse"
			>
			</Box>
		</Flex>
	)
}
