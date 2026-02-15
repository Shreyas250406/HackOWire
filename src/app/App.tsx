import { useState, useEffect } from 'react';
import { CustomerListPanel } from './components/CustomerListPanel';
import { RiskScoreGauge } from './components/RiskScoreGauge';
import { StressDrivers } from './components/StressDrivers';
import { CashflowChart } from './components/CashflowChart';
import { BehaviorRadar } from './components/BehaviorRadar';
import { AIInsightPanel } from './components/AIInsightPanel';
import { InterventionPanel } from './components/InterventionPanel';
import { OutreachTimeline } from './components/OutreachTimeline';
import { ContactModal } from './components/ContactModal';
import { Shield } from 'lucide-react';

import { fetchCustomers, fetchRisk } from '../services/mlApi';

export default function App() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [riskData, setRiskData] = useState<any | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // 🔥 Load Customers From ML API
  useEffect(() => {
    fetchCustomers().then((data) => {
      setCustomers(data);
      if (data.length > 0) {
        setSelectedCustomer(data[0]);
      }
    });
  }, []);

  // 🔥 Fetch Risk Intelligence When Customer Changes
  useEffect(() => {
    if (!selectedCustomer) return;

    fetchRisk(selectedCustomer.customer_id).then((data) => {
      setRiskData(data);
    });
  }, [selectedCustomer]);

  const handleInitiateIntervention = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 text-gray-800">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                Pre-Delinquency Intervention Engine
              </h1>
              <p className="text-xs text-gray-500">
                Proactive Financial Risk Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">Risk Analyst</div>
              <div className="text-sm font-medium text-gray-700">
                Sarah Anderson
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
              SA
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-12 h-[calc(100vh-73px)]">

        {/* LEFT PANEL */}
        <div className="col-span-3">
          <CustomerListPanel
            customers={customers}
            selectedCustomer={selectedCustomer}
            onSelectCustomer={setSelectedCustomer}
          />
        </div>

        {/* MAIN PANEL */}
        <div className="col-span-6 overflow-y-auto p-6 space-y-6">

          {selectedCustomer && riskData ? (
            <>
              {/* Customer Header */}
              <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg bg-gradient-to-br from-purple-600 to-blue-600">
                    {riskData.customer_name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {riskData.customer_name}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">
                        ID: {selectedCustomer.customer_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Score Gauge */}
              <RiskScoreGauge score={riskData.risk_score} />

              {/* Stress Drivers */}
              <StressDrivers drivers={riskData.top_drivers || []} />

              {/* Cashflow Chart */}
              <CashflowChart data={riskData.risk_timeline || []} />

              {/* Behavior Radar */}
              <BehaviorRadar data={riskData.features || {}} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Shield className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <p className="text-gray-500">Loading intelligence...</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-3 overflow-y-auto p-6 space-y-6 border-l border-purple-200 bg-gradient-to-b from-white to-purple-50/30">

          {riskData ? (
            <>
              <AIInsightPanel
                riskScore={riskData.risk_score}
                aiSummary={riskData.ai_summary}
                driftInsights={riskData.drift_insights}
              />

              <InterventionPanel
                riskScore={riskData.risk_score}
                recommendedAction={riskData.recommended_action}
                onInitiate={handleInitiateIntervention}
              />

              <OutreachTimeline />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm">No customer selected</p>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 Contact Modal now uses ML Intelligence */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        customer={riskData}
      />

    </div>
  );
}
