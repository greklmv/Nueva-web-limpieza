import React, { useState } from 'react';
import { Train, TASK_OPTIONS, ValidationFormState } from '../types';

interface TrainDetailProps {
  train: Train;
  onNext: () => void;
  onPrev: () => void;
}

export const TrainDetail: React.FC<TrainDetailProps> = ({ train, onNext, onPrev }) => {
  // Local state for the form
  const [formState, setFormState] = useState<ValidationFormState>({
    actualTask: train.taskType,
    staff: ['Juan Pérez', 'Ana García'],
    startTime: '22:00',
    endTime: '06:00',
    hasIncident: false,
    incidentDescription: '',
  });

  const [inputValue, setInputValue] = useState('');

  const handleAddStaff = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setFormState((prev) => ({
        ...prev,
        staff: [...prev.staff, inputValue.trim()],
      }));
      setInputValue('');
    }
  };

  const removeStaff = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      staff: prev.staff.filter((_, i) => i !== index),
    }));
  };

  return (
    <section className="flex-1 flex flex-col bg-background-light relative min-w-[500px] h-full">
      {/* Detail Header */}
      <header className="h-16 px-8 flex items-center justify-between bg-surface border-b border-border shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined">train</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">
              Validación: Tren {train.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Last updated by Supervisor A. at 14:00</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            className="flex items-center justify-center size-9 rounded-lg border border-border text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            title="Previous Train"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={onNext}
            className="flex items-center justify-center size-9 rounded-lg border border-border text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            title="Next Train"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <button
            className="flex items-center justify-center size-9 rounded-lg border border-border text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors ml-2"
            title="More Options"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </header>

      {/* Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Comparison Card (Planned vs Actual) */}
          <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>
                assignment
              </span>
              Task Verification
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {/* Planned (Read Only) */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                  Tarea Planificada
                </label>
                <div className="text-lg font-medium text-slate-700">{train.taskType}</div>
                <div className="text-xs text-slate-400 mt-1">Auto-assigned from Schedule</div>
              </div>
              {/* Actual (Editable) */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Tarea Realizada
                </label>
                <div className="relative">
                  <select
                    value={formState.actualTask}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, actualTask: e.target.value }))
                    }
                    className="w-full h-14 pl-4 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer hover:border-slate-400 transition-colors outline-none"
                  >
                    {TASK_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Staff & Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Staff Input */}
            <div className="md:col-span-2 bg-surface rounded-xl shadow-sm border border-border p-6">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '18px' }}
                >
                  group
                </span>
                Staff Assignment
              </h3>
              <label className="block text-xs font-medium text-slate-500 mb-2">Operarios</label>

              <div className="w-full min-h-[56px] rounded-lg border border-slate-300 bg-white p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                {formState.staff.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1"
                  >
                    {member}
                    <button
                      onClick={() => removeStaff(idx)}
                      className="hover:bg-primary/20 rounded-full p-0.5 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}

                <input
                  type="text"
                  className="flex-1 min-w-[120px] outline-none border-none p-1 text-sm bg-transparent placeholder:text-slate-400 focus:ring-0"
                  placeholder="Type to add..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleAddStaff}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Press Enter to add a name</p>
            </div>

            {/* Time Input */}
            <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '18px' }}
                >
                  schedule
                </span>
                Timing
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Inicio</label>
                  <input
                    type="time"
                    value={formState.startTime}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, startTime: e.target.value }))
                    }
                    className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Fin</label>
                  <input
                    type="time"
                    value={formState.endTime}
                    onChange={(e) => setFormState((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Incidents Section */}
          <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  id="incidence"
                  type="checkbox"
                  checked={formState.hasIncident}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, hasIncident: e.target.checked }))
                  }
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="incidence"
                  className="text-sm font-semibold text-slate-900 cursor-pointer select-none"
                >
                  Reportar Incidencia
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check this box if there were any issues or delays during maintenance.
                </p>

                <div
                  className={`mt-4 transition-all duration-300 ease-in-out ${formState.hasIncident ? 'opacity-100 max-h-40' : 'opacity-50 max-h-40 grayscale pointer-events-none'}`}
                >
                  <textarea
                    value={formState.incidentDescription}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, incidentDescription: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 resize-none outline-none"
                    placeholder="Describa la incidencia aquí..."
                    disabled={!formState.hasIncident}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for scrolling above fixed footer */}
        <div className="h-24"></div>
      </div>

      {/* Sticky Footer */}
      <footer className="h-20 bg-surface border-t border-border px-8 flex items-center justify-between shrink-0 absolute bottom-0 w-full z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            keyboard
          </span>
          <span>
            Use <strong>Tab</strong> to navigate fields
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
            Cancel
          </button>
          <button
            onClick={onNext}
            className="group relative px-8 py-2.5 bg-primary text-white rounded-lg font-medium text-sm shadow-md hover:bg-teal-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all flex items-center gap-2"
          >
            <span>Confirmar y Siguiente</span>
            <span className="bg-teal-800/40 text-teal-50 px-1.5 py-0.5 rounded text-[10px] font-sans border border-teal-500/30 group-hover:border-teal-400/50 transition-colors">
              Enter
            </span>
            <span
              className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform"
              style={{ fontSize: '18px' }}
            >
              arrow_forward
            </span>
          </button>
        </div>
      </footer>
    </section>
  );
};
