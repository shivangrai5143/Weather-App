import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-xl border border-white/20 text-center">
      <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
      <p className="text-white/80">Loading weather data...</p>
    </div>
  );
};