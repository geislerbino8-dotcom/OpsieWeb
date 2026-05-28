import { useNavigate } from "react-router-dom"

type ProductCardProps = {
  itemName: string
  image: string
  desc: string
  logo: string
  bgColor?: string 
}

function ProductCard({ itemName, image, desc, bgColor = "#FFFFFF", logo }: ProductCardProps) {
  const navigate = useNavigate()

  const cleanHex = bgColor.startsWith("#") ? bgColor.slice(1) : bgColor
  const overlayBackground = `#${cleanHex}40`
  
  // Create a custom 30% opacity hex color for the premium glow shadow on hover
  const glowShadowColor = `#${cleanHex}4d` 

  return (
    <div
      onClick={() => navigate(`/products/${encodeURIComponent(itemName)}`)}
      className="
        group relative
        h-[400px] w-[18rem] flex-shrink-0
        cursor-pointer rounded-2xl overflow-hidden
        bg-white/[0.03] border border-white/10
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        
        /* Base Premium Soft Shadow */
        shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]
        
        /* Subtle elevation shift instead of layout-breaking margins */
        hover:-translate-y-2
      "
      style={{
        // Dynamically applies a sharp drop shadow AND an inner border highlight using your bgColor
        '--hover-shadow': `0 20px 40px ${glowShadowColor}, inset 0 0 0 1px #${cleanHex}66`,
      } as React.CSSProperties}
    >
      {/* 
        This wrapper applies the shadow highlight natively on hover via a custom CSS variable 
        to ensure smooth performance and fallback support.
      */}
      <div className="absolute inset-0 rounded-2xl transition-all duration-500 [box-shadow:var(--hover-shadow)] opacity-0 group-hover:opacity-100 pointer-events-none z-30" />

      <div className="bg-black/70 group-hover:bg-transparent group-hover:absolute group-hover:inset-0 transition-all duration-700 w-full h-full flex justify-center items-center relative overflow-hidden">
        {/* Full-screen Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={logo} 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

        {/* Overlay Content (Title) */}
        <div className="relative z-10 flex flex-col justify-end h-full w-full p-10 text-center bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <h1 className="font-bold text-white text-3xl">{itemName}</h1>
        </div>
      </div>

      {/* Premium ambient backing glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700 ease-out
          blur-3xl
          bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent
        "
      />

      {/* Card Content Wrapper */}
      <div
        className="
          relative z-10
          h-full flex flex-col
          items-center p-6
          backdrop-blur-md
          transition-colors duration-500
          group-hover:bg-slate-950/20
          group-hover:border-white/20
        "
        style={{ backgroundColor: overlayBackground }}
      >
        {/* Image Container with subtle floating shadow */}
        <div className="w-full h-[10rem] flex justify-center items-center mb-5 relative">
          <img
            src={image}
            alt={itemName}
            className="
              w-full h-full object-contain
              transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              group-hover:scale-105 group-hover:-translate-y-1
              drop-shadow-[0_10px_15px_rgba(0,0,0,0.05)]
              group-hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]
            "
          />
        </div>

        {/* Text Area */}
        <div className="w-full flex flex-col items-center flex-grow text-center">
          <h3
            className="
              text-base font-medium text-neutral-800 tracking-tight
              group-hover:text-white
              group-hover:font-bold
              transition-colors duration-300
              truncate w-full px-2
            "
          >
            {itemName}
          </h3>

          <p
            className="
              text-xs text-neutral-500 mt-2 leading-relaxed
              group-hover:text-neutral-800
              group-hover:font-medium
              transition-colors duration-300
              line-clamp-3 w-full px-2
            "
          >
            {desc}
          </p>
        </div>

        {/* Call to Action Button */}
        <div
          className="
            w-full mt-4 overflow-hidden rounded-xl
            opacity-0 translate-y-2
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          "
        >
          <button
            className="
              w-full py-2.5 px-4
              text-xs font-medium tracking-wide text-white
              bg-neutral-900 hover:bg-neutral-800
              rounded-xl shadow-sm
              transition-all duration-300
            "
          >
            Discover Detail
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard