import BlackButton from '../buttons/BlackButton';
import MapBox from '../MapBox';

import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from 'react';
import { OFFICE_LOCATIONS } from '@/data/siteLocationsData';


function MapCard() {

  const [ dirAction, setDirAction ] = useState(false)

  return (
    <div className="text-center w-full max-w-xl flex-flex-col p-6 bg-white rounded-xl shadow-md space-y-4">
      
      {/* Contact Info */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-800">Prefer a Direct Approach?</h3>
        <p className="text-gray-700">Come to us from Monday to Friday, 9 AM - 6 PM (PHT)</p>
      </div>

           <MapBox location={OFFICE_LOCATIONS.main} getDirection={dirAction} setDirAction={setDirAction} />

      {/* Address */}
      <p className="text-gray-600 text-">
        Sunplaza Bldg. Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila
      </p>

      {/* Visit Office Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Visit Our Office</h1>
        <BlackButton
          onPress={()=> dirAction ? setDirAction(false): setDirAction(true)}
          text="Get Direction"
          fontSize="1.2"
          borderRadius="0"
          margin="0"
         padding="0"
          color=""
          image=""
        />

      </div>
        
    </div>
  );
}

export default MapCard;