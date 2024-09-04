'use client'

import { useState } from 'react'
// import { getGeoLocation } from '../actions/geoActions'
import { getGeoLocation } from '@/app/actions-utils';

interface GeoData {
  country: string;
  city: string;
  latitude: string;
  longitude: string;
}

export default function GeoDisplay() {
  const [geoData, setGeoData] = useState<GeoData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGetLocation = async () => {
    setLoading(true)
    try {
      const data = await getGeoLocation()
      setGeoData(data)
    } catch (error) {
      console.error('Error fetching geolocation:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <button 
        onClick={handleGetLocation}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Server Geolocation'}
      </button>
      {geoData && (
        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2">Country: {geoData.country}</p>
          <p className="mb-2">City: {geoData.city}</p>
          <p className="mb-2">Latitude: {geoData.latitude}</p>
          <p>Longitude: {geoData.longitude}</p>
        </div>
      )}
    </div>
  )
}