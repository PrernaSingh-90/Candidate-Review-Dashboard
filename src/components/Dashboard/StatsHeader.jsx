import { Users, CheckCircle, Star, Clock } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const StatsHeader = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatCard label="Total Applicants" value={stats.total} icon={Users} color="bg-blue-50 text-blue-600" />
    <StatCard label="Reviewed" value={stats.reviewed} icon={CheckCircle} color="bg-green-50 text-green-600" />
    <StatCard label="Shortlisted" value={stats.shortlisted} icon={Star} color="bg-yellow-50 text-yellow-600" />
    <StatCard label="Pending" value={stats.pending} icon={Clock} color="bg-purple-50 text-purple-600" />
  </div>
);

export default StatsHeader;