import { useNavigate } from "react-router-dom"

type ProductCardProps = {
  itemName: string
  image: string
  desc: string
  bgColor?: string
}

function ProductCard({ itemName, image, desc, bgColor }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="
        cursor-pointer
        h-[370px] w-[18rem] flex-shrink-0
        group relative
        rounded-2xl overflow-hidden
        transition-all duration-500 ease-out
        hover:mx-3
        shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition duration-500
          blur-2xl
          bg-gradient-to-r from-cyan-400/20 to-blue-500/20
        "
      />

      {/* Content */}
      <div
        className="
          relative z-10
          h-full flex flex-col
          items-center p-5
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
        <div className="w-full flex justify-center items-center mb-3 bg-[#0F4C5C]/70 rounded-sm">
          <img
            src={image}
            alt={itemName}
            className="
              w-full h-[9rem] object-contain
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>

        {/* Title */}
        <h3
          className="
            text-lg font-semibold text-[#242424] tracking-wide text-center
            group-hover:text-cyan-600
            truncate w-full
          "
        >
          {itemName}
        </h3>

        {/* Description (CLAMPED) */}
        <p
          className="
            text-sm text-[#242424] mt-2 text-center leading-relaxed
            group-hover:line-clamp-3
            min-h-[4.5rem]
          "
        >
          {desc}
        </p>

        {/* Spacer pushes button down */}
        <div className="flex-grow" />

        {/* CTA */}
        <button
          onClick={() => navigate(`/products/${itemName}`)}
          className="
            mt-4 px-5 py-2
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