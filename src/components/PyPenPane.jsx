import { Grid, Stack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'

export const PyPenPane = () => {
	return (
		<Grid templateRows="2.5rem 1fr">
			<Stack justifyContent="center" paddingInline={4} gap={8}>
				<Text>PyPEN</Text>
			</Stack>
			<Editor width="100%" height="100%" defaultLanguage="text" theme="vs-dark" />
		</Grid>
	)
}
