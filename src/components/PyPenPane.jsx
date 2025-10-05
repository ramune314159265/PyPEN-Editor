import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { usePyPen } from '../atoms/pypen'

export const PyPenPane = () => {
	const [pyPenContent, { setPyPenContent }] = usePyPen()

	return (
		<Flex w="calc(50% - calc(2.5rem / 2))" h="full" direction="column">
			<Stack justifyContent="flex-start" alignItems="center" direction="row" paddingInline={4} gap={2} w="full" h="2.5rem">
				<Text>PyPEN</Text>
			</Stack>
			<Box w="full" h="calc(100% - 2.5rem)">
				<Editor
					defaultLanguage="python"
					height="100%"
					width="100%"
					theme="vs-dark"
					value={pyPenContent}
					onChange={e => setPyPenContent(e)}
					options={{
						automaticLayout: true
					}}
				/>
			</Box>
		</Flex>
	)
}
