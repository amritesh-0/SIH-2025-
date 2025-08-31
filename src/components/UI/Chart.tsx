import React from 'react';

interface ChartProps {
  data: { label: string; value: number; color?: string }[];
  type: 'bar' | 'line' | 'doughnut';
  title: string;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ data, type, title, className = "h-64" }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-48 px-4 pb-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1 mx-1">
          <div className="relative w-full flex justify-center mb-2">
            <div
              className={`w-8 rounded-t-lg transition-all duration-700 ${
                item.color || 'bg-gradient-to-t from-teal-500 to-blue-600'
              }`}
              style={{
                height: `${(item.value / maxValue) * 150}px`,
                animationDelay: `${index * 100}ms`
              }}
            />
          </div>
          <span className="text-xs text-gray-600 text-center">{item.label}</span>
          <span className="text-xs font-semibold text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="relative h-48 px-4 pb-4">
      <svg className="w-full h-full">
        <polyline
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 100},${100 - (item.value / maxValue) * 80}`
          ).join(' ')}
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {data.map((item, index) => (
          <circle
            key={index}
            cx={`${(index / (data.length - 1)) * 100}%`}
            cy={`${100 - (item.value / maxValue) * 80}%`}
            r="4"
            fill="#ffffff"
            stroke="#14B8A6"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDoughnutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;
              
              const path = `M 64 64 L 64 16 A 48 48 0 ${angle > 180 ? 1 : 0} 1 ${
                64 + 48 * Math.cos((startAngle + angle) * Math.PI / 180)
              } ${
                64 + 48 * Math.sin((startAngle + angle) * Math.PI / 180)
              } Z`;
              
              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color || `hsl(${index * 60}, 70%, 60%)`}
                  className="hover:opacity-80 transition-opacity"
                />
              );
            })}
            <circle cx="64" cy="64" r="20" fill="white" />
          </svg>
        </div>
        <div className="ml-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 60%)` }}
              />
              <span className="text-sm text-gray-700">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {type === 'bar' && renderBarChart()}
      {type === 'line' && renderLineChart()}
      {type === 'doughnut' && renderDoughnutChart()}
    </div>
  );
};

export default Chart;