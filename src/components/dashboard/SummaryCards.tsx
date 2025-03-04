import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  Truck,
  AlertTriangle,
} from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: string;
}

const SummaryCard = ({
  title = "Título",
  value = "R$ 0,00",
  change,
  icon = <ShoppingBag size={20} />,
  color = "bg-pink-100",
}: SummaryCardProps) => {
  return (
    <Card className={`${color} border-none shadow-md`}>
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-1">
              {change.isPositive ? (
                <ArrowUp className="text-green-500 mr-1" size={14} />
              ) : (
                <ArrowDown className="text-red-500 mr-1" size={14} />
              )}
              <span
                className={`text-xs ${change.isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {change.value}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${color === "bg-pink-100" ? "bg-pink-200" : color === "bg-amber-100" ? "bg-amber-200" : color === "bg-blue-100" ? "bg-blue-200" : "bg-red-200"}`}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  dailySales?: SummaryCardProps;
  pendingOrders?: SummaryCardProps;
  deliveries?: SummaryCardProps;
  stockAlerts?: SummaryCardProps;
}

const SummaryCards = ({
  dailySales = {
    title: "Vendas Diárias",
    value: "R$ 2.850,00",
    change: {
      value: "12% vs ontem",
      isPositive: true,
    },
    icon: <ShoppingBag size={20} />,
    color: "bg-pink-100",
  },
  pendingOrders = {
    title: "Pedidos Pendentes",
    value: "18",
    change: {
      value: "3 novos hoje",
      isPositive: false,
    },
    icon: <ShoppingBag size={20} />,
    color: "bg-amber-100",
  },
  deliveries = {
    title: "Entregas do Dia",
    value: "7",
    change: {
      value: "2 em trânsito",
      isPositive: true,
    },
    icon: <Truck size={20} />,
    color: "bg-blue-100",
  },
  stockAlerts = {
    title: "Alertas de Estoque",
    value: "4",
    change: {
      value: "Itens em baixa",
      isPositive: false,
    },
    icon: <AlertTriangle size={20} />,
    color: "bg-red-100",
  },
}: SummaryCardsProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard {...dailySales} />
        <SummaryCard {...pendingOrders} />
        <SummaryCard {...deliveries} />
        <SummaryCard {...stockAlerts} />
      </div>
    </div>
  );
};

export default SummaryCards;
