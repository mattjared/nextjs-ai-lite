import React from 'react';

interface WeatherProps {
  city: string;
  unit: string;
}

interface WeatherData {
  temperature: number;
  unit: string;
  description: string;
}

export async function Weather({ city, unit }: WeatherProps) {
  // const response = await fetch(
  //   `https://api.example.com/weather?city=${city}&unit=${unit}`
  // );

  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }

  // const data: WeatherData = await response.json();

  return (
    <div>
      {/* <div>{data.temperature}</div>
      <div>{data.unit}</div>
      <div>{data.description}</div> */}
      <div>75deg</div>
      <div>Faranheit</div>
      <div>nice day</div>
    </div>
  );
}
