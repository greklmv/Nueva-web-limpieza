import React from 'react';
import { NavLink } from 'react-router-dom';
import { CURRENT_USER_AVATAR } from '../constants';

export const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/schedule', icon: 'calendar_month', label: 'Schedule' },
    { path: '/', icon: 'check_circle', label: 'Validation' }, // Validation as Home for this app
    { path: '/staff', icon: 'group', label: 'Staff' },
    { path: '/reports', icon: 'description', label: 'Reports' },
  ];

  return (
    <nav className="w-16 bg-sidebar flex flex-col items-center py-6 gap-8 shrink-0 z-20 text-gray-400 h-full">
      {/* Logo / Brand */}
      <NavLink
        to="/"
        className={({ isActive }) => `
          size-10 flex items-center justify-center rounded-xl bg-primary/20 text-primary mb-4 cursor-pointer hover:bg-primary/30 transition-colors
          ${isActive ? 'ring-2 ring-primary/50' : ''}
        `}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
          train
        </span>
      </NavLink>

      {/* Nav Items */}
      <div className="flex flex-col gap-6 w-full items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group flex flex-col items-center gap-1 w-full relative px-2 transition-colors duration-200 
              ${isActive ? 'text-primary' : 'hover:text-white'}
            `}
            title={item.label}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full"></div>
                )}
                <span
                  className={`material-symbols-outlined transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>

                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-900 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-6 w-full items-center">
        <button className="size-8 rounded-full overflow-hidden border border-gray-600 hover:border-white transition-colors">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${CURRENT_USER_AVATAR}')` }}
          ></div>
        </button>
      </div>
    </nav>
  );
};
