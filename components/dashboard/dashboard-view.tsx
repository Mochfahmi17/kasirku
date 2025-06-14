import SalesChart from "./sales-chart";
import DashboardStats from "./dashboard-stats";

const DashboardView = () => {
  return (
    <div>
      {/* Dashboard stats */}
      <DashboardStats />
      <div className="mt-4 h-[500px] w-full">
        <SalesChart />
      </div>
    </div>
  );
};

export default DashboardView;
