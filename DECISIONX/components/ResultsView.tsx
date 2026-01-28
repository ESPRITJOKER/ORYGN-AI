import React from 'react';
import { AnalysisResult } from '../types';
import { Trophy, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 animate-fade-in-up">
      {/* Top Banner: Decision Summary */}
      <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl shadow-indigo-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 size={16} /> Decision Made
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Recommended: {result.rankedOptions[0].name}
          </h2>
          <p className="text-indigo-100 leading-relaxed max-w-lg">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Bias Detection Alert (Conditional) */}
      {result.biasInsight.detected && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex gap-4 items-start">
          <div className="text-orange-500 mt-1">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-orange-900 text-sm uppercase">Bias Detected: {result.biasInsight.type || 'Cognitive Bias'}</h4>
            <p className="text-orange-800 text-sm mt-1">{result.biasInsight.message}</p>
          </div>
        </div>
      )}

      {/* Ranked List */}
      <div className="space-y-4">
        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider pl-2">Analysis Breakdown</h3>
        
        {result.rankedOptions.map((option, index) => (
          <div 
            key={option.id}
            className={`
              relative bg-white rounded-xl p-6 border transition-all
              ${index === 0 
                ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/20' 
                : 'border-slate-100 shadow-sm opacity-90 hover:opacity-100 hover:shadow-md'}
            `}
          >
            {/* Rank Badge */}
            <div className={`
              absolute -left-3 top-6 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
              ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}
            `}>
              #{index + 1}
            </div>

            <div className="pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{option.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {option.matchTags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{option.score}</div>
                  <div className="text-xs text-slate-400 font-medium">Score</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                <div 
                  className={`h-1.5 rounded-full ${index === 0 ? 'bg-indigo-500' : 'bg-slate-400'}`} 
                  style={{ width: `${option.score}%` }}
                ></div>
              </div>

              {/* Reasoning */}
              <ul className="space-y-1">
                {option.reasoning.map((reason, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-indigo-400 mt-1.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-8 flex justify-center">
        <button
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2 transition-colors px-6 py-3 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Make Another Decision
        </button>
      </div>
    </div>
  );
};
