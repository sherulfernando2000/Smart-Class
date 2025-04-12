import React from 'react';

const LoadingOverlay = ({ isLoading, message = "Processing..." }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;