import { Divider } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

export default function PatientPage() {
    const [expanded, setExpanded] = useState(true); 

    return (
        <main className="flex flex-col bg-gray-100 min-h-screen">
    
            <Sidebar expanded={expanded} setExpanded={setExpanded} />

            <div className={`flex flex-1 justify-center items-center transition-all duration-300 ${expanded ? "ml-[296px]" : "ml-[80px]"}`}>
                <div className="flex flex-col p-8 w-[800px] gap-4">
                    <h2 className="text-xl font-semibold">Cadastrar paciente</h2>
                    <p className="text-gray-600">Preencha o formulário</p>

                    <Divider className="w-full" />

                </div>
            </div>
        </main>
    );
}