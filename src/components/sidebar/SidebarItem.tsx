import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  expanded: boolean;
  link: string;
}

export function SidebarItem({ icon, text, expanded, link }: SidebarItemProps) {

  const location = useLocation(); 
  const isActive = location.pathname === link;

  return (
    <li>
      <Link
        to={link}
        className={`flex items-center gap-4 p-4 rounded-sm text-white no-underline transition-all duration-300
          ${isActive ? "bg-[#8c42f5]" : "hover:bg-[#8c42f5]"}`}
      >
        {icon}
        {expanded && <span>{text}</span>}
      </Link>
    </li>
  );
}