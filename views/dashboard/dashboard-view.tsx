import DashboardStats from "@/components/dashboard/dashboard-stats";
import SalesChart from "@/components/dashboard/sales-chart";

const DashboardView = () => {
  return (
    <div>
      {/* Dashboard stats */}
      <DashboardStats />
      <div className="mt-4 h-[500px] w-full">
        {/* Chart Sales */}
        <SalesChart />
      </div>
    </div>
  );
};

export default DashboardView;
