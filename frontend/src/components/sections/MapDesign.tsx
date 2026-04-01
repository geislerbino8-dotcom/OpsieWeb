import { Button } from "../Button";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY2hhaWlpIiwiYSI6ImNtZjBnZzM4ZDE3aGoya3B6YTJmeDZ4N2oifQ.7rvg2UpEHaOEDSDo5FgZBA";

const OFFICE_LOCATION = {
  lng: 121.04916024252319, 
  lat: 14.58523914984939, 
};

type Location = {
  lng: number;
  lat: number;
};

export default function Maps() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [OFFICE_LOCATION.lng, OFFICE_LOCATION.lat],
      zoom: 15,
    });

    mapRef.current.on("load", () => {
      new mapboxgl.Marker()
        .setLngLat([OFFICE_LOCATION.lng, OFFICE_LOCATION.lat])
        .addTo(mapRef.current!);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // 🚀 Animate map when user location is detected
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

  

  // 🚗 Draw route
  const drawRoute = async (origin: Location) => {
    if (!mapRef.current) return;

    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${OFFICE_LOCATION.lng},${OFFICE_LOCATION.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
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

    if (mapRef.current.getSource("route")) {
      (mapRef.current.getSource("route") as mapboxgl.GeoJSONSource).setData(
        routeData as any
      );
    } else {
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
    }

    // 🎬 Animate camera to fit the route
    const coordinates = route.coordinates;

    const bounds = coordinates.reduce(
        (bounds: mapboxgl.LngLatBounds, coord: [number, number]) =>
          bounds.extend(coord),
        new mapboxgl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number])
      );

    mapRef.current.fitBounds(bounds, {
      padding: 80,
      duration: 2000,
    });
  };

  const handleDirections = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
  
        setUserLocation(location);
  
        // show user marker
        if (mapRef.current) {
          new mapboxgl.Marker({ color: "blue" })
            .setLngLat([location.lng, location.lat])
            .addTo(mapRef.current);
        }
  
        drawRoute(location);
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
    <div className="flex items-center justify-center lg:items-start gap-14">
      <div className="w-full flex flex-col md:flex-row lg:items-start gap-4">

        <div className="w-full flex flex-col items-center md:items-start gap-6">

          <h1 className="font-poppins text-center md:text-start leading-[34px] md:leading-[44px] lg:leading-[62px] text-[36px] md:text-[42px] lg:text-[50px]">
            Visit <span className="text-[#3CBDE6] font-semibold">Us</span> Let’s Talk
            <span className="text-[#3CBDE6] font-semibold"><br />Innovation</span>
          </h1>

          <div className="flex lg:w-[500px]">
            <p className="font-poppins text-center md:text-start w-full text-[16px] leading-[15px] font-light">
              Our doors are open for clients and partners who are ready to innovate.
              Drop by our location and start the conversation that turns ideas into real solutions.
            </p>
          </div>

          <div className="flex transition-all duration-1000 items-center hover:bg-[#242424] justify-center bg-[#3CBDE6] py-1 md:text-[12px] lg:text-[16px] lg:px-4 text-white lg:mt-4">
            <Button
              label="Get Direction"
              icon={<img src="/ICONS/get-started-arrow.svg" className="w-6 h-6" />}
              iconPosition="right"
              className="cursor-pointer"
              onClick={handleDirections}
            />
          </div>

        </div>

        <div className="flex items-center justify-center mx-2 ">
          <div
            ref={mapContainer}
            className="w-[500px] md:w-[400px] lg:min-w-[600px] h-[400px] rounded-3xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] "
          />
        </div>

      </div>
    </div>
  );
}