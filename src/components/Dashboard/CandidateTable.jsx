import { calculatePriority } from '../../utils/priorityEngine';

const CandidateTable = ({ candidates, onSelect, compareList, toggleCompare }) => {
  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
              <th className="p-4 w-10">Sel</th>
              <th className="p-4">Candidate</th>
              <th className="p-4">ATS</th>
              <th className="p-4">Assign.</th>
              <th className="p-4">Video</th> 
              <th className="p-4">Priority</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {candidates.map(c => {
              const priority = calculatePriority(c);
              return (
                <tr key={c.id} className="hover:bg-slate-50 transition-all group">
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={compareList.some(item => item.id === c.id)} onChange={() => toggleCompare(c)} className="rounded text-indigo-600 h-4 w-4" />
                  </td>
                  <td className="p-4" onClick={() => onSelect(c)}>
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.college}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-600">{c.ats_score}</td>
                  <td className="p-4 font-bold text-slate-600">{c.assignment_score}</td>
                  <td className="p-4 font-bold text-blue-600">{c.video_score}</td> {/* Video Score */}
                  <td className="p-4">
                    <span className={`${priority.color} px-2 py-1 rounded text-[9px] font-black uppercase border`}>{priority.level}</span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => onSelect(c)} className="text-indigo-600 text-xs font-black">Review</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    
      <div className="md:hidden divide-y divide-slate-100">
        {candidates.map(c => {
          const priority = calculatePriority(c);
          return (
            <div key={c.id} className="p-5 space-y-4 active:bg-slate-50" onClick={() => onSelect(c)}>
              <div className="flex justify-between items-start">
                <div><div className="font-bold text-slate-900">{c.name}</div><div className="text-xs text-slate-400">{c.college}</div></div>
                <span className={`${priority.color} px-2 py-1 rounded text-[10px] font-bold`}>{priority.level}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500 bg-slate-50 p-2 rounded-lg">
                <span>ATS: {c.ats_score}</span>
                <span>Assign: {c.assignment_score}</span>
                <span className="text-blue-600">Video: {c.video_score}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CandidateTable;