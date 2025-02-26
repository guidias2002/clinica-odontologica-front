interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    expanded: boolean;
  }

export function SidebarItem({ icon, text, expanded }: SidebarItemProps) {
    return (
      <li className="flex items-center gap-4 p-4 hover:bg-[#8c42f5] rounded-sm">
        {icon}
        {expanded && <span>{text}</span>}
      </li>
    );
  }