import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { votes } = location.state || { votes: { optionA: 0, optionB: 0 } };

  return (
    <div className="container">
      <h2>Poll Results</h2>
      <p>Option A: {votes.optionA}</p>
      <p>Option B: {votes.optionB}</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default Results;
