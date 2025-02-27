import { ThemeProvider } from '@mui/material'
import './App.css'
import theme from './theme'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormConsultationPage from './pages/FormConsultaPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/nova-consulta" element={<FormConsultationPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
