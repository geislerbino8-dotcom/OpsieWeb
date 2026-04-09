import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN


type Location = {
  name: string;
  lng: number;
  lat: number;
};

type MapBoxProps = {
  getDirection: boolean;
  location: { lat: number; lng: number };
  setDirAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MapBox({
  getDirection,
  location,
  setDirAction,
}: MapBoxProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const destinationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [userLocation, setUserLocation] = useState<Location | null>(null);

  // 🧭 Trigger directions
  useEffect(() => {
    if (getDirection) {
      handleDirections();
      setDirAction(false);
    }
  }, [getDirection]);

  // 🗺️ Initialize map
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.lng, location.lat],
      zoom: 15,
    });

    mapRef.current.on("load", () => {
      addOrUpdateDestinationMarker(location);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // 📍 Update map when destination changes
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [location.lng, location.lat],
    });

    addOrUpdateDestinationMarker(location);
  }, [location]);

  // 🚀 Fly to user when detected
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 15,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  }, [userLocation]);

  // 📍 Destination marker handler
  const addOrUpdateDestinationMarker = (loc: { lng: number; lat: number }) => {
    if (!mapRef.current) return;

    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    destinationMarkerRef.current = new mapboxgl.Marker()
      .setLngLat([loc.lng, loc.lat])
      .addTo(mapRef.current);
  };

  // 👤 User marker handler
  const addOrUpdateUserMarker = (loc: Location) => {
    if (!mapRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    userMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([loc.lng, loc.lat])
      .addTo(mapRef.current);
  };

  // 🚗 Draw route
  const drawRoute = async (origin: Location) => {
    if (!mapRef.current) return;

    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${location.lng},${location.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
    );

    const data = await res.json();

    if (!data.routes || data.routes.length === 0) {
      alert("No route found.");
      return;
    }

    const route = data.routes[0].geometry;

    const routeData = {
      type: "Feature",
      geometry: route,
    };

    // 🧹 Remove old route
    if (mapRef.current.getLayer("route")) {
      mapRef.current.removeLayer("route");
    }
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeSource("route");
    }

    // ➕ Add new route
    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: routeData as any,
      },
      paint: {
        "line-color": "#3CBDE6",
        "line-width": 5,
      },
    });

    // 🎯 Fit bounds to route
    const coordinates = route.coordinates;

    const bounds = coordinates.reduce(
      (bounds: mapboxgl.LngLatBounds, coord: [number, number]) =>
        bounds.extend(coord),
      new mapboxgl.LngLatBounds(
        coordinates[0] as [number, number],
        coordinates[0] as [number, number]
      )
    );

    mapRef.current.fitBounds(bounds, {
      padding: 80,
      duration: 2000,
    });
  };

  // 📍 Handle directions
  const handleDirections = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc: Location = {
          name: "",
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };

        setUserLocation(loc);
        addOrUpdateUserMarker(loc);
        drawRoute(loc);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please enable GPS.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-3xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)]"
    />
  );
}