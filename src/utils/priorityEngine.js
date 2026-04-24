const WEIGHTS = {
  assignment: 0.30,
  video: 0.25,
  ats: 0.20,
  github: 0.15,
  communication: 0.10
};

export const calculatePriority = (scores) => {
  const totalScore = 
    (scores.assignment_score * WEIGHTS.assignment) +
    (scores.video_score * WEIGHTS.video) +
    (scores.ats_score * WEIGHTS.ats) +
    (scores.github_score * WEIGHTS.github) +
    (scores.communication_score * WEIGHTS.communication);

  if (totalScore >= 85) return { 
    level: 'P0', 
    color: 'bg-green-100 text-green-700 border-green-200', 
    status: 'Interview' 
  };
  if (totalScore >= 75) return { 
    level: 'P1', 
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
    status: 'Shortlist' 
  };
  if (totalScore >= 60) return { 
    level: 'P2', 
    color: 'bg-orange-100 text-orange-700 border-orange-200', 
    status: 'Watchlist' 
  };
  
  return { 
    level: 'P3', 
    color: 'bg-red-100 text-red-700 border-red-200', 
    status: 'Reject' 
  };
};