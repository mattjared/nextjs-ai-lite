'use server'

import { headers } from 'next/headers'

export async function getGeoLocation() {
  const headersList = headers()
  
  const country = headersList.get('x-vercel-ip-country') || 'Unknown'
  const city = headersList.get('x-vercel-ip-city') || 'Unknown'
  const latitude = headersList.get('x-vercel-ip-latitude') || 'Unknown'
  const longitude = headersList.get('x-vercel-ip-longitude') || 'Unknown'

  return { country, city, latitude, longitude }
}

export async function checkAIAvailability() {
  const envVarExists = !!process.env.OPENAI_API_KEY;
  return envVarExists;
}