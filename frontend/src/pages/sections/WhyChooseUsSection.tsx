function WhyChooseUsSection() {

  return (
    <section className="w-full bg-transparent py-16 px-4 bg-gray-50 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 md:gap-16">

        {/* Left Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 flex-1">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-start">
            <p>
              <strong>100% Web Based</strong><br />
              Use freely on any device, anywhere with internet access.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-start">
            <p>
              <strong>Unlimited Users</strong><br />
              No additional cost for the number of Opise users.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-start">
            <p>
              <strong>Free Additional Services</strong><br />
              Mobile app and corporate messenger included.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-start">
            <p>
              <strong>Continuous Feature Upgrades</strong><br />
              Regular improvements and new functionality.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center px-6
          rounded-3xl
        ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
            Why do so many companies choose Opise software solutions?
          </h1>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUsSection;