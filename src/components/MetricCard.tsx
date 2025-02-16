import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-2 text-gray-600">{unit}</span>
      </div>
    </div>
  );
};

export default MetricCard;