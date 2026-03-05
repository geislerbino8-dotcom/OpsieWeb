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
        flex flex-col items-center justify-center
        w-[14em] m-1.5 px-3 py-3
        rounded-2xl
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        shadow-xl
      "
    >
      <div className="flex flex-col items-center w-full">
        <div className="bg-white rounded-2xl">
          <img
          src={image}
          alt={itemName}
          className="w-[10em] h-[10em] object-contain"
        />
        </div>

        <h3 className="my-2 w-full text-center text-white font-bold">
          {itemName}
        </h3>
 
        <p className="w-full text-center py-2 text-white/80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, error.
        </p>

        <button
          className="
            w-full mt-4 p-2
            rounded-lg
            font-bold
            border border-white/40
            text-white
            bg-white/10
            backdrop-blur-md
            hover:bg-blue-400
            transition-all duration-300
            cursor-pointer
            
          "
          onClick={()=> { navigate(`/products/${itemName}`)}}
        >
          View Product
        </button>
      </div>
    </div>
  )
}

export default ProductCard