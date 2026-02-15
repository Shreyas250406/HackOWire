import { Brain, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface AIInsightPanelProps {
  riskScore: number;
  aiSummary?: string;            // 🔥 from ML
  driftInsights?: string[];      // 🔥 from ML drift engine
}

export function AIInsightPanel({
  riskScore,
  aiSummary,
  driftInsights = []
}: AIInsightPanelProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 shadow-lg relative overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              AI Financial Health Summary
            </h2>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Generated 2 mins ago</span>
          </div>
        </div>

        {/* 🔥 REAL AI SUMMARY FROM ML */}
        <div className="text-sm text-gray-700 leading-relaxed">
          {aiSummary || "Generating AI insight..."}
        </div>

        {/* 🔥 Behaviour Drift Insights (NEW — NO UI CHANGE) */}
        {driftInsights.length > 0 && (
          <div className="mt-4 space-y-1">
            {driftInsights.map((insight, i) => (
              <div
                key={i}
                className="text-xs text-purple-700 bg-purple-100 border border-purple-200 rounded px-2 py-1 inline-block mr-2"
              >
                {insight}
              </div>
            ))}
          </div>
        )}

        {/* AI Badge */}
        <div className="mt-4 pt-4 border-t border-purple-200">
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-purple-100 border border-purple-300 rounded text-xs text-purple-700 font-medium">
              AI-Powered Analysis
            </div>
            <div className="px-2 py-1 bg-emerald-100 border border-emerald-300 rounded text-xs text-emerald-700 font-medium">
              High Confidence
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
