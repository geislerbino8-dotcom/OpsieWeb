import Opsielogo from '../assets/opsie/opsie_logo.jpg';

function OpsieLogo() {
  return (
    <div className="-mb-350 flex justify-center sm:justify-start lg:justify-start p-4">
      <img
        src={Opsielogo}
        alt="Opsie Logo"
        className="w-32 sm:w-40 lg:w-48 h-auto object-contain"
      />
    </div>
  );
}

export default OpsieLogo;