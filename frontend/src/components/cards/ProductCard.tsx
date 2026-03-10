import { useNavigate } from "react-router-dom"

type ProductCardProps = {
  itemName: string
  image: string
  bgColor?: string
}

function ProductCard({ itemName, image }: ProductCardProps) {

  const navigate = useNavigate()

  return (
    <div
      className="
        
        group
        flex flex-col items-center
        w-[16rem] p-1 pb-4
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        hover:rounded-2xl
        hover:scale-105 
        hover:mx-5
        hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]
        transition-all duration-500
      "
    >

      {/* Image Container */}
      <div className="
        w-full flex justify-center items-center
        bg-white/20
        group-hover:rounded-2xl
        grouo-hover:mt-5
        overflow-hidden
      ">
        <img
          src={image}
          alt={itemName}
          className="
            w-[9rem] h-[9rem] object-contain
            transition-transform duration-500
            group-hover:scale-200
          "
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-white text-center tracking-wide">
        {itemName}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/70 text-center mt-2 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, error.
      </p>

      {/* Button */}
    <button
      onClick={() => navigate(`/products/${itemName}`)}
      className="
        mt-5 py-2.5 px-4
        rounded-lg
        font-semibold
        text-white
        border border-cyan-400
        bg-transparent
        transition-all duration-300

        block sm:hidden
        sm:group-hover:block sm:opacity-0 sm:group-hover:opacity-100

        hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
      "
    >
      View Product
    </button>

    </div>
  )
}

export default ProductCard