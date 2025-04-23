import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const loadingMessages = [
    "Gathering sustainability metrics...",
    "Preparing your ESG insights...",
    "Analysing environmental performance data...",
    "Building your comprehensive dashboard...",
    "Calculating carbon footprint metrics...",
    "Retrieving social responsibility indicators..."
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-lg">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-6" />
        <div className="h-8 flex items-center justify-center">
          <p className="text-lg font-medium text-gray-700 text-center animate-pulse">
            {loadingMessages[messageIndex]}
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
          We're preparing a comprehensive ESG dashboard with actionable insights for your analysis.
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;