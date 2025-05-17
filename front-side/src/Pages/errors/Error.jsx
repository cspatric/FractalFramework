import { useEffect } from 'react';
import { FaExclamation, FaFileCode, FaTimes, FaRedo } from 'react-icons/fa';

const ReactErrorPage = ({ 
  errorMessage = "Failed to compile: SyntaxError in ./src/components/Login.jsx", 
  errorDetails = "Unexpected token (42:12)",
  errorFile = "src/components/Login.jsx",
  errorTrace = []
}) => {
  useEffect(() => {
    document.title = "React Error | Fractal";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 text-white p-4">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-2xl border border-blue-500/20 shadow-xl shadow-blue-500/10 overflow-hidden">
        {/* Error Header */}
        <div className="flex items-center gap-4 p-6 bg-blue-500/10 border-b border-blue-500/20">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse">
            <FaExclamation className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            React Runtime Error
          </h1>
        </div>

        {/* Error Content */}
        <div className="p-6">
  <div className="mb-6 space-y-1">
    <p className="text-cyan-300 font-medium">{errorMessage}</p>
    {errorDetails && <p className="text-cyan-400 text-sm">{errorDetails}</p>}
  </div>

  {/* Error Details */}
  <div className="mb-6 rounded-lg bg-slate-900/70 border border-cyan-500/20 overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 bg-cyan-500/10 border-b border-cyan-500/20 text-cyan-400 font-mono text-sm">
      <FaFileCode />
      <span>{errorFile}</span>
    </div>

    <div className="p-4 font-mono text-sm overflow-x-auto">
      {errorTrace.length > 0 ? (
        errorTrace.map((line, index) => (
          <div 
            key={index} 
            className={`flex ${line.highlight ? 'bg-cyan-500/10 text-cyan-400' : ''}`}
          >
            <span className="w-10 text-right pr-3 text-slate-500 select-none">
              {line.number}
            </span>
            <span className="flex-1">
              {line.content}
            </span>
          </div>
        ))
      ) : (
        <div className="text-slate-400 italic">
          No stack trace available
        </div>
      )}
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-end gap-3">
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all"
    >
      <FaTimes />
      <span>Go Back</span>
    </button>
    <button
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all"
    >
      <FaRedo />
      <span>Try Again</span>
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default ReactErrorPage;