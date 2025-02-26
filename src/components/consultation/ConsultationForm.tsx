import axios from "axios";
import { useEffect, useState } from "react"
import { Patient } from "../../interface/Patient";
import { Professional } from "../../interface/Professional";
import { AvailableTime } from "../../interface/AvailableTime";
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Consultation } from "../../interface/Consultation";

const ConsultationForm = () => {

    const [cpf, setCpf] = useState("");
    const [idProfessional, setIdProfessional] = useState(0);
    const [professionalName, setProfessionalName] = useState<string>("");
    const [date, setDate] = useState("");
    const [professionalData, setProfessionalData] = useState<Professional[] | null>();
    const [availableTimeData, setAvailableTimeData] = useState<AvailableTime[] | null>();
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const [consultation, setConsultation] = useState<Consultation>({
        patientName: "",
        patientEmail: "",
        patientCellphone: "",
        patientCpf: "",
        professionalId: 0,
        professionalName: "",
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

        const updatedConsultation = {
            ...consultation,
            patientName: patientData?.name,
            patientCellphone: patientData?.cellphone,
            patientEmail: patientData?.email,
            patientCpf: cpf,
            professionalId: Number(idProfessional),
            professionalName: professionalName,
            consultationDate: date,
        };

        try {
            await axios.post("http://localhost:8080/consultation", updatedConsultation);
            alert("Consulta cadastrada com sucesso");
        } catch (error) {
            console.log("Erro ao cadastrar consulta", error);
        }
    };


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;
        setConsultation((prev) => ({ ...prev, [name]: value }));
    };


    const handleProfessionalChange = (event: SelectChangeEvent<number>) => {
        const selectedId = event.target.value as number;
        setIdProfessional(selectedId);

        const selectedProfessional = professionalData?.find(prof => prof.id === selectedId);
        setProfessionalName(selectedProfessional ? selectedProfessional.name : "");
    };


    return (
        <form onSubmit={handleSubmit}>

            {/* Dados do Paciente */}
            <div>
                <TextField
                    id="cpf"
                    label="CPF"
                    variant="outlined"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    onBlur={fetchPatientData}
                />

                <TextField
                    id="name"
                    label="Nome"
                    value={patientData?.name || ""}
                    variant="outlined"
                    disabled
                />

                <TextField
                    id="email"
                    label="Email"
                    value={patientData?.email || ""}
                    variant="outlined"
                    disabled
                />

                <TextField
                    id="cellphone"
                    label="Telefone"
                    value={patientData?.cellphone || ""}
                    variant="outlined"
                    disabled
                />
            </div>

            {/* Dados da Consulta */}
            <div>
                <Select name="professionalId" value={idProfessional} onChange={handleProfessionalChange} displayEmpty required>
                    <MenuItem value="" disabled>Selecione o profissional</MenuItem>
                    {professionalData?.map((professional) => (
                        <MenuItem key={professional.id} value={professional.id}>{professional.name}</MenuItem>
                    ))}
                </Select>

                <TextField
                    label="Procedimento"
                    name="consultationType"
                    variant="outlined"
                    onChange={handleChange}
                />

                <TextField
                    label="Observações"
                    name="observations"
                    variant="outlined"
                    onChange={handleChange}
                />

                <TextField
                    type="date"
                    name="consultationDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                {availableTimeData?.map((time) => (
                    <span
                        key={time.id}
                        onClick={() => setConsultation(prev => ({ ...prev, consultationTime: time.time }))}
                        style={{
                            color: time.booked ? "red" : "black",
                            cursor: time.booked ? "not-allowed" : "pointer",
                            textDecoration: time.booked ? "line-through" : "none",
                            padding: "5px",
                            margin: "5px",
                            border: time.booked ? "none" : "1px solid black",
                            borderRadius: "5px",
                            display: "inline-block"
                        }}
                    >
                        {time.time}
                    </span>
                ))}

                <Select name="status" value={consultation.status} onChange={handleChange} displayEmpty required>
                    <MenuItem value="" disabled>Status da consulta</MenuItem>
                    <MenuItem value="AGENDADA">Agendada</MenuItem>
                    <MenuItem value="REALIZADA">Realizada</MenuItem>
                    <MenuItem value="REMARCADA">Remarcada</MenuItem>
                    <MenuItem value="CANCELADA">Cancelada</MenuItem>
                </Select>
            </div>

            {/* Pagamento */}
            <div>
                <TextField
                    label="Valor da Consulta (R$)"
                    name="consultationValue"
                    type="number"
                    variant="outlined"
                    value={consultation.consultationValue}
                    onChange={handleChange}
                    required
                />

                <Select name="paymentMethod" value={consultation.paymentMethod} onChange={handleChange} displayEmpty required>
                    <MenuItem value="" disabled>Método de pagamento</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                    <MenuItem value="PIX">PIX</MenuItem>
                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                </Select>

                <Select name="paymentStatus" value={consultation.paymentStatus} onChange={handleChange} displayEmpty required>
                    <MenuItem value="" disabled>Status do pagamento</MenuItem>
                    <MenuItem value="Pago">Pago</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                </Select>
            </div>

            <div>
                <Button>Cancelar</Button>
                <Button type="submit">Enviar</Button>
            </div>

        </form>
    );
}

export default ConsultationForm;