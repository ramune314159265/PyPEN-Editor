import { Box, Flex, Heading, HStack, Icon, Image } from '@chakra-ui/react'

export const Header = () => {
	return (
		<Box bg="bg.panel" height="full" px="1rem" userSelect="none">
			<Flex height="full" alignItems="center" justifyContent="space-between">
				<HStack gap={2}>
					<Icon asChild>
						<Image src='./icon.png' height={6} aspectRatio='1/1' draggable={false}></Image>
					</Icon>
					<Heading fontWeight='normal' size='lg' as='h1'>
						PyPEN エディター
					</Heading>
				</HStack>
				<HStack>
				</HStack>
			</Flex>
		</Box >
	)
}
