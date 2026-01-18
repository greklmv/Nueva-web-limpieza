import React from 'react';

interface PlaceholderViewProps {
  title: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background-light h-full fade-in">
      <div className="size-24 bg-slate-200/50 rounded-full flex items-center justify-center mb-6 text-slate-400">
        <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
          construction
        </span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
      <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
        Este módulo está actualmente en desarrollo. <br />
        Pronto podrás gestionar la información de {title.toLowerCase()} desde aquí.
      </p>
      <div className="mt-8 flex gap-3">
        <button className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
          Documentación
        </button>
        <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm shadow-primary/20">
          Solicitar Acceso
        </button>
      </div>
    </div>
  );
};
