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

export async function Weather({ city, unit }: WeatherProps) {
  const getLatLong = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`)
  const getLatLongData = await getLatLong.json()
  const lat = getLatLongData[0].lat;
  const long = getLatLongData[0].lon;
  const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${long}`)
  if (!pointResponse.ok) throw new Error('Failed to fetch weather point')
  const pointData: WeatherPoint = await pointResponse.json()

  const forecastResponse = await fetch(pointData.properties.forecast)
  if (!forecastResponse.ok) throw new Error('Failed to fetch forecast')
  const forecastData: Forecast = await forecastResponse.json()
  console.log(forecastData);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">{city} Weather</h2>
      <div className="text-gray-600">{unit}</div>
      <div className="bg-sky-500 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">{city}</h2>
        {forecastData.properties.periods.map((day, index) => (
          index % 2 === 0 && (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold">{formatDate(day.startTime)}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{day.temperature}°{day.temperatureUnit}</p>
                </div>
              </div>
              <p>{day.shortForecast}</p>
            </div>
          )
        ))}      
      </div>
    </div>
  );
}