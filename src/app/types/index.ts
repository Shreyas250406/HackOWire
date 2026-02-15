export interface Customer {
  id: string;
  name: string;
  riskScore: number;
  riskLevel: 'stable' | 'watchlist' | 'high-risk';
  balanceTrend: number[];
  avatar: string;
  product: string;
  geography: string;
  email: string;
  phone: string;
  address: string;
  cashflowData: CashflowDataPoint[];
  radarData: RadarDataPoint[];
}

export interface RadarDataPoint {
  category: string;
  value: number;
  fullMark: number;
}

export interface StressDriver {
  id: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  icon: string;
}

export interface CashflowDataPoint {
  month: string;
  income: number;
  emi: number;
  discretionary: number;
  anomaly?: string;
}

export interface Event {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}