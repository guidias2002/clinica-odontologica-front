import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import FilterConsultation from "../components/filter/FilterConsultation";
import { Divider } from "@mui/material";

export default function ConsultationPage() {

    const [expanded, setExpanded] = useState(true);

    return (
        <main className="flex flex-col bg-gray-100 min-h-screen">
            <Sidebar expanded={expanded} setExpanded={setExpanded} />

            <div className={`flex flex-1 flex-col p-8 gap-6 justify-start items-start transition-all duration-300 ${expanded ? "ml-[296px]" : "ml-[80px]"}`}>
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-[36px] text-[#8338EC]">Consultas</h2>

                    <Link
                        to="/register-consultation"
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#8338EC] text-white hover:bg-[#9c57f8] transition-all duration-300">
                        <AddToPhotosOutlinedIcon className="text-white" />
                        
                        <span className="text-sm font-medium">Nova consulta</span>
                    </Link>

                </div>

                <FilterConsultation/>
                <Divider className="w-full" />

            </div>
        </main>

    )
}