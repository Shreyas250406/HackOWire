import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Customer } from '../types';
import { Input } from './ui/input';
import { motion } from 'motion/react';

interface CustomerListPanelProps {
  customers: any[]; // 🔥 ML customer list
  selectedCustomer: any | null;
  onSelectCustomer: (customer: any) => void;
}

export function CustomerListPanel({
  customers,
  selectedCustomer,
  onSelectCustomer,
}: CustomerListPanelProps) {

  const [searchTerm, setSearchTerm] = useState('');

  // 🔥 Map ML Customers → UI Shape (display only)
  const mappedCustomers: Customer[] = customers.map((c) => ({
    id: c.customer_id?.toString(),
    name: c.name,
    avatar: c.name?.charAt(0) || '?',

    product: 'Credit Line',
    geography: 'India',

    riskLevel:
  selectedCustomer?.customer_id?.toString() === c.customer_id?.toString()
    ? selectedCustomer?.risk_level === "High"
      ? "high-risk"
      : selectedCustomer?.risk_level === "Medium"
      ? "watchlist"
      : "stable"
    : "watchlist",

riskScore:
  selectedCustomer?.customer_id?.toString() === c.customer_id?.toString()
    ? selectedCustomer?.risk_score || 0.5
    : 0.5,


    balanceTrend: [30, 40, 35, 50, 45],
    cashflowData: [],
    radarData: []
  }));

  const filteredCustomers = mappedCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'stable':
        return 'bg-emerald-500';
      case 'watchlist':
        return 'bg-amber-500';
      case 'high-risk':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const MiniSparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return (
      <div className="flex items-end gap-0.5 h-6">
        {data.map((value, i) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div
              key={i}
              className="w-1 bg-purple-300 rounded-sm transition-all"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-b from-purple-50 to-blue-50 border-r border-purple-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-purple-200 bg-white/50 backdrop-blur">
        <h2 className="text-sm font-semibold text-purple-700 mb-3">
          CUSTOMER PORTFOLIO
        </h2>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <Input
            type="text"
            placeholder="Search customer name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-purple-200 text-gray-800 placeholder:text-purple-400"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 px-3 py-2 text-xs text-purple-700 bg-white rounded-md border border-purple-200 hover:bg-purple-50 transition-colors w-full">
          <Filter className="w-3.5 h-3.5" />
          Filters
        </button>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCustomers.map((customer) => (

          <motion.div
            key={customer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}

            // 🔥 FIX: Send ORIGINAL ML object back to App.tsx
            onClick={() =>
              onSelectCustomer(
                customers.find(
                  (c) => c.customer_id?.toString() === customer.id
                )
              )
            }

            className={`p-4 border-b border-purple-100 cursor-pointer transition-all ${
              selectedCustomer?.customer_id?.toString() === customer.id
                ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-l-4 border-l-purple-500 shadow-lg'
                : 'hover:bg-white/70'
            }`}
          >
            <div className="flex items-start gap-3">

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white bg-gradient-to-br from-purple-600 to-blue-600">
                {customer.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${getRiskColor(customer.riskLevel)}`} />
                  <h3 className="text-sm font-medium text-gray-800 truncate">
                    {customer.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 mb-1">
                  {customer.id} • {customer.product}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    Risk:
                    <span className="font-semibold text-amber-600">
                      {" "} {customer.riskScore.toFixed(2)}
                    </span>
                  </span>
                  <MiniSparkline data={customer.balanceTrend} />
                </div>
              </div>

            </div>
          </motion.div>

        ))}
      </div>
    </div>
  );
}
