import axios from "axios";
import { useEffect, useState } from "react"
import { Patient } from "../../interface/Patient";
import { Professional } from "../../interface/Professional";
import { AvailableTime } from "../../interface/AvailableTime";
import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Consultation } from "../../interface/Consultation";

const ConsultationForm = () => {


    const [cpf, setCpf] = useState("");
    const [idProfessional, setIdProfessional] = useState("");
    const [date, setDate] = useState("");
    const [patientData, setPatientData] = useState<Patient | null>();
    const [professionalData, setProfessionalData] = useState<Professional[] | null>();
    const [availableTimeData, setAvailableTimeData] = useState<AvailableTime[] | null>();
    const [consultation, setConsultation] = useState<Consultation>({
        patientName: "",
        patientEmail: "",
        patientCellphone: "",
        patientCpf: "",
        professionalId: 0,
        professionalName: "",
        availableTimeId: 0,
        consultationDate: "",
        consultationTime: "",
        consultationType: "",
        estimatedDuration: 0,
        status: "",
        observations: "",
        consultationValue: 0,
        paymentMethod: "",
        paymentStatus: "",
        notificationSent: false,
      });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setConsultation((prev) => ({ ...prev, [name]: value }));
      };


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


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:8080/consultation", consultation)
            alert("cadastrado com sucesso")
        } catch (error) {
            console.log("Erro ao cadastrar consulta")
        }
    }


    return (
        <FormControl component="form" onSubmit={handleSubmit}>

            {/* dados do paciente */}
            <div>
                <TextField id="outlined-basic" label="CPF" variant="outlined" value={cpf} onChange={(e) => setCpf(e.target.value)} onBlur={fetchPatientData} />
                <TextField id="outlined-basic" label="Nome" value={patientData?.name} variant="outlined" />
                <TextField id="outlined-basic" label="Email" value={patientData?.email} variant="outlined" />
                <TextField id="outlined-basic" label="Telefone" value={patientData?.cellphone} variant="outlined" />
            </div>


            {/* dados da consulta */}
            <div>
                <Select labelId="demo-select-small-label" id="demo-select-small" label="Profissional" onChange={(e) => setIdProfessional(e.target.value)}>
                    <MenuItem value="" disabled>Selecione o profissional</MenuItem>
                    {professionalData?.map((professional) => (
                        <MenuItem key={professional.id} value={professional.id}>{professional.name}</MenuItem>
                    ))}
                </Select>

                <TextField label="Procedimento" variant="outlined" />
                <TextField label="Observações" variant="outlined" />
                <TextField type="date" onChange={(e) => setDate(e.target.value)} />


                {availableTimeData?.map((time) => (
                    <a key={time.id} style={{ color: time.booked ? "red" : "black" }}>
                        {time.time}
                    </a>
                ))}

                <Select name="select">
                    <MenuItem value="" disabled>Status da consulta</MenuItem>
                    <MenuItem value="">Agendada</MenuItem>
                    <MenuItem value="">Realizada</MenuItem>
                    <MenuItem value="">Remarcada</MenuItem>
                    <MenuItem value="">Cancelada</MenuItem>
                </Select>
            </div>

            <div>
                {/* Valor da Consulta */}
                <TextField label="Valor da Consulta (R$)" name="consultationValue" type="number" variant="outlined" required />

                {/* Método de Pagamento */}
                <Select name="paymentMethod" displayEmpty required>
                    <MenuItem value="" disabled>Selecione o método de pagamento</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                    <MenuItem value="PIX">PIX</MenuItem>
                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                </Select>

                {/* Status do Pagamento */}
                <Select name="paymentStatus" displayEmpty required>
                    <MenuItem value="" disabled>Selecione o status do pagamento</MenuItem>
                    <MenuItem value="Pago">Pago</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                </Select>
            </div>

            <div>
                <Button>Cancelar</Button>
                <Button type="submit">Enviar</Button>
            </div>
        </FormControl>
    );
}

export default ConsultationForm;