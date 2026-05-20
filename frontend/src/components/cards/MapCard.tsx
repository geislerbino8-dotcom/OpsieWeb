import BlackButton from '../buttons/BlackButton';
import MapBox from '../MapBox';

import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from 'react';
import { OFFICE_LOCATIONS } from '@/data/siteLocationsData';

function MapCard() {
  const [dirAction, setDirAction] = useState(false);

  return (
    <div className="group relative w-full max-w-xl flex flex-col p-6 bg-white rounded-xl shadow-md space-y-4 overflow-hidden border border-gray-100 transition-all duration-500">
      
      {/* Smooth Gradient Layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-[#3CBDE6] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none z-0" />

      {/* Contact Info */}
      <div className="space-y-1 relative z-10">
        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-500 group-hover:text-white">
          Prefer a Direct Approach?
        </h3>
        <p className="text-gray-700 transition-colors duration-500 group-hover:text-neutral-200">
          Come to us from Monday to Friday, 9 AM - 6 PM (PHT)
        </p>
      </div>

      {/* Map Element Wrapper */}
      <div className="relative z-10 w-full rounded-lg overflow-hidden shadow-inner border border-transparent transition-colors duration-500 group-hover:border-white/10">
        <MapBox 
          location={OFFICE_LOCATIONS.main} 
          getDirection={dirAction} 
          setDirAction={setDirAction} 
        />
      </div>

      {/* Address */}
      <p className="text-gray-600 text-sm relative z-10 transition-colors duration-500 group-hover:text-neutral-300">
        8F Sun Plaza Bldg., 1507 Shaw Blvd. Cor. Princeton St., Wack-Wack, Mandaluyong City 1555, Philippines
      </p>

      {/* Visit Office Section */}
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10 pt-2">
        <h1 className="text-lg font-bold text-gray-800 mb-5 md:mb-0 transition-colors duration-500 group-hover:text-white">
          Visit Our Office
        </h1>
        
        {/* Button Wrapper to allow color swaps if BlackButton accepts inline group styling overrides */}
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <BlackButton
            onPress={() => setDirAction(!dirAction)}
            text={dirAction ? "Clear Route" : "Get Direction"}
            fontSize="1.2"
            borderRadius="0"
            margin="0"
            padding="0"
            color=""
            image=""
          />
        </div>
      </div>
        
    </div>
  );
}

export default MapCard;