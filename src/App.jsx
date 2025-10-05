import { Box, Flex, Grid } from '@chakra-ui/react'
import { Header } from './components/Header'
import { OutputPane } from './components/OutputPane'
import { PyPenPane } from './components/PyPenPane'
import { PythonPane } from './components/PythonPane'

function App() {
  return (
    <>
      <Grid templateRows="3rem calc(100% - 3rem)" w="100%" h="100%">
        <Header></Header>
        <Box w="100dvw" h="full">
          <Flex w="100%" h="80%" overflow="hidden">
            <PyPenPane></PyPenPane>
            <Box w="2.5rem"></Box>
            <PythonPane></PythonPane>
          </Flex>
          <OutputPane></OutputPane>
        </Box>
      </Grid>
    </>
  )
}

export default App
