import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import SummaryCards from "./dashboard/SummaryCards";
import QuickAccessCards from "./dashboard/QuickAccessCards";
import CalendarView from "./dashboard/CalendarView";
import NotificationCenter from "./dashboard/NotificationCenter";
import PerformanceCharts from "./dashboard/PerformanceCharts";
import PendingOrdersList from "./dashboard/PendingOrdersList";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-pink-50">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Summary Cards */}
            <SummaryCards />

            {/* Quick Access Cards */}
            <QuickAccessCards />

            {/* Calendar, Notifications and Pending Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Calendar View */}
                <CalendarView />

                {/* Pending Orders List */}
                <PendingOrdersList />
              </div>

              <div className="space-y-6">
                {/* Notification Center */}
                <NotificationCenter />

                {/* Additional space for future components */}
                <div className="bg-white rounded-lg shadow-sm p-4 h-[200px] flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Espaço reservado para componentes adicionais
                    <br />
                    <span className="text-sm">
                      (Relatórios rápidos, lembretes, etc.)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Charts */}
            <PerformanceCharts />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
