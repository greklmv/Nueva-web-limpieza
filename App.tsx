import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TrainList } from './components/TrainList';
import { TrainDetail } from './components/TrainDetail';
import { PlaceholderView } from './components/PlaceholderView';
import { MOCK_TRAINS } from './constants';

const ValidationLayout: React.FC = () => {
  const [selectedTrainId, setSelectedTrainId] = useState<string>(MOCK_TRAINS[0].id);
  const selectedTrain = MOCK_TRAINS.find(t => t.id === selectedTrainId) || MOCK_TRAINS[0];

  const handleNext = () => {
    const currentIndex = MOCK_TRAINS.findIndex(t => t.id === selectedTrainId);
    if (currentIndex < MOCK_TRAINS.length - 1) {
      setSelectedTrainId(MOCK_TRAINS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = MOCK_TRAINS.findIndex(t => t.id === selectedTrainId);
    if (currentIndex > 0) {
      setSelectedTrainId(MOCK_TRAINS[currentIndex - 1].id);
    }
  };

  return (
    <>
      <TrainList
        trains={MOCK_TRAINS}
        selectedId={selectedTrainId}
        onSelect={setSelectedTrainId}
      />
      <TrainDetail
        train={selectedTrain}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-background-light text-slate-900 font-display h-screen flex overflow-hidden antialiased selection:bg-primary/20 selection:text-primary">
        <Sidebar />
        <main className="flex flex-1 overflow-hidden w-full h-full relative">
          <Routes>
            <Route path="/" element={<ValidationLayout />} />
            <Route path="/schedule" element={<PlaceholderView title="Schedule Planner" />} />
            <Route path="/staff" element={<PlaceholderView title="Staff Management" />} />
            <Route path="/reports" element={<PlaceholderView title="Reports & Analytics" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
