import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOXTOKEN

console.log(import.meta.env.VITE_MAPBOXTOKEN)

export type MarkerData = {
  id: string;
  lng: number;
  lat: number;
  popup?: string;
};

type MapboxMapProps = {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
};

const MapBox: React.FC<MapboxMapProps> = ({
  center = [120.9842, 14.5995],
  zoom = 10,
  markers = [],
  className = "",
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update center/zoom if props change
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setCenter(center);
    mapRef.current.setZoom(zoom);
  }, [center, zoom]);

  // Render markers
  useEffect(() => {
    if (!mapRef.current) return;

    // remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    markers.forEach((m) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([m.lng, m.lat]);

      if (m.popup) {
        marker.setPopup(new mapboxgl.Popup().setHTML(m.popup));
      }

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [markers]);

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MapBox;