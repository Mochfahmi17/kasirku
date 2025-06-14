export interface DashboardStatsType {
  success: boolean;
  revenueToday: number;
  transactionCount: number;
  totalProducts: number;
  lowStock: number;
}

export interface DataSalesType {
  success: boolean;
  chartData: { date: string; income: number }[];
}
