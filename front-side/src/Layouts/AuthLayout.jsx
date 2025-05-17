import React from 'react';
import { FiHome, FiPieChart, FiSettings, FiSearch, FiCpu, FiLayers, FiFilter, FiUpload, FiSliders, FiBell } from 'react-icons/fi';

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-72 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">Fractal</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <a 
            href="#" 
            className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-all group"
          >
            <FiHome className="text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors" />
            <span className="font-medium">Dashboard</span>
            <span className="ml-auto bg-purple-600 text-xs text-white px-2 py-1 rounded-full">New</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            <FiPieChart className="text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
            <span>Analytics</span>
          </a>
          
          {/* Editor Section */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 px-4 tracking-wider">Editor</p>
            <div className="space-y-1">
              {[
                { icon: <FiCpu />, name: 'Magic Guide' },
                { icon: <FiLayers />, name: 'Ideas' },
                { icon: <FiFilter />, name: 'Filter' },
                { icon: <FiUpload />, name: 'Upload' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href="#" 
                  className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all group"
                >
                  <span className="text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Settings Section */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 px-4 tracking-wider">Configuration</p>
            <div className="space-y-1">
              {[
                { icon: <FiSettings />, name: 'Features' },
                { icon: <FiSliders />, name: 'Settings' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href="#" 
                  className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all group"
                >
                  <span className="text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-8">
          <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, features, or settings..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="ml-6 flex items-center gap-5">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 relative">
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-purple-500"></span>
              <FiBell className="w-5 h-5" />
            </button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            <button className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">JD</span>
              </div>
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Content Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Dashboard</h2>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Project
              </button>
            </div>
            
            {/* Main Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}