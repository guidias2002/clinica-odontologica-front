import { useEffect } from 'react';
import { SidebarItem } from './SidebarItem';
import { DashboardOutlined, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, LocalHospitalOutlined, PersonOutline } from '@mui/icons-material';

export default function Sidebar({ expanded, setExpanded }: any) {

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setExpanded(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <aside className={`h-screen ${expanded ? "w-74" : "w-20"} fixed transition-all duration-300`}>
            <nav className="h-full flex flex-col bg-[#8338EC] text-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {expanded && <span className="p-3 text-lg font-semibold">marcaAi</span>}

                    <button
                        className="p-3 rounded-lg hover:bg-[#8c42f5]"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                    </button>
                </div>

                <ul className="flex-1 px-3">
                    <SidebarItem icon={<DashboardOutlined />} text="Consultas" expanded={expanded} link="/" />
                    <SidebarItem icon={<PersonOutline />} text="Pacientes" expanded={expanded} link="/register-patient" />
                    <SidebarItem icon={<LocalHospitalOutlined />} text="Profissionais" expanded={expanded} link="/register-professional" />
                </ul>
            </nav>
        </aside>
    );
}

