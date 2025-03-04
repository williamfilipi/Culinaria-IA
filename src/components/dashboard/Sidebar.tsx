import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cake,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle();
  };

  return (
    <aside
      className={cn(
        "h-full bg-pink-50 border-r border-pink-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-[280px]",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-pink-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center">
            <Cake className="text-pink-700" size={20} />
          </div>
          {!isCollapsed && (
            <h1 className="ml-3 font-bold text-pink-800 text-lg">
              Sweet Dreams
            </h1>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="text-pink-700 hover:bg-pink-100"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {[
            { icon: <Home size={20} />, label: "Dashboard", active: true },
            {
              icon: <ShoppingBag size={20} />,
              label: "Pedidos",
              active: false,
            },
            { icon: <Package size={20} />, label: "Produtos", active: false },
            { icon: <Users size={20} />, label: "Clientes", active: false },
            {
              icon: <Calendar size={20} />,
              label: "Calendário",
              active: false,
            },
            {
              icon: <BarChart3 size={20} />,
              label: "Relatórios",
              active: false,
            },
          ].map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-medium",
                  isCollapsed ? "px-2" : "px-3",
                  item.active
                    ? "bg-pink-200 text-pink-800 hover:bg-pink-200"
                    : "text-pink-700 hover:bg-pink-100",
                )}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-pink-200">
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-pink-700 hover:bg-pink-100",
                isCollapsed ? "px-2" : "px-3",
              )}
            >
              <Settings size={20} />
              {!isCollapsed && <span>Configurações</span>}
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-pink-700 hover:bg-pink-100",
                isCollapsed ? "px-2" : "px-3",
              )}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Sair</span>}
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
