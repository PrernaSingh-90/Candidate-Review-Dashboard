import { useMemo, useState, useEffect } from 'react'; 
import StatsHeader from './components/Dashboard/StatsHeader';
import FiltersBar from './components/Dashboard/FiltersBar';
import CandidateTable from './components/Dashboard/CandidateTable';
import CandidateDrawer from './components/DetailPanel/CandidateDrawer';
import ComparisonModal from './components/Comparison/ComparisonModal'; 
import mockData from './data/candidates.json'; 

const App = () => {
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('candidates-dashboard-v4');
    return saved ? JSON.parse(saved) : mockData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("All");
  const [videoScoreFilter, setVideoScoreFilter] = useState("All"); 
  const [sortBy, setSortBy] = useState("none");

  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('candidates-dashboard-v4', JSON.stringify(candidates));
  }, [candidates]);

  const updateCandidateScore = (id, field, newValue) => {
    const updated = candidates.map(c => 
      c.id === id ? { ...c, [field]: newValue, reviewed: true } : c
    );
    setCandidates(updated);
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({ ...selectedCandidate, [field]: newValue, reviewed: true });
    }
  };

  const toggleCompare = (candidate) => {
    if (compareList.find(c => c.id === candidate.id)) {
      setCompareList(compareList.filter(c => c.id !== candidate.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, candidate]);
    }
  };

  const filteredCandidates = useMemo(() => {
    let result = candidates.filter(c => {
      const matchesName = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      
      let matchesScore = true;
      if (scoreFilter === "80+") matchesScore = c.assignment_score >= 80;
      else if (scoreFilter === "50-80") matchesScore = c.assignment_score >= 50 && c.assignment_score < 80;
      else if (scoreFilter === "<50") matchesScore = c.assignment_score < 50;

      let matchesVideo = true;
      if (videoScoreFilter === "80+") matchesVideo = c.video_score >= 80;
      else if (videoScoreFilter === "50-80") matchesVideo = c.video_score >= 50 && c.video_score < 80;
      else if (videoScoreFilter === "<50") matchesVideo = c.video_score < 50;

      return matchesName && matchesStatus && matchesScore && matchesVideo;
    });

    if (sortBy === "highest") {
      result.sort((a, b) => b.assignment_score - a.assignment_score);
    }
    return result;
  }, [candidates, searchTerm, statusFilter, scoreFilter, videoScoreFilter, sortBy]);

  const stats = useMemo(() => ({
    total: candidates.length,
    reviewed: candidates.filter(c => c.reviewed).length,
    shortlisted: candidates.filter(c => c.status === 'Shortlisted').length,
    pending: candidates.filter(c => !c.reviewed).length
  }), [candidates]);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900 font-sans pb-10'>
      <div className='max-w-350 mx-auto p-4 md:p-6 lg:p-8 space-y-6'>
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h1 className='text-3xl font-black'>Hiring Dashboard</h1>
          <button onClick={() => setIsCompareOpen(true)} disabled={compareList.length < 2} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30">Compare ({compareList.length})</button>
        </header>

        <StatsHeader stats={stats}/>

        <FiltersBar 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          scoreFilter={scoreFilter} setScoreFilter={setScoreFilter}
          videoScoreFilter={videoScoreFilter} setVideoScoreFilter={setVideoScoreFilter}
          sortBy={sortBy} setSortBy={setSortBy}
        />

         <main className='bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden'>
          <CandidateTable 
            candidates={filteredCandidates}
            onSelect={setSelectedCandidate}
            toggleCompare={toggleCompare}
            compareList={compareList}
          />
         </main>
      </div>

      <CandidateDrawer candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} onUpdateScore={updateCandidateScore} />
      {isCompareOpen && <ComparisonModal selectedCandidates={compareList} onClose={() => setIsCompareOpen(false)} />}
    </div>
  );
};
export default App;