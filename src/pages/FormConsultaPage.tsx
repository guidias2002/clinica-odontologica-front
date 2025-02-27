import { Divider } from "@mui/material";
import ConsultationForm from "../components/consultation/ConsultationForm";
import Sidebar from "../components/sidebar/Sidebar";

export default function FormConsultationPage() {

    return (
        <main className="flex bg-gray-100">
            <Sidebar />

            <div className="flex flex-1 justify-center items-center">
                <div className="flex flex-col p-8 w-[800px] gap-4">
                    <div className="">
                        <h2 className="text-xl font-semibold">Nova consulta</h2>
                        <p className="text-gray-600">Preencha o formulário</p>
                    </div>

                    <Divider className="w-full" />

                    <ConsultationForm />
                </div>
            </div>
        </main>
    )
}