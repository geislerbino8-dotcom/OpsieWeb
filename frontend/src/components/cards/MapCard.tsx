import MapImage from '../../assets/visuals/Map.png';
import BlackButton from '../buttons/BlackButton';

function MapCard() {
  return (
    <div className="-mt-140 flex flex-row justify-start">
      <div className="w-full m-10 -inset-y-10 max-w-xl flex flex-col p-6 bg-white rounded-xl shadow-md space-y-4">
      {/* Contact Info */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-800">Prefer a Direct Approach?</h3>
        <p className="text-gray-700">HR Department email: asdas@gmail.com</p>
        <p className="text-gray-700">Monday to Friday, 9 AM - 6 PM (PHT)</p>
      </div>

      {/* Map Image */}
      <img
        className="w-full rounded-xl border border-black object-cover"
        src={MapImage}
        alt="Map"
      />


      {/* Address */}
      <p className="text-gray-600 text-">
        Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila
      </p>
      
    </div>
    </div>
    
  );
}

export default MapCard;