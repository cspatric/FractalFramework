import { useState } from 'react';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = {
    introduction: {
      title: 'Introduction',
      items: [
        'Fractal Framework Overview',
        'Adapted MVC Concept',
        'Requirements and Technologies'
      ]
    },
    gettingStarted: {
      title: 'Getting Started',
      items: [
        'Cloning the Repository',
        'Installing Dependencies',
        'Folder Structure',
        'Environment Variables (.env)',
        'Running the Project'
      ]
    },
    backendStructure: {
      title: 'Backend Structure (FastAPI + MVC)',
      items: [
        'Architecture Overview',
        'Important Directories',
        'controllers/',
        'services/',
        'middlewares/',
        'requests/',
        'responses/',
        'models/',
        'routes/',
        'migrations/',
        'database/'
      ]
    },
    backendComponents: {
      title: 'Creating Backend Components',
      items: [
        'Creating a Controller',
        'Creating a Service',
        'Creating Middleware',
        'Creating Request Validation',
        'Creating Standard Responses',
        'Creating Routes',
        'Creating ORM Models'
      ]
    },
    database: {
      title: 'Database',
      items: [
        'Connection Configuration',
        'Creating Migrations',
        'Running Migrations',
        'Seeders and Initial Data',
        'Database Access via Services'
      ]
    },
    frontend: {
      title: 'Frontend (React + Tailwind)',
      items: [
        'Folder Structure',
        'Dynamic Page System',
        'Creating New Page Components',
        'Reusable Components',
        'API Connection (fetch/axios)',
        'State Management',
        'Theming (Dark/Light Mode)'
      ]
    },
    commands: {
      title: 'Available Commands',
      items: [
        'Starting the Project',
        'Running Migrations',
        'Creating Components',
        'Automated Testing'
      ]
    },
    auth: {
      title: 'Authentication & Security',
      items: [
        'Login System (JWT, API Keys)',
        'Authentication Middleware',
        'Route Protection',
        'Data Encryption'
      ]
    },
    integrations: {
      title: 'Integrations',
      items: [
        'Proxies and CORS',
        'External Services',
        'Webhooks and Callbacks'
      ]
    },
    testing: {
      title: 'Testing',
      items: [
        'Backend Test Structure',
        'Frontend Test Structure',
        'Test Coverage Best Practices'
      ]
    },
    utilities: {
      title: 'Utilities & Helpers',
      items: [
        'Global Helpers',
        'Formatting Utilities',
        'Error Handling'
      ]
    },
    deploy: {
      title: 'Deployment & Production',
      items: [
        'Frontend Build Optimization',
        'Server Configuration',
        'Logging and Monitoring'
      ]
    }
  };

  const filteredSections = Object.entries(sections).reduce((acc, [key, section]) => {
    const filteredItems = section.items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredItems.length > 0 || searchQuery === '') {
      acc[key] = {
        title: section.title,
        items: filteredItems
      };
    }
    
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"></div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Fractal Docs
          </span>
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">⌕</span>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="space-y-1">
            {Object.entries(filteredSections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                  activeSection === key 
                    ? 'bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-white font-medium border border-purple-200 dark:border-gray-600' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {filteredSections[activeSection]?.title || 'Fractal Documentation'}
            </h1>

            <div className="grid gap-6">
              {filteredSections[activeSection]?.items.map((item, index) => (
                <div 
                  key={index} 
                  className="rounded-xl bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Detailed content about {item.toLowerCase()}. Complete documentation available in the official reference.
                  </p>
                  <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                    Read more →
                  </button>
                </div>
              ))}
            </div>

            {filteredSections[activeSection]?.items.length === 0 && (
              <div className="rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                <div className="text-4xl mb-4 text-gray-400 dark:text-gray-500">⌕</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your search for "{searchQuery}" didn't return any results in this section.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}