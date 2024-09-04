import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherProps {
  city: string;
  unit: 'celsius' | 'fahrenheit';
  lat: number,
  long: number
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
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  startTime: string;
}

interface Forecast {
  properties: {
    periods: ForecastPeriod[];
  };
}

export async function Weather({ city, unit, lat = '30.2672', long = '-97.7431', }: WeatherProps) {
  try {
    const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`)
    if (!pointResponse.ok) throw new Error('Failed to fetch weather point')
    const pointData: WeatherPoint = await pointResponse.json()

    const forecastResponse = await fetch(pointData.properties.forecast)
    if (!forecastResponse.ok) throw new Error('Failed to fetch forecast')
    const forecastData: Forecast = await forecastResponse.json()

    return {
      location: `${pointData.properties.relativeLocation.properties.city}, ${pointData.properties.relativeLocation.properties.state}`,
      forecast: forecastData.properties.periods
    }
  } catch (error) {
    console.error('Error fetching forecast:', error)
    return { location: '', forecast: [] }
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">{city} Weather</h2>
      <div className="text-gray-600">{unit}</div>
    </div>
  );
}