'use client';

import { useState } from 'react'
import { Cloud, Sun, Droplets, Wind, ChevronDown, ChevronUp } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface WeatherProps {
  city: string;
  unit: 'celsius' | 'fahrenheit';
}

interface WeatherPoint {
  properties: {
    forecast: string;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      };
    };
  };
}

interface ForecastPeriod {
  probabilityOfPrecipitation: any;
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  startTime: string;
  windSpeed: string;
}

interface Forecast {
  properties: {
    periods: ForecastPeriod[];
  };
}

export async function Weather({ city, unit }: WeatherProps) {
  const [useCelsius, setUseCelsius] = useState(false);
  const [showFullForecast, setShowForecast] = useState(false);
  const [forecastDays, setForecastDays] = useState(2);
  const getLatLong = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`)
  const getLatLongData = await getLatLong.json()
  const lat = getLatLongData[0].lat;
  const long = getLatLongData[0].lon;
  // If you get rate limited try hardcoding in Austin // const lat = 30.2672; // const long = -97.7431;
  const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${long}`)
  if (!pointResponse.ok) throw new Error('Failed to fetch weather point')
  const pointData: WeatherPoint = await pointResponse.json()
  const forecastResponse = await fetch(pointData.properties.forecast)
  if (!forecastResponse.ok) throw new Error('Failed to fetch forecast')
  const forecastData: Forecast = await forecastResponse.json()
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
  }
  const handleClick = () => {
    setShowForecast(true);
    setForecastDays(8);
  }

  const handleConvert = () => {
    setUseCelsius(!useCelsius);
  }
  const convertToCelsius = (current: number) => {
    return Math.round((current - 32) * 5 / 9);
  };

  return (
    <div className="min-w-full mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden" key={`${city}-${unit}`}>
        <h2 className="text-4xl font-bold text-white text-center pt-8">{city}</h2>
        <div className="flex items-center space-x-2 text-white justify-center mt-3">
          <Label className={`text-sm ${!useCelsius ? 'font-bold' : ''}`}>°F</Label>
          <Switch
            id="temp-switch"
            checked={useCelsius}
            onCheckedChange={handleConvert}
          />
          <Label className={`text-sm ${useCelsius ? 'font-bold' : ''}`}>°C</Label>
        </div>
        {forecastData.properties.periods.map((day, index) => (
          index % 2 === 0 && (index < forecastDays) && (
            <div key={index} className="px-6 py-8">
              <div className="flex items-center justify-between gap-10">
                <div>
                  <p className="text-lg font-semibold text-white mt-1">{formatDate(day.startTime)}</p>
                  <p className="text-blue-100 mt-1">{day.shortForecast}</p>
                </div>
                <div className="text-6xl font-bold text-white">{useCelsius ? convertToCelsius(day.temperature) : day.temperature}°{useCelsius ? "C" : "F"}</div>
              </div>
              <div className="mt-6 flex justify-between text-blue-100">
                <div className="flex items-center">
                  <Droplets size={18} className="mr-1" />
                  <span>Precipitation: {day.probabilityOfPrecipitation.value === null ? 0 : day.probabilityOfPrecipitation.value}%</span>
                </div>
                <div className="flex items-center">
                  <Wind size={18} className="mr-1" />
                  <span>Wind: {day.windSpeed}</span>
                </div>
              </div>
              {!showFullForecast && (
                <div className="flex flex-row items-center justify-center pt-10 text-white">
                  <button className="text-sm font-semibold" onClick={handleClick}>Show Complete Forecast</button> 
                  <ChevronDown size={20} />
                </div>
              )}
            </div>
          )
        ))}      
      </div>
  );
}