import { ThemeProvider } from '@mui/material'
import './App.css'
import ConsultationForm from './components/consultation/ConsultationForm'
import theme from './theme'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ConsultationForm/>
    </ThemeProvider>
  )
}

export default App
