import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MessageSquare, Video, FileText } from 'lucide-react'; 
import { calculatePriority } from '../../utils/priorityEngine';
import EvaluationForm from './EvaluationForm';
import VideoEvaluation from './VideoEvaluation';


const ScoreSlider = ({ label, scoreKey, candidate, onUpdateScore, icon: Icon, color }) => (
  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
    <div className="flex justify-between items-center">
      <p className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
        <Icon size={12} className={color} /> {label}
      </p>
      <p className="text-lg font-black text-slate-800">{candidate[scoreKey] || 0}%</p>
    </div>
    <input 
      type="range" min="0" max="100" 
      value={candidate[scoreKey] || 0} 
      onChange={(e) => onUpdateScore(candidate.id, scoreKey, parseInt(e.target.value))} 
      className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${color.replace('text', 'accent')}`}
    />
  </div>
);

const CandidateDrawer = ({ candidate, onClose, onUpdateScore }) => {
  if (!candidate) return null;
  const priority = calculatePriority(candidate);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
          transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
          className="relative w-full md:w-137.5 bg-white h-full shadow-2xl flex flex-col"
        >
          {/* Header Section */}
          <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{candidate.name}</h2>
                <p className="text-sm font-bold text-slate-400">{candidate.college}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white rounded-full border border-transparent hover:border-slate-200 transition-all">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
            <div className={`p-6 rounded-4xl border-2 ${priority.color} flex justify-between items-center shadow-xl shadow-slate-200/50`}>
              <div>
                <p className="text-[10px] font-black uppercase opacity-60 tracking-widest text-slate-900 text-sm">Computed Priority</p>
                <p className="text-5xl font-black text-slate-900">{priority.level}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black uppercase tracking-tighter text-slate-900">{priority.status}</p>
                <p className="text-[10px] font-bold opacity-60 italic text-slate-700">Live Engine Update</p>
              </div>
            </div>

          
            <section className="space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <FileText size={14} className="text-indigo-500"/> Core Performance Metrics
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ScoreSlider label="ATS Score" scoreKey="ats_score" candidate={candidate} onUpdateScore={onUpdateScore} icon={FileText} color="text-indigo-600" />
                  <ScoreSlider label="Assignment" scoreKey="assignment_score" candidate={candidate} onUpdateScore={onUpdateScore} icon={FileText} color="text-indigo-600" />
                  <ScoreSlider label="Video Score" scoreKey="video_score" candidate={candidate} onUpdateScore={onUpdateScore} icon={Video} color="text-blue-600" />
                  <ScoreSlider label="GitHub" scoreKey="github_score" candidate={candidate} onUpdateScore={onUpdateScore} icon={User} color="text-slate-700" />
                  <ScoreSlider label="Communication" scoreKey="communication_score" candidate={candidate} onUpdateScore={onUpdateScore} icon={MessageSquare} color="text-green-600" />
               </div>
            </section>

          
            <VideoEvaluation candidate={candidate} onUpdateScore={onUpdateScore} />

           
            <EvaluationForm candidate={candidate} onUpdateScore={onUpdateScore} />
          </div>

        
          <div className="p-8 border-t bg-white flex gap-4">
            <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Shortlist</button>
            <button className="flex-1 bg-white border border-slate-200 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">Reject</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CandidateDrawer;