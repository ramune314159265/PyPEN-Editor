import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'

export const PyPenPane = () => {
	return (
		<Flex w="calc(50% - calc(2.5rem / 2))" h="full" direction="column">
			<Stack justifyContent="center" paddingInline={4} gap={8} w="full" h="2.5rem">
				<Text>PyPEN</Text>
			</Stack>
			<Box w="full" h="calc(100% - 2.5rem)">
				<Editor
					defaultLanguage="python"
					height="100%"
					width="100%"
					theme="vs-dark"
					options={{
						automaticLayout: true
					}}
				/>
			</Box>
		</Flex>
	)
}
