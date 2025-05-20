import { useState } from 'react';
import Documentation from '../Pages/Docs/Documentation';

export default function Welcome() {
  const [showDoc, setShowDoc] = useState(false);

  if (showDoc) return <Documentation />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"></div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Fractal
          </span>
        </div>
        <div className="space-x-4">
          <a 
            href="/login" 
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Login
          </a>
          <a 
            href="/register" 
            className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            Welcome to Fractal
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg text-center">
            Your modular, fast and scalable platform — perfect for modern projects with React and Python.
          </p>

          <div className="grid gap-5 md:grid-cols-2 mt-8 text-left">
            <div
              className="cursor-pointer rounded-xl bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:border-purple-500 dark:hover:border-purple-400"
              onClick={() => setShowDoc(true)}
            >
              <div className="text-xs uppercase font-semibold text-purple-600 dark:text-purple-400 mb-2">
                Documentation
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Complete Documentation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Learn how to structure projects with Fractal Framework using React and FastAPI.
              </p>
              <span className="text-purple-600 dark:text-purple-400 font-medium text-sm hover:underline">
                ACCESS →
              </span>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:border-purple-500 dark:hover:border-purple-400">
              <div className="text-xs uppercase font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Quick Start
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                First Steps
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Get started with your first project using our step-by-step guide.
              </p>
              <a 
                href="/login" 
                className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
              >
                GET STARTED →
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/login"
              className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}