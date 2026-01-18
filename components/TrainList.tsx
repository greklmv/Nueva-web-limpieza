import React, { useState, useMemo } from 'react';
import { Train, TrainStatus } from '../types';

interface TrainListProps {
  trains: Train[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TrainList: React.FC<TrainListProps> = ({ trains, selectedId, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrains = useMemo(() => {
    return trains.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [trains, searchTerm]);

  return (
    <aside className="w-[360px] flex flex-col border-r border-border bg-surface shrink-0 z-10 shadow-sm h-full">
      {/* List Header */}
      <div className="p-4 border-b border-border bg-surface">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Turno Noche - 18 Oct</h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">62 Trains</span>
        </div>

        {/* Search */}
        <div className="relative group">
          <input
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 outline-none"
            placeholder="Search train ID (e.g. 112-05)..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" style={{ fontSize: '20px' }}>search</span>
          {/* Keyboard shortcut hint */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="hidden group-focus-within:none sm:inline-block px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-sans">/</kbd>
          </div>
        </div>
      </div>

      {/* Train List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-slate-50/50">
        {filteredTrains.map((train) => {
          const isSelected = train.id === selectedId;
          const isValidated = train.status === TrainStatus.VALIDATED;

          return (
            <div
              key={train.id}
              onClick={() => onSelect(train.id)}
              className={`
                group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                ${isSelected
                  ? 'bg-white border border-primary/30 ring-1 ring-primary/10 shadow-sm relative overflow-hidden'
                  : 'hover:bg-white border border-transparent hover:border-border opacity-80 hover:opacity-100'
                }
              `}
            >
              {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}

              <div className="flex flex-col gap-0.5 ml-2">
                <span className={`text-sm ${isSelected ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                  {train.name}
                </span>
                <span className={`text-xs ${isSelected ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
                  {train.taskType}
                </span>
              </div>

              {isValidated ? (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                  <span className="material-symbols-outlined" style={{ fontSize: '12px', fontWeight: 700 }}>check</span>
                  Validated
                </span>
              ) : (
                isSelected ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">Pending</span>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>arrow_forward_ios</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Pending</span>
                )
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
