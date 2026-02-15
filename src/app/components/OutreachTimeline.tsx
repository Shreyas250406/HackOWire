import { Calendar, Bell, Phone, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineStep {
  day: number;
  title: string;
  description: string;
  icon: any;
}

export function OutreachTimeline() {
  const steps: TimelineStep[] = [
    {
      day: 0,
      title: 'Gentle App Notification',
      description: 'In-app message with supportive tone',
      icon: Bell,
    },
    {
      day: 3,
      title: 'Offer EMI Restructure',
      description: 'Present flexible payment options',
      icon: Calendar,
    },
    {
      day: 7,
      title: 'Relationship Manager Review',
      description: 'Personal outreach and consultation',
      icon: Phone,
    },
    {
      day: 14,
      title: 'Resolution Check-in',
      description: 'Follow-up on intervention effectiveness',
      icon: UserCheck,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Outreach Strategy Timeline</h2>
        <p className="text-xs text-gray-500">Ethical escalation pathway</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-purple-200" />

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Icon */}
                <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center border-4 border-white shadow-md">
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-purple-200 rounded text-xs font-semibold text-purple-700">
                      Day {step.day}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{step.title}</span>
                  </div>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
