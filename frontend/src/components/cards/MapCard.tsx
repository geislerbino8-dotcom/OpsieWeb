import MapImage from '../../assets/visuals/Map.png';
import BlackButton from '../buttons/BlackButton';



function MapCard() {
  return (
    <div className="w-full max-w-xl flex flex-col p-6 bg-white rounded-xl shadow-md space-y-4">
      
      {/* Contact Info */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-800">Prefer a Direct Approach?</h3>
        <p className="text-gray-700">+5654654654</p>
        <p className="text-gray-700">contact@landing.com</p>
        <p className="text-gray-700">Monday to Friday, 9 AM - 6 PM (PHT)</p>
      </div>

      {/* Map Image */}
      <img
        className="w-full rounded-xl border border-black object-cover"
        src={MapImage}
        alt="Map"
      />

      {/* Address */}
      <p className="text-gray-600 text-sm">
        Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila
      </p>

      {/* Visit Office Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Visit Our Office</h1>
        <BlackButton
          text="Get Direction"
          fontSize="1"
          borderRadius="1"
          margin="0"
          padding="1"
          color=""
          image=""
        />
      </div>
    </div>
  );
}

export default MapCard;