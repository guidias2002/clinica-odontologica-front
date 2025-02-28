import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export default function FilterConsultation() {

    const [status, setStatus] = useState("");

    return (
        <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-4">
            <TextField
                id="nome"
                label="Nome do paciente"
                variant="outlined"
                fullWidth
            />

            <Select 
                name="status" 
                onChange={(e) => setStatus(e.target.value)} 
                value={status} 
                displayEmpty 
                required 
                fullWidth
            >
                <MenuItem value="" disabled>Status da consulta</MenuItem>
                <MenuItem value="AGENDADA">Agendada</MenuItem>
                <MenuItem value="REALIZADA">Realizada</MenuItem>
                <MenuItem value="REMARCADA">Remarcada</MenuItem>
                <MenuItem value="CANCELADA">Cancelada</MenuItem>
            </Select>
        </div>
    );
}