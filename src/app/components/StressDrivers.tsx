import { TrendingDown, CreditCard, Banknote, ShoppingBag, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';

interface StressDriversProps {
  drivers: string[];   // 🔥 Now receives ML top_driver keys
}

const iconMap: Record<string, any> = {
  salary_delay_days: TrendingDown,
  credit_utilization_ratio: CreditCard,
  atm_withdrawal_spike: Banknote,
  discretionary_spend_drop: ShoppingBag,
  savings_drawdown_pct: PiggyBank,
};

export function StressDrivers({ drivers }: StressDriversProps) {

  // 🔥 Convert ML keys → UI labels
  const formatTitle = (key: string) => {
    if (!key) return "Unknown Signal";

    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // 🔥 Fake impact levels based on ranking
  const getImpact = (index: number) => {
    if (index === 0) return "high";
    if (index === 1) return "medium";
    return "low";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-50 border-red-300 text-red-700';
      case 'medium':
        return 'bg-amber-50 border-amber-300 text-amber-700';
      case 'low':
        return 'bg-blue-50 border-blue-300 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-700';
    }
  };

  const getImpactLabel = (impact: string) => {
    return impact.toUpperCase() + ' IMPACT';
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Stress Signal Drivers
        </h2>
        <p className="text-xs text-gray-500">
          Explainable AI insights into risk factors
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {drivers && drivers.map((driver, index) => {
          const riskImpact =
  driver.includes("delay") || driver.includes("utilization")
    ? "high"
    : driver.includes("atm")
    ? "medium"
    : "low";


          const impact = getImpact(index);
          const Icon = iconMap[driver];

          return (
            <motion.div
              key={driver}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getImpactColor(riskImpact)
} transition-all hover:scale-105 cursor-pointer`}
            >
              {Icon && <Icon className="w-5 h-5" />}

              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 mb-0.5">
                  {formatTitle(driver)}
                </div>
                <div className="text-xs opacity-80">
                  {getImpactLabel(riskImpact)
}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
