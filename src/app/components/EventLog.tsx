import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Event } from '../types';

interface EventLogProps {
  events: Event[];
}

export function EventLog({ events }: EventLogProps) {
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulate real-time event streaming
    events.forEach((event, index) => {
      setTimeout(() => {
        setVisibleEvents((prev) => [event, ...prev]);
      }, index * 500);
    });
  }, [events]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return { Icon: AlertTriangle, color: 'text-amber-400' };
      case 'success':
        return { Icon: CheckCircle, color: 'text-emerald-400' };
      default:
        return { Icon: Info, color: 'text-blue-400' };
    }
  };

  return (
    <div className="bg-[#111827] rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-1">Live Event Feed</h2>
          <p className="text-xs text-slate-500">Real-time intelligence pipeline</p>
        </div>
        <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
      </div>

      {/* Event List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        <AnimatePresence>
          {visibleEvents.map((event) => {
            const { Icon, color } = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#1E293B] rounded-lg p-3 border border-slate-700"
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 mt-0.5 ${color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">[{event.time}]</span>
                    </div>
                    <p className="text-sm text-slate-300">{event.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visibleEvents.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            Monitoring events...
          </div>
        )}
      </div>
    </div>
  );
}
