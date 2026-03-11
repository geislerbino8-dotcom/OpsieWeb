import MapImage from '../../assets/visuals/Map.png';
import BlackButton from '../buttons/BlackButton';

import {APIProvider, Map} from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY

function MapCard() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start p-6 gap-6">
      {/* Main Card */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 space-y-6 flex flex-col">
        
        {/* Contact Info */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">Prefer a Direct Approach?</h3>
          <p className="text-gray-700">HR Department email: asdas@gmail.com</p>
          <p className="text-gray-700">Monday to Friday, 9 AM - 6 PM (PHT)</p>
        </div>

        {/* Map */}
        <div className="w-full h-64 lg:h-96 rounded-lg overflow-hidden">
          <APIProvider apiKey={API_KEY}>
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              defaultZoom={3}
              gestureHandling="greedy"
              disableDefaultUI
            />
          </APIProvider>
        </div>

        {/* Address */}
        <p className="text-gray-600">
          Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila
        </p>

        {/* Visit Office */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">Visit Our Office</h1>
          <BlackButton
            text="Get Direction"
            fontSize="1.2"
            borderRadius="2"
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