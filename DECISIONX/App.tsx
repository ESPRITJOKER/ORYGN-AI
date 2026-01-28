import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { DecisionForm } from './components/DecisionForm';
import { ResultsView } from './components/ResultsView';
import { analyzeDecision } from './services/geminiService';
import { AppState, AnalysisResult, DecisionInput } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDecisionSubmit = async (input: DecisionInput) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);
    try {
      const data = await analyzeDecision(input);
      setResult(data);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to analyze decision. Please try again.");
      setAppState(AppState.INPUT); // Reset to input so they can retry
    }
  };

  const resetApp = () => {
    setResult(null);
    setAppState(AppState.INPUT);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Compass className="w-6 h-6" strokeWidth={2.5} />
            <span className="font-bold text-xl tracking-tight text-slate-900">DECISION<span className="text-indigo-600">X</span></span>
          </div>
          {appState === AppState.RESULT && (
             <button onClick={resetApp} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
               New Decision
             </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 max-w-3xl mx-auto">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm font-medium animate-bounce">
            {errorMsg}
          </div>
        )}

        {appState === AppState.INPUT || appState === AppState.ANALYZING ? (
          <>
            <div className="text-center mb-10 space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Stop overthinking. <br/>
                <span className="text-indigo-600">Decide in 60 seconds.</span>
              </h1>
              <p className="text-slate-500 max-w-md mx-auto text-lg">
                The AI-powered decision engine for students.
              </p>
            </div>
            <DecisionForm 
              onSubmit={handleDecisionSubmit} 
              isAnalyzing={appState === AppState.ANALYZING} 
            />
          </>
        ) : (
          result && <ResultsView result={result} onReset={resetApp} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm border-t border-slate-200/50 mt-auto">
        <p>© {new Date().getFullYear()} DecisionX. Built for Hackathons.</p>
      </footer>
    </div>
  );
}

export default App;
