import React from 'react';
import background from "../../assets/img/Honors.jpg";

function Card() {
  return (
    <div className="grid grid-cols-3 gap-5">
  {[...Array(6)].map((_, index) => (
    <div key={index} className="max-w-xs rounded overflow-hidden shadow  hover:bg-slate-200">
      {/* Card Image */}
      <div className="relative">
        <img className="w-full" src={background} alt="Background" />
        <div className="absolute top-0 left-0 p-4">
          <h2 className="text-white text-xl font-bold">GDSE - IJSE</h2>
          <p className="text-white">GDSE71</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 py-4 h-32">
        <div className="h-16 overflow-y-auto"></div>

        {/* Card Footer */}
        <div className="flex justify-end items-center h-10 gap-5 border-t-2">
          <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9-2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM8 7h8v2H8zm0 4h8v2H8zm0 4h8v2H8z" />
          </svg>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default Card;