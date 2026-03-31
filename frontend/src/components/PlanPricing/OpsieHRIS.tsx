import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "$2.99",
    description: "Perfect for individuals getting started",
    features: ["Employee Management", "Attendance Tracking"],
  },
  {
    name: "Standard",
    price: "$4.99",
    description: "Best for growing teams",
    features: [
      "Employee Management",
      "Attendance Tracking",
      "Payroll System",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "$6.99",
    description: "Advanced tools for scaling businesses",
    features: [
      "Employee Management",
      "Attendance Tracking",
      "Payroll System",
      "Analytics & Reports",
    ],
  },
];

export default function PricingPlans() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. Scale anytime.
          </p>
        </div>

        {/* Product Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400">
            Opsie HRIS
          </h2>
          <p className="text-gray-300 mt-2">
            Powerful HR tools to automate and grow your team.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 backdrop-blur-lg border border-white/10 shadow-xl transition transform hover:scale-105 ${
                plan.popular
                  ? "bg-white/10 border-cyan-400"
                  : "bg-white/5"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-cyan-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                  Most Popular
                </span>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="text-4xl font-bold mb-2">{plan.price}</div>
              <p className="text-gray-300 mb-6">/month</p>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-400">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => navigate("/buy-now")}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg transition"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate("/subscribe-now")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}