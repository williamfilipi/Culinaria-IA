import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CalendarClock,
  ClipboardList,
  ShoppingBag,
  BarChart3,
  ArrowRight,
} from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const QuickAccessCard = ({
  title = "Card Title",
  description = "Card description goes here",
  icon = <ShoppingBag />,
  color = "bg-pink-100",
  onClick = () => {},
}: QuickAccessCardProps) => {
  return (
    <Card
      className={cn("cursor-pointer transition-all hover:shadow-md", color)}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm font-medium text-pink-600">
          Acessar
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

interface QuickAccessCardsProps {
  cards?: QuickAccessCardProps[];
}

const QuickAccessCards = ({
  cards = [
    {
      title: "Cadastro de Pedidos",
      description: "Registre novos pedidos e acompanhe o status de produção",
      icon: <ClipboardList className="h-5 w-5" />,
      color: "bg-pink-50",
    },
    {
      title: "Catálogo de Produtos",
      description: "Gerencie seu catálogo de doces e controle o estoque",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "bg-amber-50",
    },
    {
      title: "Perfis de Clientes",
      description: "Acesse informações de clientes e histórico de compras",
      icon: <CalendarClock className="h-5 w-5" />,
      color: "bg-rose-50",
    },
    {
      title: "Relatórios",
      description: "Visualize relatórios de vendas e desempenho do negócio",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-brown-50",
    },
  ],
}: QuickAccessCardsProps) => {
  return (
    <div className="w-full bg-white p-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Acesso Rápido
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <QuickAccessCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            color={card.color}
            onClick={card.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;
