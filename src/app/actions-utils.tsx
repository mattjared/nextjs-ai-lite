'use server'

import { headers } from 'next/headers'

interface GeoData {
  latitude: string | undefined;
  longitude: string | undefined;
}

export async function getGeoLocation(): Promise<GeoData> {
  const headersList = headers()
  
  // Check if we're running on Vercel
  const isVercel = process.env.VERCEL === '1'

  if (isVercel) {
    // We're on Vercel, use the geolocation headers
    const latitude = headersList.get('x-vercel-ip-latitude') || undefined
    const longitude = headersList.get('x-vercel-ip-longitude') || undefined
    return { latitude, longitude }
  } else {
    // We're running locally, return mock data or fetch from an external service
    return getMockOrLocalGeoData()
  }
}

function getMockOrLocalGeoData(): GeoData {
  // You can replace this with actual logic to get local IP geolocation
  // For now, we'll just return mock data
  return {
    latitude: '40.7128',
    longitude: '-74.0060'
  }
}

export async function checkAIAvailability() {
  const envVarExists = !!process.env.OPENAI_API_KEY;
  return envVarExists;
}