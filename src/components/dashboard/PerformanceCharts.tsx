import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceChartsProps {
  salesData?: {
    labels: string[];
    data: number[];
  };
  popularProductsData?: {
    labels: string[];
    data: number[];
  };
  period?: string;
}

const PerformanceCharts = ({
  salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [1200, 1900, 1500, 2200, 1800, 2500, 3000],
  },
  popularProductsData = {
    labels: ["Bolos", "Cupcakes", "Doces", "Tortas", "Cookies"],
    data: [35, 25, 15, 15, 10],
  },
  period = "week",
}: PerformanceChartsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  // Calculate if sales are trending up or down
  const salesTrend =
    salesData.data[salesData.data.length - 1] >
    salesData.data[salesData.data.length - 2];
  const salesDifference = Math.abs(
    salesData.data[salesData.data.length - 1] -
      salesData.data[salesData.data.length - 2],
  );
  const salesPercentage = (
    (salesDifference / salesData.data[salesData.data.length - 2]) *
    100
  ).toFixed(1);

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Desempenho de Vendas
        </h2>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            title="Exportar dados"
          >
            <Download className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value="sales" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            <span>Produtos Populares</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>Categorias</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total de Vendas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    R${" "}
                    {salesData.data
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString("pt-BR")}
                  </span>
                  <div
                    className={cn(
                      "flex items-center text-sm",
                      salesTrend ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {salesTrend ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{salesPercentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Ticket Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">R$ 85,50</span>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>3.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total de Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">142</span>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>5.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Chart Placeholder */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="h-[300px] w-full bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-12 w-12 mx-auto text-pink-400 mb-2" />
                  <p className="text-gray-500">
                    Gráfico de vendas ao longo do tempo
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Dados de {salesData.labels[0]} a{" "}
                    {salesData.labels[salesData.labels.length - 1]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Products Chart Placeholder */}
                <div className="h-[300px] bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-pink-400 mb-2" />
                    <p className="text-gray-500">
                      Distribuição de produtos populares
                    </p>
                  </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg">
                  <h3 className="font-medium mb-3 text-gray-700">
                    Produtos Mais Vendidos
                  </h3>
                  <div className="space-y-3">
                    {popularProductsData.labels.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <span className="font-medium">{product}</span>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">
                            {popularProductsData.data[index]}%
                          </span>
                          <div
                            className="h-2 bg-pink-300 rounded-full"
                            style={{
                              width: `${popularProductsData.data[index] * 3}px`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="h-[300px] w-full bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-12 w-12 mx-auto text-pink-400 mb-2" />
                  <p className="text-gray-500">
                    Desempenho por categoria de produto
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Comparativo de vendas por categoria
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Bolos", "Doces", "Salgados", "Bebidas"].map(
              (category, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        R${" "}
                        {(Math.random() * 5000 + 1000)
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>
                      <div
                        className={cn(
                          "flex items-center text-sm",
                          Math.random() > 0.3
                            ? "text-green-600"
                            : "text-red-600",
                        )}
                      >
                        {Math.random() > 0.3 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>{(Math.random() * 10).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceCharts;
