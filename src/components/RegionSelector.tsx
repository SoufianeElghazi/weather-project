import React from 'react';
import { Search } from 'lucide-react';

interface RegionSelectorProps {
  onRegionChange: (region: string) => void;
  selectedRegion: string;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onRegionChange, selectedRegion }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search for a city..."
      />
    </div>
  );
};

export default RegionSelector;