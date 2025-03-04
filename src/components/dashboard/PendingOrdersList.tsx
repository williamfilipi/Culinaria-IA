import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Calendar, Package, ChevronRight } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  deliveryDate: string;
  status: "pending" | "in-progress" | "ready";
  items: OrderItem[];
}

interface PendingOrdersListProps {
  orders?: Order[];
  onViewOrder?: (orderId: string) => void;
}

const PendingOrdersList = ({
  orders = [
    {
      id: "ORD-001",
      customer: "Maria Silva",
      date: "2023-06-15",
      deliveryDate: "2023-06-18",
      status: "pending",
      items: [
        { id: "item1", name: "Bolo de Chocolate", quantity: 1 },
        { id: "item2", name: "Cupcakes", quantity: 12 },
      ],
    },
    {
      id: "ORD-002",
      customer: "João Santos",
      date: "2023-06-15",
      deliveryDate: "2023-06-17",
      status: "in-progress",
      items: [
        { id: "item3", name: "Torta de Morango", quantity: 1 },
        { id: "item4", name: "Brigadeiros", quantity: 50 },
      ],
    },
    {
      id: "ORD-003",
      customer: "Ana Oliveira",
      date: "2023-06-16",
      deliveryDate: "2023-06-19",
      status: "pending",
      items: [
        { id: "item5", name: "Bolo de Casamento", quantity: 1 },
        { id: "item6", name: "Docinhos Sortidos", quantity: 100 },
      ],
    },
    {
      id: "ORD-004",
      customer: "Carlos Mendes",
      date: "2023-06-16",
      deliveryDate: "2023-06-18",
      status: "ready",
      items: [{ id: "item7", name: "Torta de Limão", quantity: 2 }],
    },
    {
      id: "ORD-005",
      customer: "Fernanda Lima",
      date: "2023-06-17",
      deliveryDate: "2023-06-20",
      status: "pending",
      items: [
        { id: "item8", name: "Bolo de Aniversário", quantity: 1 },
        { id: "item9", name: "Mini Quiches", quantity: 30 },
      ],
    },
  ],
  onViewOrder = () => {},
}: PendingOrdersListProps) => {
  // Function to format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Function to get badge variant based on status
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return { variant: "default" as const, label: "Pendente" };
      case "in-progress":
        return { variant: "secondary" as const, label: "Em Produção" };
      case "ready":
        return { variant: "outline" as const, label: "Pronto" };
      default:
        return { variant: "default" as const, label: "Pendente" };
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md border-pink-100">
      <CardHeader className="bg-pink-50 rounded-t-xl">
        <CardTitle className="text-xl font-bold text-pink-800 flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Pedidos Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[250px] w-full">
          <div className="p-4 space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col p-3 rounded-lg border border-pink-100 hover:bg-pink-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-pink-900">
                      {order.customer}
                    </h3>
                    <p className="text-sm text-gray-500">{order.id}</p>
                  </div>
                  <Badge variant={getStatusBadge(order.status).variant}>
                    {getStatusBadge(order.status).label}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {order.items.map((item) => (
                    <span
                      key={item.id}
                      className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full"
                    >
                      {item.quantity}x {item.name}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Entrega: {formatDate(order.deliveryDate)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-700 hover:text-pink-900 hover:bg-pink-100"
                    onClick={() => onViewOrder(order.id)}
                  >
                    Detalhes
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PendingOrdersList;
