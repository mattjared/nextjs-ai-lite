interface WeatherProps {
  city: string;
  unit: 'celsius' | 'fahrenheit';
}

export async function Weather({ city, unit }: WeatherProps) {

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">{city} Weather</h2>
      <div className="text-gray-600">{unit}</div>
    </div>
  );
}