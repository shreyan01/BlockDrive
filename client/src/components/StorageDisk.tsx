import React from 'react';

interface CircularDiskProps {
  used: number;
  total: number;
}

const CircularDisk: React.FC<CircularDiskProps> = ({ used, total }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(used / total, 1) * circumference;

  return (
    <div className='flex flex-row items-center rounded-full z-0 shadow-md'>
    <div className="relative w-32 h-32">
      <svg width="100%" height="100%" viewBox="0 0 120 120" className='rounded-full'>
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#ffffff" // Light gray background circle
          strokeWidth="25"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#40dfaf" // Blue progress circle
          strokeWidth="25"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{Math.round((used / total) * 100)}%</span>
      </div>
    </div>
    </div>
  );
};

export default CircularDisk;
