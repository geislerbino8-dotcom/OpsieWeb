import { useNavigate } from "react-router-dom"

type ProductCardProps = {
  itemName: string
  image: string
  bgColor?: string
  textColor?: string
}

function ProductCard({ itemName, image, bgColor, textColor }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <div className="w-[16rem] flex-shrink-0">
      
      {/* Card */}
      <div
        className="
          group flex flex-col items-center
          p-4
          backdrop-blur-xl
          border border-white/20
          shadow-lg
          rounded-xl
          hover:shadow-2xl
          hover:scale-105
          hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
          transition-transform duration-300
        "
        style={{
          backgroundColor: bgColor ? bgColor : "rgba(255,255,255,0.05)",
          color: textColor ? textColor : "white"
        }}
      >

        {/* Image Container */}
        <div
          className="
            w-full flex justify-center items-center
            bg-white/20
            rounded-lg
            overflow-hidden
          "
        >
          <img
            src={image}
            alt={itemName}
            className="
              w-[9rem] h-[9rem] object-contain
              transition-transform duration-300
              group-hover:scale-110
            "
          />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-semibold text-center tracking-wide">
          {itemName}
        </h3>

        {/* Description */}
        <p className="text-sm text-center mt-2 leading-relaxed opacity-80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate(`/products/${itemName}`)}
          className="
            mt-5 py-2 px-4
            rounded-lg
            font-semibold
            border border-cyan-400
            bg-transparent
            transition-all duration-300

            block sm:hidden
            sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:block

            hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
          "
        >
          View Product
        </button>

      </div>

    </div>
  )
}

export default ProductCard