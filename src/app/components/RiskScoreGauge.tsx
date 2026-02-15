import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Activity } from 'lucide-react';

interface RiskScoreGaugeProps {
  score?: number; // 🔥 allow undefined during ML loading
}

export function RiskScoreGauge({ score = 0 }: RiskScoreGaugeProps) {

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getStatus = (score: number) => {
    if (score > 0.7) return 'Emerging Financial Stress';
    if (score > 0.4) return 'Moderate Risk';
    return 'Stable';
  };

  const getColor = (score: number) => {
    if (score > 0.7) return 'text-red-600';
    if (score > 0.4) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getGradient = (score: number) => {
    const percentage = score * 100;
    return `conic-gradient(
      from 180deg,
      rgb(16, 185, 129) 0deg,
      rgb(251, 191, 36) ${percentage * 0.7}deg,
      rgb(239, 68, 68) ${percentage * 1.8}deg,
      rgb(243, 244, 246) ${percentage * 1.8}deg
    )`;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Risk Assessment</h2>
        <Shield className="w-5 h-5 text-purple-600" />
      </div>

      {/* Gauge */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">

          {/* Background Circle */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: getGradient(animatedScore),
            }}
          />

          {/* Inner Circle */}
          <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className={`text-5xl font-bold ${getColor(score)}`}>
                {animatedScore.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 text-center mt-1">
                Risk Score
              </div>
            </motion.div>
          </div>

          {/* Glow Effect */}
          <div
            className={`absolute -inset-2 rounded-full blur-xl opacity-20 ${
              score > 0.7
                ? 'bg-red-400'
                : score > 0.4
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
          />
        </div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className={`text-lg font-semibold ${getColor(score)}`}>
          {getStatus(score)}
        </div>
      </div>

      {/* Metadata (UI unchanged) */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xs text-gray-500 mb-1">Last Updated</div>
          <div className="text-sm font-semibold text-gray-700">10:42 AM</div>
        </div>

        <div className="text-center border-l border-r border-purple-100">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xs text-gray-500 mb-1">Confidence</div>
          <div className="text-sm font-semibold text-emerald-600">High</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xs text-gray-500 mb-1">Signals</div>
          <div className="text-sm font-semibold text-gray-700">27</div>
        </div>
      </div>
    </div>
  );
}
