"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple placeholder map implementation
    // In a real application, you would integrate with Google Maps, Mapbox, or similar
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 14px;
          text-align: center;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 250px;
          ">
            <div style="color: #dc2626; font-weight: bold; margin-bottom: 8px;">📍 CEPTAR Property Services</div>
            <div style="color: #666; font-size: 12px;">Kireka, Kampala, Uganda</div>
            <div style="color: #666; font-size: 12px; margin-top: 4px;">Click to view in Google Maps</div>
          </div>
          <div style="
            position: absolute;
            top: 20px;
            left: 20px;
            width: 8px;
            height: 8px;
            background: #dc2626;
            border-radius: 50%;
            animation: pulse 2s infinite;
          "></div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.5); opacity: 0.5; }
              100% { transform: scale(1); opacity: 1; }
            }
          </style>
        </div>
      `
    }
  }, [])

  const handleMapClick = () => {
    // Open Google Maps with the location
    window.open("https://maps.google.com/?q=Kireka,+Kampala,+Uganda", "_blank")
  }

  return (
    <div
      ref={mapRef}
      onClick={handleMapClick}
      className="cursor-pointer hover:opacity-90 transition-opacity w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleMapClick()
        }
      }}
    >
      <div className="text-center">
        <MapPin className="h-12 w-12 text-ceptor-red mx-auto mb-2" />
        <p className="text-gray-600 font-medium">CEPTAR Property Services</p>
        <p className="text-gray-500 text-sm">Kireka, Kampala, Uganda</p>
      </div>
    </div>
  )
}
