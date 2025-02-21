import axios from "axios";
import { useEffect, useState } from "react"
import { Patient } from "../../interface/Patient";
import { Professional } from "../../interface/Professional";
import { AvailableTime } from "../../interface/AvailableTime";
import { MenuItem, Select, TextField } from "@mui/material";

const ConsultationForm = () => {


    const [cpf, setCpf] = useState("");
    const [idProfessional, setIdProfessional] = useState("");
    const [date, setDate] = useState("");
    const [patientData, setPatientData] = useState<Patient | null>();
    const [professionalData, setProfessionalData] = useState<Professional[] | null>();
    const [availableTimeData, setAvailableTimeData] = useState<AvailableTime[] | null>();

    const fetchPatientData = async () => {
        if (!cpf) return;

        try {
            const response = await axios.get<Patient>(`http://localhost:8080/patient/getPatientByCpf/${cpf}`);
            setPatientData(response.data);
        } catch (error) {
            console.error("Erro ao buscar paciente:", error);
            setPatientData(null);
        }
    };


    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await axios.get<Professional[]>(`http://localhost:8080/professional/getAllProfessional`)
                setProfessionalData(response.data);
            } catch (error) {
                console.log("Erro ao buscar profissionais.")
            }
        };

        fetchProfessionals();
    }, [])


    useEffect(() => {

        if (idProfessional && date) {
            const fetchHoursPerDay = async () => {
                try {
                    const response = await axios.get<AvailableTime[]>(`http://localhost:8080/availableTime/getProfessionalHoursPerDay/${idProfessional}/${date}`)
                    setAvailableTimeData(response.data);
                } catch (error) {
                    console.log("Erro ao buscar os horários do profissional.")
                }
            };

            fetchHoursPerDay();
        }
    }, [idProfessional, date]);


    return (
        <form>
            <TextField
                id="outlined-basic"
                label="CPF"
                variant="outlined"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                onBlur={fetchPatientData}
            />

            <TextField id="outlined-basic" label="Nome" value={patientData?.name} variant="outlined" />
            <TextField id="outlined-basic" label="Email" value={patientData?.email} variant="outlined" />
            <TextField id="outlined-basic" label="Telefone" value={patientData?.cellphone} variant="outlined" />

            <br />
            <br />

            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Profissional"
                onChange={(e) => setIdProfessional(e.target.value)}
            >
                {professionalData?.map((professional) => (
                    <MenuItem key={professional.id} value={professional.id}>{professional.name}</MenuItem>
                ))}
            </Select>


            <input type="text" placeholder="Procedimento" readOnly />
            <input type="text" placeholder="Observações" readOnly />
            <input type="date" onChange={(e) => setDate(e.target.value)} />


            {availableTimeData?.map((time) => (

                <a
                    key={time.id}
                    style={{ color: time.booked ? "red" : "black" }}
                >
                    {time.time}</a>
            ))}

            <select name="select">
                <option value="">Status da consulta</option>
                <option value="">Agendada</option>
                <option value="">Realizada</option>
                <option value="">Remarcada</option>
                <option value="">Cancelada</option>
            </select>
        </form>
    );
}

export default ConsultationForm;