import { X, User, BarChart } from 'lucide-react';

const ComparisonModal = ({ selectedCandidates, onClose }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><BarChart /> Comparison Mode</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X /></button>
        </div>
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedCandidates.map(c => (
              <div key={c.id} className="bg-slate-50 rounded-3xl p-8 space-y-8 border border-slate-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-indigo-100 rotate-3">
                    <User size={40} />
                  </div>
                  <h3 className="font-black text-xl">{c.name}</h3>
                  <p className="text-xs font-bold text-slate-400">{c.college}</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'ATS Score', val: c.ats_score },
                    { label: 'Assignment', val: c.assignment_score },
                    { label: 'Video Score', val: c.video_score },
                    { label: 'GitHub', val: c.github_score },
                    { label: 'Comm. Score', val: c.communication_score }
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">{stat.label}</span>
                      <span className="font-black text-slate-700">{stat.val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComparisonModal;