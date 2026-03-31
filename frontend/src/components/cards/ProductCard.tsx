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
        cursor-pointer
        group relative w-[18rem] flex-shrink-0
        rounded-2xl overflow-hidden
        transition-all duration-1000 ease-out
        hover:mx-3
        shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition duration-500
          blur-2xl
          bg-gradient-to-r from-cyan-400/20 to-blue-500/20
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
          transition-all duration-500 ease-out

          group-hover:border-cyan-300/40
          group-hover:bg-white/10
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
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>

        {/* Title */}
        <h3
          className="
            text-lg font-semibold text-[#242424] tracking-wide
            transition duration-300
            group-hover:text-cyan-600
          "
        >
          {itemName}
        </h3>

        {/* Description */}
        <p
          className="
            text-sm text-[#242424] mt-2 text-center leading-relaxed
            transition duration-300
            group-hover:text-[#111]
          "
        >
          Powerful solution designed to streamline your workflow and boost productivity.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate(`/products/${itemName}`)}
          className="
            mt-6 px-5 py-2
            rounded-lg font-semibold text-cyan-600
            border border-cyan-400/40

            md:opacity-0
            group-hover:opacity-100

            transition-all duration-500 ease-out

            group-hover:text-white
            group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500
            group-hover:shadow-lg group-hover:shadow-cyan-400/40
          "
        >
          View Product
        </button>
      </div>
    </div>
  )
}

export default ProductCard