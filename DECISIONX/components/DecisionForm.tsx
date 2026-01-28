import React, { useState, useCallback } from 'react';
import { Plus, Trash2, Zap, ArrowRight, Wand2 } from 'lucide-react';
import { DecisionInput, Option, Criterion } from '../types';
import { INITIAL_CRITERIA, INITIAL_OPTIONS, DEMO_DATA } from '../constants';

interface DecisionFormProps {
  onSubmit: (data: DecisionInput) => void;
  isAnalyzing: boolean;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ onSubmit, isAnalyzing }) => {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [options, setOptions] = useState<Option[]>(INITIAL_OPTIONS);
  const [criteria, setCriteria] = useState<Criterion[]>(INITIAL_CRITERIA);

  // Handlers for Options
  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { id: `o${Date.now()}`, name: '' }]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(o => o.id !== id));
    }
  };

  const updateOption = (id: string, name: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, name } : o));
  };

  // Handlers for Criteria
  const addCriterion = () => {
    if (criteria.length < 5) {
      setCriteria([...criteria, { id: `c${Date.now()}`, name: '', weight: 3 }]);
    }
  };

  const removeCriterion = (id: string) => {
    if (criteria.length > 1) {
      setCriteria(criteria.filter(c => c.id !== id));
    }
  };

  const updateCriterion = (id: string, field: keyof Criterion, value: any) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleDemoFill = useCallback(() => {
    setTitle(DEMO_DATA.title);
    setContext(DEMO_DATA.context);
    setOptions(DEMO_DATA.options);
    setCriteria(DEMO_DATA.criteria);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a decision title");
    if (options.some(o => !o.name.trim())) return alert("Please fill in all options");
    if (criteria.some(c => !c.name.trim())) return alert("Please fill in all criteria");
    
    onSubmit({
      title,
      context,
      options,
      criteria
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">The Decision</label>
          <button 
            type="button" 
            onClick={handleDemoFill}
            className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium transition-colors"
          >
            <Wand2 size={12} /> Auto-fill Demo
          </button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Which job offer should I accept?"
          className="w-full text-xl md:text-2xl font-bold text-slate-900 placeholder:text-slate-300 border-b-2 border-slate-100 focus:border-indigo-500 focus:outline-none py-2 transition-colors"
          required
        />
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Optional context (e.g., 'I value work-life balance over money right now')"
          className="w-full mt-4 text-sm text-slate-600 placeholder:text-slate-300 border-b border-slate-100 focus:border-indigo-300 focus:outline-none py-2 transition-colors"
        />
      </div>

      {/* Options Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Options
          </h3>
          <span className="text-xs text-slate-400">Min 2, Max 4</span>
        </div>
        <div className="space-y-3">
          {options.map((option, idx) => (
            <div key={option.id} className="flex gap-3 items-center group">
              <span className="text-slate-300 font-mono text-sm w-4 text-center">{idx + 1}</span>
              <input
                type="text"
                value={option.name}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
        {options.length < 4 && (
          <button
            type="button"
            onClick={addOption}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-2 px-2"
          >
            <Plus size={16} /> Add Option
          </button>
        )}
      </div>

      {/* Criteria Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
            Criteria & Importance
          </h3>
          <span className="text-xs text-slate-400">Rate 1-5</span>
        </div>
        <div className="space-y-4">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <input
                  type="text"
                  value={criterion.name}
                  onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
                  placeholder="Criterion Name (e.g. Cost)"
                  className="w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 outline-none text-slate-800 placeholder:text-slate-400 py-1 transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={criterion.weight}
                  onChange={(e) => updateCriterion(criterion.id, 'weight', parseInt(e.target.value))}
                  className="w-24 accent-indigo-600 cursor-pointer"
                />
                <span className="w-8 text-center font-bold text-indigo-600 bg-indigo-50 rounded px-1 text-sm">
                  {criterion.weight}
                </span>
                {criteria.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCriterion(criterion.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {criteria.length < 5 && (
          <button
            type="button"
            onClick={addCriterion}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-2 px-2"
          >
            <Plus size={16} /> Add Criterion
          </button>
        )}
      </div>

      <div className="pt-4 pb-12">
        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Running Decision Engine...
            </>
          ) : (
            <>
              <Zap size={20} className="fill-current" />
              Analyze Decision
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
