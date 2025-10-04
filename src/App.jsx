import { Box, Grid } from '@chakra-ui/react'
import { Header } from './components/Header'
import { PyPenPane } from './components/PyPenPane'
import { PythonPane } from './components/PythonPane'

function App() {
  return (
    <>
      <Grid templateRows="3rem calc(100% - 3rem)" w="100%" h="100%">
        <Header></Header>
        <Grid templateColumns="1fr 2.5rem 1fr" w="100%" h="100%">
          <PyPenPane></PyPenPane>
          <Box></Box>
          <PythonPane></PythonPane>
        </Grid>
      </Grid>
    </>
  )
}

export default App
