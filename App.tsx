import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TrainList } from './components/TrainList';
import { TrainDetail } from './components/TrainDetail';
import { PlaceholderView } from './components/PlaceholderView';
import { useTrains } from './hooks/useTrains';

const ValidationLayout: React.FC = () => {
  const { trains, isLoading, error } = useTrains();
  // We can default to first train or handle empty state.
  // We need to keep track of selected ID.
  const [selectedTrainId, setSelectedTrainId] = useState<string>('');

  // Update selected ID when trains load if none selected
  React.useEffect(() => {
    if (trains.length > 0 && !selectedTrainId) {
      setSelectedTrainId(trains[0].id);
    }
  }, [trains, selectedTrainId]);

  const selectedTrain = trains.find((t) => t.id === selectedTrainId) || trains[0];

  const handleNext = () => {
    const currentIndex = trains.findIndex((t) => t.id === selectedTrainId);
    if (currentIndex < trains.length - 1) {
      setSelectedTrainId(trains[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = trains.findIndex((t) => t.id === selectedTrainId);
    if (currentIndex > 0) {
      setSelectedTrainId(trains[currentIndex - 1].id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full bg-surface text-slate-500">
        <div className="flex flex-col items-center gap-2">
          <span className="material-symbols-outlined animate-spin" style={{ fontSize: '32px' }}>
            progress_activity
          </span>
          <span className="text-sm font-medium">Loading Schedule...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <TrainList trains={trains} selectedId={selectedTrainId} onSelect={setSelectedTrainId} />
      {selectedTrain ? (
        <TrainDetail
          key={selectedTrain.id}
          train={selectedTrain}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50 text-slate-400">
          Select a train to view details
        </div>
      )}
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
