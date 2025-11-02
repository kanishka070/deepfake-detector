import { useState } from 'react';
import './styles/global.css';
import Landing from './pages/landing/Landing';
import Analyze from './pages/analyze/Analyze';

function App() {
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const handleGetStarted = () => {
    setShowAnalyzer(true);
  };

  const handleBackToLanding = () => {
    setShowAnalyzer(false);
  };

  return (
    <div className="app">
      {!showAnalyzer ? (
        <Landing onGetStarted={handleGetStarted} />
      ) : (
        <Analyze onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}

export default App;
