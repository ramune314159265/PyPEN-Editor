import { Box, Flex, Heading, HStack } from '@chakra-ui/react'

export const Header = () => {
	return (
		<Box bg="bg.panel" height="full" px="1rem" userSelect="none">
			<Flex height="full" alignItems="center" justifyContent="space-between">
				<Heading>
					PyPEN エディター
				</Heading>
				<HStack>
				</HStack>
			</Flex>
		</Box >
	)
}
