import { Search } from 'lucide-react';

const FiltersBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, scoreFilter, setScoreFilter, videoScoreFilter, setVideoScoreFilter, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input 
          type="text" placeholder="Search by name..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        {/* Assignment Filter */}
        <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)} className="px-3 py-2 bg-slate-50 border-none rounded-lg text-xs font-bold outline-none cursor-pointer">
          <option value="All">Assignment: All</option>
          <option value="80+">80% - 100%</option>
          <option value="50-80">50% - 80%</option>
          <option value="<50">Below 50%</option>
        </select>

        {/* Video Filter (Mandatory) */}
        <select value={videoScoreFilter} onChange={(e) => setVideoScoreFilter(e.target.value)} className="px-3 py-2 bg-blue-50 text-blue-700 border-none rounded-lg text-xs font-bold outline-none cursor-pointer">
          <option value="All">Video Score: All</option>
          <option value="80+">Video 80%+</option>
          <option value="50-80">Video 50-80%</option>
          <option value="<50">Video &lt; 50%</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-slate-50 border-none rounded-lg text-xs font-bold outline-none cursor-pointer">
          <option value="All">All Status</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-indigo-50 text-indigo-700 border-none rounded-lg text-xs font-bold outline-none cursor-pointer">
          <option value="none">Sort By</option>
          <option value="highest">Highest Score</option>
          <option value="priority">Priority (P0-P3)</option>
        </select>
      </div>
    </div>
  );
};
export default FiltersBar;