import React from "react";

const plans = [
  {
    name: "Basic",
    price: "$2.99",
    features: [true, true, false, false],
  },
  {
    name: "Standard",
    price: "$4.99",
    features: [true, true, true, false],
  },
  {
    name: "Premium",
    price: "$6.99",
    features: [true, true, true, true],
  },
];

export default function PricingPlans() {
  return (
    <section className="w-full py-16 flex justify-center bg-gradient-to-r from-green-900 to-green-900 m-10">
      <div className="max-w-6xl w-full border-3 border-white/40 rounded-2xl p-10 text-white">
        <h1 className="text-4xl m-5 font bold mb-4 flex justify-center ">
            Our pricing
        </h1>
        <p className="text-gray-300 text-lg size-bold mb-10 flex justify-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet
          consectetur adipiscing elit quisque faucibus ex.
        </p>


        {/* Title */}
        <h1 className="text-3xl font-bold underline mb-4">
          Opsie Software Solution plan
        </h1>

        <p className="text-gray-300 max-w-xl mb-10">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet
          consectetur adipiscing elit quisque faucibus ex.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-green-500 to-green-500 rounded-xl p-6 text-center shadow-lg"
            >
              
              {/* Plan Name */}
              <div className="bg-[#02110D] text-white font-semibold py-2 rounded-full mb-4">
                {plan.name}
              </div>

              {/* Price */}
              <h2 className="text-2xl font-bold">{plan.price}</h2>
              <p className="mb-4">Month</p>

              {/* Features */}
              <ul className="text-sm space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center gap-2">
                    {feature ? (
                      <span className="text-green-400 text-lg">✔</span>
                    ) : (
                      <span className="text-red-400 text-lg">✖</span>
                    )}
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="bg-green-900 hover:bg-green-700 text-xl text-white px-6 py-2 rounded-full" 
                onClick={() => {window.location.href="/buy-now"}}>
                Buy now
              </button>

            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-green-500 hover:bg-green-700 px-10 py-3 rounded-full text-xl text-white font-semibold
          rounded-2xl border-3" onClick={() => {window.location.href="/Subscribe-now"}}>
            Subscribe now
          </button>
        </div>

      </div>
    </section>
  );
}