
const EvaluationSlider = ({ label, value, onChange, icon }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
      <span className="flex items-center gap-2">
        <span className="text-sm">{icon}</span> {label}
      </span>
      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg border border-indigo-100">
        {value || 0} / 5
      </span>
    </div>
    <input 
      type="range" min="0" max="5" step="1" 
      value={value || 0} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
    />
  </div>
);

const EvaluationForm = ({ candidate, onUpdateScore }) => {
  return (
    <div className="space-y-8 bg-slate-50/50 p-6 rounded-4xl border border-slate-100 shadow-inner">
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] border-b border-slate-200 pb-3">
          Assignment Evaluation Panel
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <EvaluationSlider 
            label="UI Quality" icon="🎨" value={candidate.ui_quality} 
            onChange={(v) => onUpdateScore(candidate.id, 'ui_quality', v)} 
          />
          <EvaluationSlider 
            label="Component Structure" icon="🧱" value={candidate.component_structure} 
            onChange={(v) => onUpdateScore(candidate.id, 'component_structure', v)} 
          />
          <EvaluationSlider 
            label="State Handling" icon="⚙️" value={candidate.state_handling} 
            onChange={(v) => onUpdateScore(candidate.id, 'state_handling', v)} 
          />
          <EvaluationSlider 
            label="Edge-case Handling" icon="🛡️" value={candidate.edge_case_handling} 
            onChange={(v) => onUpdateScore(candidate.id, 'edge_case_handling', v)} 
          />
          <EvaluationSlider 
            label="Responsiveness" icon="📱" value={candidate.responsiveness} 
            onChange={(v) => onUpdateScore(candidate.id, 'responsiveness', v)} 
          />
          <EvaluationSlider 
            label="Accessibility" icon="♿" value={candidate.accessibility} 
            onChange={(v) => onUpdateScore(candidate.id, 'accessibility', v)} 
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reviewer Notes</label>
        <textarea 
          rows={3}
          placeholder="Add specific comments about the candidate's code quality..."
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-300"
        />
      </div>
    </div>
  );
};

export default EvaluationForm;