import React from 'react';
import { X, ShieldAlert, Cpu, Binary, Activity, CheckCircle2 } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#240733] text-[#faf8f5] border border-purple-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/50 bg-[#1b0429] sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/80 border border-purple-700 flex items-center justify-center text-violet-300 font-bold shadow-sm">
              <ShieldAlert className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-300 bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700 font-medium">
                Machine Learning Case Study
              </span>
              <h3 className="font-heading font-black text-lg text-white mt-0.5">
                Wireless Network Vulnerability Prediction
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors border border-purple-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800 text-center">
              <div className="text-2xl font-heading font-black text-violet-300">87.3%</div>
              <div className="text-xs text-purple-300 mt-0.5 font-medium">Prediction Accuracy</div>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800 text-center">
              <div className="text-2xl font-heading font-black text-purple-200">0.89</div>
              <div className="text-xs text-purple-300 mt-0.5 font-medium">ROC-AUC Score</div>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800 text-center">
              <div className="text-2xl font-heading font-black text-violet-300">32</div>
              <div className="text-xs text-purple-300 mt-0.5 font-medium">Engineered Features</div>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800 text-center">
              <div className="text-2xl font-heading font-black text-emerald-400">&lt; 12ms</div>
              <div className="text-xs text-purple-300 mt-0.5 font-medium">Inference Latency</div>
            </div>
          </div>

          {/* Problem Statement */}
          <div>
            <h4 className="font-heading font-black text-white flex items-center gap-2 mb-2 text-base">
              <Activity className="w-4 h-4 text-violet-300" />
              Problem Definition &amp; Objective
            </h4>
            <p className="text-purple-100 leading-relaxed font-normal">
              Wireless 802.11 networks are vulnerable to de-authentication attacks, rogue AP probes, and buffer exhaustion attacks. Traditional signature-based intrusion detection systems (IDS) fail on zero-day pattern mutations. The goal of this research was to train a lightweight machine learning pipeline capable of classifying benign versus anomalous wireless traffic in near real-time without decrypting confidential payload bodies.
            </p>
          </div>

          {/* Methodology & Feature Engineering */}
          <div>
            <h4 className="font-heading font-black text-white flex items-center gap-2 mb-2 text-base">
              <Binary className="w-4 h-4 text-violet-400" />
              Dataset &amp; Feature Engineering Pipeline
            </h4>
            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-800 space-y-3 text-purple-100">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-medium">Wireshark Telemetry Capture:</strong> Captured 120,000+ raw frame packets across varying signal strengths and congestion scenarios.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-medium">Statistical Feature Extraction:</strong> Calculated inter-arrival packet time deltas, byte length kurtosis, sliding-window retry counts, frame subtype distribution, and Shannon entropy.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-medium">Model Selection in Scikit-learn:</strong> Evaluated Random Forest, XGBoost, and Support Vector Classifiers. An ensemble of Random Forest with balanced class weights achieved 87.3% accuracy while minimizing false positives.
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-700/60 text-purple-100">
            <h5 className="font-mono text-xs uppercase tracking-wider text-violet-300 font-bold mb-1">
              Key Insight
            </h5>
            <p className="text-xs leading-relaxed font-normal">
              Packet header entropy paired with inter-packet timing micro-deltas produces a highly accurate intrusion predictor without decrypting customer payloads, safeguarding data privacy in regulated enterprise networks.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-900/50 bg-[#1b0429] flex items-center justify-between text-xs text-purple-300">
          <span>Published Thesis Research • Intrust Innovation Labs</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-white transition-colors font-medium"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
