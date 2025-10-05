import { Box, Flex, Grid } from '@chakra-ui/react'
import { ConsolePane } from './components/ConsolePane'
import { Header } from './components/Header'
import { PyPenPane } from './components/PyPenPane'
import { PythonPane } from './components/PythonPane'

function App() {
  return (
    <>
      <Grid templateRows="3rem calc(100% - 3rem)" w="100%" h="100%">
        <Header></Header>
        <Box w="100dvw" h="full">
          <Flex w="100%" h="70%" overflow="hidden">
            <PyPenPane></PyPenPane>
            <Box w="2.5rem"></Box>
            <PythonPane></PythonPane>
          </Flex>
          <ConsolePane></ConsolePane>
        </Box>
      </Grid>
    </>
  )
}

export default App
