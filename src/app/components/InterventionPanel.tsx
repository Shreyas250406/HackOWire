import { motion } from 'motion/react';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface InterventionPanelProps {
  riskScore: number;
  recommendedAction: string;
  onInitiate: () => void;
}

export function InterventionPanel({
  riskScore,
  recommendedAction,
  onInitiate
}: InterventionPanelProps) {

  // 🔥 Build dynamic intervention from ML intelligence
  const buildIntervention = () => {

    // Safety loading state
    if (!recommendedAction) {
      return {
        action: "Analyzing customer signals...",
        reasons: ["AI engine evaluating behavioural patterns"],
        confidence: 70
      };
    }

    // 🔴 HIGH RISK
    if (riskScore > 0.7) {
      return {
        action: recommendedAction,
        reasons: [
          'Salary irregularity detected',
          'Savings drawdown trend',
          'Credit utilization spike',
        ],
        confidence: Math.round(riskScore * 100),
      };
    }

    // 🟡 MEDIUM RISK
    if (riskScore > 0.4) {
      return {
        action: recommendedAction,
        reasons: [
          'Moderate spending behaviour drift',
          'Cashflow pattern shift detected',
        ],
        confidence: Math.round(riskScore * 100),
      };
    }

    // 🟢 LOW RISK (NICE / POSITIVE EXPERIENCE)
    return {
      action: "Maintain Positive Engagement",
      reasons: [
        'Healthy financial behaviour detected',
        'No early stress indicators observed',
      ],
      confidence: Math.round(riskScore * 100),
    };
  };

  const intervention = buildIntervention();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br ${
        riskScore > 0.7 
          ? 'from-amber-50 to-red-50 border-amber-300' 
          : riskScore > 0.4
          ? 'from-blue-50 to-purple-50 border-blue-300'
          : 'from-emerald-50 to-blue-50 border-emerald-300'
      } rounded-xl p-6 border-2 shadow-lg`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb
          className={`w-5 h-5 ${
            riskScore > 0.7
              ? 'text-amber-600'
              : riskScore > 0.4
              ? 'text-blue-600'
              : 'text-emerald-600'
          }`}
        />
        <h2 className="text-lg font-semibold text-gray-800">
          Recommended Intervention
        </h2>
      </div>

      {/* Action Card */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200 shadow-sm">
        <div className="text-xs text-gray-500 mb-1">SUGGESTED ACTION</div>

        <div className="text-xl font-semibold text-gray-800 mb-3">
          {intervention.action}
        </div>

        {/* Reasons */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-2">REASON</div>
          <ul className="space-y-1">
            {intervention.reasons.map((reason, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex items-start gap-2"
              >
                <span className="text-purple-600 mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confidence */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-500">CONFIDENCE LEVEL</span>
            <span className="text-gray-700 font-semibold">
              {intervention.confidence}%
            </span>
          </div>
          <Progress value={intervention.confidence} className="h-2" />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onInitiate}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
      >
        <span>Initiate Intervention</span>
        <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
