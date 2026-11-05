import { Button } from "../Button";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PlayCircle } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

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

type DirectionsResponse = {
  routes?: Array<{ geometry: GeoJSON.LineString }>;
};

export default function Maps() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate()

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

  const drawRoute = async (origin: Location) => {
    if (!mapRef.current) return;

    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${OFFICE_LOCATION.lng},${OFFICE_LOCATION.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
    );

    const data = (await res.json()) as DirectionsResponse;

    if (!data.routes || data.routes.length === 0) {
      alert("No route found.");
      return;
    }

    const route = data.routes[0].geometry;

    const routeData: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      geometry: route,
      properties: {},
    };

    if (mapRef.current.getSource("route")) {
      (mapRef.current.getSource("route") as mapboxgl.GeoJSONSource).setData(
        routeData
      );
    } else {
      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: routeData,
        },
        paint: {
          "line-color": "#3CBDE6",
          "line-width": 5,
        },
      });
    }

    const coordinates: [number, number][] = route.coordinates.map(
      (coordinate) => [coordinate[0], coordinate[1]],
    );

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
    <div className="w-full flex items-center justify-center lg:items-start gap-4 sm:gap-8 py-6 sm:py-10 md:py-0">
      <div className="w-full min-w-0 flex flex-col xl:flex-row xl:items-start gap-6 xl:gap-8">

        <div className="mb-6 flex w-full min-w-0 flex-col items-center gap-6 md:items-start xl:mb-0 xl:w-0 xl:flex-1">

          <h1 className="font-poppins text-center md:text-start leading-[34px] md:leading-[44px] lg:leading-[62px] text-[36px] md:text-[42px] lg:text-[50px]">
            Let's start our
            <span className="text-[#3CBDE6] font-semibold"><br />Conversation</span>
          </h1>

            <p className="font-poppins text-center md:text-start font-light">
              Whether you’re exploring options or ready to improve your systems, we’re here to help. 
            </p>

            <div className="space-y-2 text-center md:text-start font-poppins text-sm md:text-base">
                <p>📍 8F Sun Plaza Bldg., 1507 Shaw Blvd. Cor. Princeton St., Wack-Wack, Mandaluyong City 1555, Philippines</p>
                <p className="min-w-0 break-words [overflow-wrap:anywhere]">📧 <a href="mailto:inquiry@opsiesoftwaresolutions.com">inquiry@opsiesoftwaresolutions.com</a></p>
                <p><a href="tel:(02) 84634039">☎️ (02) 84634039</a></p>
                <p><a href="tel:+63 915 059 6410">📞 +63 915 059 6410</a></p>
            </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 lg:mt-4">
            
            <div className="transition-all duration-500 hover:bg-[#242424] bg-[#3CBDE6] text-white overflow-hidden">
              <Button
                label="Get Direction"
                icon={<img src="/ICONS/get-started-arrow.svg" className="w-5 h-5" />}
                iconPosition="right"
                className="cursor-pointer px-6 py-3"
                onClick={handleDirections}
              />
            </div>

            <button 
              onClick={() => { navigate('/contact-us')}}
              className="flex items-center gap-2 border-2 border-[#3CBDE6] text-[#3CBDE6] font-semibold px-6 py-[10px] rounded-lg transition-all duration-300 hover:bg-[#242424] hover:text-white group"
            >
              <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Request Demo
            </button>
            
          </div>

        </div>

        <div className="flex w-full min-w-0 items-center justify-center xl:w-0 xl:flex-1">
          <div
            ref={mapContainer}
            className="h-[300px] w-full max-w-[600px] min-w-0 rounded-3xl sm:h-[400px] xl:max-w-none"
          />
        </div>

      </div>
    </div>
  );
}
