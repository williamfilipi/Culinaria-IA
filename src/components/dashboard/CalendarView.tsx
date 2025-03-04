import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarIcon, PlusIcon, FilterIcon } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "delivery" | "production";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  details?: string;
}

interface CalendarViewProps {
  events?: Event[];
  onAddEvent?: (date: Date) => void;
  onViewEvent?: (event: Event) => void;
}

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  "in-progress": "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};

const typeColors = {
  delivery: "bg-pink-100 text-pink-800 border-pink-200",
  production: "bg-amber-100 text-amber-800 border-amber-200",
};

const CalendarView = ({
  events = [
    {
      id: "1",
      title: "Bolo de Aniversário - Maria",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      type: "delivery",
      status: "pending",
      details: "Entrega às 14h",
    },
    {
      id: "2",
      title: "Cupcakes para Festa",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: "production",
      status: "in-progress",
      details: "24 unidades",
    },
    {
      id: "3",
      title: "Torta de Morango - João",
      date: new Date(),
      type: "delivery",
      status: "completed",
      details: "Entregue às 10h",
    },
    {
      id: "4",
      title: "Docinhos para Casamento",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      type: "production",
      status: "pending",
      details: "200 unidades",
    },
  ] as Event[],
  onAddEvent = () => {},
  onViewEvent = () => {},
}: CalendarViewProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<string>("all");

  // Filter events based on selected filter
  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    if (filter === "delivery" || filter === "production")
      return event.type === filter;
    return event.status === filter;
  });

  // Group events by date for easier rendering
  const eventsByDate = filteredEvents.reduce(
    (acc, event) => {
      const dateStr = event.date.toDateString();
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  // Custom day renderer to show events on calendar
  const renderDay = (day: Date) => {
    const dateStr = day.toDateString();
    const dayEvents = eventsByDate[dateStr] || [];

    return dayEvents.length > 0 ? (
      <div className="relative h-full w-full">
        {dayEvents.slice(0, 2).map((event, i) => (
          <div
            key={event.id}
            className={`absolute bottom-${i === 0 ? "1" : "3"} left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${event.type === "delivery" ? "bg-pink-500" : "bg-amber-500"}`}
          />
        ))}
        {dayEvents.length > 2 && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-500" />
        )}
      </div>
    ) : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Calendário</h2>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="delivery">Entregas</SelectItem>
              <SelectItem value="production">Produção</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="in-progress">Em Andamento</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAddEvent(date || new Date())}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar evento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-grow">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: ({ date: day }) => renderDay(day),
          }}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-md font-medium text-gray-700 mb-2">
          {date ? (
            <>Eventos para {date.toLocaleDateString("pt-BR")}</>
          ) : (
            "Selecione uma data"
          )}
        </h3>

        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {date &&
            eventsByDate[date.toDateString()]?.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-md border cursor-pointer hover:shadow-md transition-shadow ${typeColors[event.type]}`}
                onClick={() => onViewEvent(event)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-xs mt-1">{event.details}</p>
                  </div>
                  <Badge className={statusColors[event.status]}>
                    {event.status === "pending" && "Pendente"}
                    {event.status === "in-progress" && "Em Andamento"}
                    {event.status === "completed" && "Concluído"}
                    {event.status === "cancelled" && "Cancelado"}
                  </Badge>
                </div>
              </div>
            ))}

          {(!date ||
            !eventsByDate[date.toDateString()] ||
            eventsByDate[date.toDateString()].length === 0) && (
            <div className="text-center py-4 text-gray-500">
              Nenhum evento para esta data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
