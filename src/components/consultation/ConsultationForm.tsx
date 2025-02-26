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
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
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

    const handleTimeSelection = (time: string, booked: boolean) => {
        if (!booked) {
            setSelectedTime(time);
            setConsultation(prev => ({ ...prev, consultationTime: time }));
        }
    };


    return (

        <div className="flex items-center justify-center h-screen bg-gray-100">

            <form className="flex flex-col justify-center w-[800px] gap-6" onSubmit={handleSubmit}>

                {/* div main */}
                <div className="flex flex-col w-full gap-3">

                    <h3>Dados do paciente</h3>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 w-full">
                            <TextField
                                id="cpf"
                                label="CPF"
                                variant="outlined"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                onBlur={fetchPatientData}
                                fullWidth
                            />

                            <TextField
                                id="name"
                                label="Nome"
                                value={patientData?.name || ""}
                                variant="outlined"
                                disabled
                                fullWidth
                            />
                        </div>

                        <div className="flex gap-4 w-full">
                            <TextField
                                id="email"
                                label="Email"
                                value={patientData?.email || ""}
                                variant="outlined"
                                disabled
                                fullWidth
                            />

                            <TextField
                                id="cellphone"
                                label="Telefone"
                                value={patientData?.cellphone || ""}
                                variant="outlined"
                                disabled
                                fullWidth
                            />
                        </div>
                    </div>
                </div>

                {/* Dados da Consulta */}
                <div className="flex flex-col w-full gap-3">

                    <h3>Dados da consulta</h3>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 w-full">
                            <Select name="professionalId" value={idProfessional} onChange={handleProfessionalChange} displayEmpty required fullWidth>
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
                                fullWidth
                            />
                        </div>

                        <TextField
                            label="Observações"
                            name="observations"
                            variant="outlined"
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 w-1/2">
                            <TextField
                                type="date"
                                name="consultationDate"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                fullWidth
                            />

                            <Select name="status" value={consultation.status} onChange={handleChange} displayEmpty required fullWidth>
                                <MenuItem value="" disabled>Status da consulta</MenuItem>
                                <MenuItem value="AGENDADA">Agendada</MenuItem>
                                <MenuItem value="REALIZADA">Realizada</MenuItem>
                                <MenuItem value="REMARCADA">Remarcada</MenuItem>
                                <MenuItem value="CANCELADA">Cancelada</MenuItem>
                            </Select>

                        </div>

                        <div className="flex flex-col gap-2 w-1/2">
                            <p>Horários disponíveis</p>

                            <div className="flex flex-wrap gap-3">
                                {(availableTimeData?.length ?? 0) ? (
                                    availableTimeData?.map((time) => (
                                        <span
                                            key={time.id}
                                            onClick={() => handleTimeSelection(time.time, time.booked)}
                                            style={{
                                                color: "white",
                                                backgroundColor: time.booked 
                                                    ? "#BABABA" 
                                                    : selectedTime === time.time 
                                                        ? "#14f00c"
                                                        : "#8338EC",
                                                cursor: time.booked ? "not-allowed" : "pointer",
                                                padding: "8px",
                                                borderRadius: "5px",
                                                transition: "0.2s",
                                            }}
                                        >
                                            {time.time}
                                        </span>
                                    ))
                                ) : (
                                    <p style={{ color: "gray", fontStyle: "italic" }}>
                                        Selecione o profissional e a data.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagamento */}
                <div className="flex flex-col w-full gap-3">

                    <h3>Dados de pagamento</h3>

                    <div className="flex gap-4 w-full">
                        <TextField
                            label="Valor da Consulta (R$)"
                            name="consultationValue"
                            type="number"
                            variant="outlined"
                            value={consultation.consultationValue}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <Select name="paymentMethod" value={consultation.paymentMethod} onChange={handleChange} displayEmpty required fullWidth>
                            <MenuItem value="" disabled>Método de pagamento</MenuItem>
                            <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                            <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                            <MenuItem value="PIX">PIX</MenuItem>
                            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                        </Select>
                    </div>

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
        </div>
    );
}

export default ConsultationForm;