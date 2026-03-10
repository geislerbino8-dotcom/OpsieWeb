import MapImage from '../../assets/visuals/Map.png';
import BlackButton from '../buttons/BlackButton';

import {APIProvider, Map} from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY

function MapCard() {
  return (
    <div className="w-full max-w-xl flex flex-col p-6 bg-white rounded-xl shadow-md space-y-4">
      
      {/* Contact Info */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-800">Prefer a Direct Approach?</h3>
        <p className="text-gray-700">HR Department email: asdas@gmail.com</p>
        <p className="text-gray-700">Monday to Friday, 9 AM - 6 PM (PHT)</p>
      </div>

      {/* Map Image */}
      <APIProvider apiKey={API_KEY}>
          <Map
            style={{width: '100%', height: '50vh'}}
            defaultCenter={{lat: 22.54992, lng: 0}}
            defaultZoom={3}
            gestureHandling='greedy'
            disableDefaultUI
          />
        </APIProvider>

      {/* Address */}
      <p className="text-gray-600 text-">
        Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila
      </p>

      {/* Visit Office Section */}
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
  );
}

export default MapCard;