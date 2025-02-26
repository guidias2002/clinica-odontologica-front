import { SidebarItem } from './SidebarItem';
import { useState } from 'react';
import { DashboardOutlined, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, LocalHospitalOutlined, PersonOutline } from '@mui/icons-material';

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className={`h-screen ${expanded ? "w-74" : "w-20"} transition-all duration-300`}>
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
                    <SidebarItem icon={<DashboardOutlined />} text="Consultas" expanded={expanded} />
                    <SidebarItem icon={<PersonOutline />} text="Pacientes" expanded={expanded} />
                    <SidebarItem icon={<LocalHospitalOutlined />} text="Profissionais" expanded={expanded} />
                </ul>
            </nav>
        </aside>
    );
}

