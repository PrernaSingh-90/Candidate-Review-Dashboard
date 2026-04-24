import { Video, Clock } from 'lucide-react';

const VideoSlider = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
        {value || 0} / 5
      </span>
    </div>
    <input 
      type="range" min="0" max="5" step="1" 
      value={value || 0} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

const VideoEvaluation = ({ candidate, onUpdateScore }) => {
  const videoFields = [
    { id: 'video_clarity', label: 'Clarity' },
    { id: 'video_confidence', label: 'Confidence' },
    { id: 'video_architecture', label: 'Architecture Explanation' },
    { id: 'video_tradeoff', label: 'Tradeoff Reasoning' },
    { id: 'video_communication', label: 'Communication' },
  ];

  return (
    <div className="space-y-8 bg-blue-50/20 p-6 rounded-4xl border border-blue-100 shadow-sm mt-6">
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.25em] border-b border-blue-100 pb-3 flex items-center gap-2">
          <Video size={14} /> Video Evaluation Panel
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          {videoFields.map((field) => (
            <VideoSlider 
              key={field.id}
              label={field.label}
              value={candidate[field.id]}
              onChange={(v) => onUpdateScore(candidate.id, field.id, v)}
            />
          ))}
        </div>
      </div>

   
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Clock size={12} /> Timestamp Notes (Optional)
        </label>
        <textarea 
          rows={3}
          placeholder="Example: 02:10 – clear explanation, 03:15 – unclear reasoning"
          className="w-full p-4 bg-white border border-blue-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>
    </div>
  );
};

export default VideoEvaluation;