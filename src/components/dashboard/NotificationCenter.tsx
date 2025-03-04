import React from "react";
import { Bell, Cake, Package, Settings, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "stock" | "birthday" | "order" | "system";
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onSettingsChange?: (setting: string, value: boolean) => void;
}

const NotificationCenter = ({
  notifications = [
    {
      id: "1",
      title: "Estoque baixo: Chocolate em pó",
      description: "O estoque está abaixo do mínimo definido (500g)",
      time: "10 minutos atrás",
      type: "stock",
      read: false,
    },
    {
      id: "2",
      title: "Aniversário: Maria Silva",
      description: "Cliente faz aniversário amanhã",
      time: "1 hora atrás",
      type: "birthday",
      read: false,
    },
    {
      id: "3",
      title: "Novo pedido: #1234",
      description: "Bolo de chocolate para entrega em 26/05",
      time: "3 horas atrás",
      type: "order",
      read: true,
    },
    {
      id: "4",
      title: "Estoque baixo: Farinha de trigo",
      description: "O estoque está abaixo do mínimo definido (2kg)",
      time: "5 horas atrás",
      type: "stock",
      read: true,
    },
    {
      id: "5",
      title: "Aniversário: João Pereira",
      description: "Cliente faz aniversário em 3 dias",
      time: "1 dia atrás",
      type: "birthday",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onClearAll = () => {},
  onSettingsChange = () => {},
}: NotificationCenterProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "birthday":
        return <Cake className="h-5 w-5 text-pink-500" />;
      case "order":
        return <Package className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card className="w-full h-full bg-white shadow-md border-pink-100">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-xl border-b border-pink-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-pink-700" />
            <CardTitle className="text-lg text-pink-800">
              Notificações
            </CardTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-pink-200 text-pink-800">
                {unreadCount} nova{unreadCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-pink-800 hover:bg-pink-200"
          >
            Limpar
          </Button>
        </div>
        <CardDescription className="text-pink-700">
          Alertas importantes e lembretes do sistema
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="all" className="w-full">
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-3 bg-pink-50">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">Não lidas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <ScrollArea className="h-[320px] px-4">
            {notifications.length > 0 ? (
              <div className="space-y-3 py-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-3 p-3 rounded-lg ${notification.read ? "bg-white" : "bg-pink-50"} border border-pink-100 hover:border-pink-200 transition-colors`}
                  >
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 -mt-1 -mr-1 text-gray-400 hover:text-gray-500"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <Bell className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-gray-500">Não há notificações</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          <ScrollArea className="h-[320px] px-4">
            {notifications.filter((n) => !n.read).length > 0 ? (
              <div className="space-y-3 py-4">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex gap-3 p-3 rounded-lg bg-pink-50 border border-pink-100 hover:border-pink-200 transition-colors"
                    >
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 -mt-1 -mr-1 text-gray-400 hover:text-gray-500"
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <Bell className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-gray-500">Não há notificações não lidas</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3 text-gray-900">
              Configurações de notificações
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Alertas de estoque
                  </h4>
                  <p className="text-xs text-gray-500">
                    Receber alertas quando o estoque estiver baixo
                  </p>
                </div>
                <Switch
                  defaultChecked
                  onCheckedChange={(checked) =>
                    onSettingsChange("stock_alerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Aniversários de clientes
                  </h4>
                  <p className="text-xs text-gray-500">
                    Receber lembretes de aniversários
                  </p>
                </div>
                <Switch
                  defaultChecked
                  onCheckedChange={(checked) =>
                    onSettingsChange("birthday_alerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Novos pedidos
                  </h4>
                  <p className="text-xs text-gray-500">
                    Receber alertas para novos pedidos
                  </p>
                </div>
                <Switch
                  defaultChecked
                  onCheckedChange={(checked) =>
                    onSettingsChange("new_order_alerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Atualizações do sistema
                  </h4>
                  <p className="text-xs text-gray-500">
                    Receber alertas sobre atualizações
                  </p>
                </div>
                <Switch
                  onCheckedChange={(checked) =>
                    onSettingsChange("system_updates", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NotificationCenter;
