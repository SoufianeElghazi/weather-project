import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Gauge, Sun, CloudRain } from 'lucide-react';
import WeatherChart from './components/WeatherChart';
import MetricCard from './components/MetricCard';
import RegionSelector from './components/RegionSelector';
import { WeatherData, HistoricalData, TimeRange } from './types/weather';

// Simulated data
const mockWeatherData: WeatherData = {
  temperature: 22,
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  uvIndex: 6,
  precipitation: 20,
  description: "Partly cloudy",
  icon: "02d"
};

const generateMockHistoricalData = (days: number): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const now = Date.now() / 1000;
  for (let i = 0; i < days; i++) {
    data.push({
      timestamp: now - (i * 86400),
      temperature: 20 + Math.random() * 10,
      humidity: 60 + Math.random() * 20,
      windSpeed: 10 + Math.random() * 5,
      pressure: 1010 + Math.random() * 10
    });
  }
  return data.reverse();
};

function App() {
  const [selectedRegion, setSelectedRegion] = useState("London");
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    // Simulate API call
    const days = timeRange === "1d" ? 1 : timeRange === "7d" ? 7 : 30;
    setHistoricalData(generateMockHistoricalData(days));
  }, [timeRange, selectedRegion]);

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(25, 85, 155, 0.8), rgba(35, 95, 165, 0.85)),
            url('https://images.unsplash.com/photo-1495312040167-3dd6e4e90e73?auto=format&fit=crop&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
        }}
      />

      <div className="relative z-10">
        <header className="bg-white/80 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Cloud className="w-8 h-8 text-blue-500 mr-2" />
                Weather Dashboard
              </h1>
              <RegionSelector
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
              />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Temperature"
              value={weatherData.temperature}
              unit="°C"
              icon={Sun}
              color="text-red-500"
            />
            <MetricCard
              title="Humidity"
              value={weatherData.humidity}
              unit="%"
              icon={Droplets}
              color="text-blue-500"
            />
            <MetricCard
              title="Wind Speed"
              value={weatherData.windSpeed}
              unit="km/h"
              icon={Wind}
              color="text-gray-500"
            />
            <MetricCard
              title="Pressure"
              value={weatherData.pressure}
              unit="hPa"
              icon={Gauge}
              color="text-purple-500"
            />
            <MetricCard
              title="UV Index"
              value={weatherData.uvIndex}
              unit=""
              icon={Sun}
              color="text-yellow-500"
            />
            <MetricCard
              title="Precipitation"
              value={weatherData.precipitation}
              unit="mm"
              icon={CloudRain}
              color="text-indigo-500"
            />
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Temperature Trend</h2>
              <div className="flex space-x-2">
                {(['1d', '7d', '30d'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded ${
                      timeRange === range
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <WeatherChart
              data={historicalData}
              metric="temperature"
              color="#ef4444"
            />
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Humidity Trend</h2>
            </div>
            <WeatherChart
              data={historicalData}
              metric="humidity"
              color="#3b82f6"
            />
          </div>
        </main>

        <footer className="bg-white/80 backdrop-blur-md border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500">
              Created with React and Recharts
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;