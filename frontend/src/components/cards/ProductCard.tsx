import { useNavigate } from "react-router-dom"

type ProductCardProps = {
  itemName: string
  image: string
  bgColor?: string
}

function ProductCard({ itemName, image, bgColor }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="
        group relative w-[18rem] flex-shrink-0
        rounded-2xl overflow-hidden
        transition-all duration-500
        hover:-translate-y-2
        shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)]
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition duration-500
          blur-xl
          bg-gradient-to-r from-cyan-400/30 to-blue-500/30
        "
      />

      {/* Card Content */}
      <div
        className="
          relative z-10
          flex flex-col items-center
          p-5
          rounded-2xl
          backdrop-blur-xl
          border border-white/20
          shadow-lg
          transition-all duration-500
          group-hover:shadow-2xl
        "
        style={{
          backgroundColor: bgColor || "rgba(255,255,255,0.05)",
        }}
      >
        {/* Image */}
        <div className="w-full flex justify-center items-center mb-4">
          <img
            src={image}
            alt={itemName}
            className="
              w-[10rem] h-[10rem] object-contain
              transition-transform duration-500
              group-hover:scale-110 group-hover:rotate-1
              will-change-transform
            "
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#242424] tracking-wide">
          {itemName}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#242424] mt-2 text-center leading-relaxed">
          Powerful solution designed to streamline your workflow and boost productivity.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate(`/products/${itemName}`)}
          className="
            mt-6 px-5 py-2
            rounded-lg font-semibold text-cyan
            border border-cyan-400/50

            lg:opacity-0 translate-y-3
            group-hover:opacity-100 group-hover:translate-y-0

            transition-all duration-500
            hover:text-white
            hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
            hover:shadow-lg hover:shadow-cyan-400/40
          "
        >
          View Product
        </button>
      </div>
    </div>
  )
}

export default ProductCard