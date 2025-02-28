import { ThemeProvider } from '@mui/material'
import './App.css'
import theme from './theme'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormConsultationPage from './pages/FormConsultaPage';
import ConsultationPage from './pages/ConsultationPage';
import PatientPage from './pages/PatientPage';
import ProfessionalPage from './pages/ProfessionalPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<ConsultationPage />} />
          <Route path="/register-consultation" element={<FormConsultationPage />} />
          <Route path="/register-patient" element={<PatientPage />} />
          <Route path="/register-professional" element={<ProfessionalPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
