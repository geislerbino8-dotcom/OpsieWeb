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
        w-[16rem] p-5
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all duration-500
      "
    >

      {/* Image Container */}
      <div className="
        w-full flex justify-center items-center
        bg-white/20
        rounded-xl
        p-4
        overflow-hidden
      ">
        <img
          src={image}
          alt={itemName}
          className="
            w-[9rem] h-[9rem] object-contain
            transition-transform duration-500
            group-hover:scale-110
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
    hidden
    group-hover:block
    mt-5 w-full py-2.5
    rounded-lg
    font-semibold
    text-white
    border border-cyan-400
    bg-transparent
    hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
    transition-all duration-5000
  "
>
  View Product
</button>

    </div>
  )
}

export default ProductCard