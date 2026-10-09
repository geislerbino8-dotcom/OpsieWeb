import { useNavigate } from "react-router-dom"

type ProductCardProps = {
  itemName: string
  image: string
  desc: string
  logo: string
  bgColor?: string
}

/**
 * Flip card: front shows the product visual + name, hovering unflips it
 * (rotateY 180°) to reveal the description and a Discover Detail CTA.
 * Click anywhere still navigates to the product detail page.
 *
 * Structure: outer = perspective frame (border, glow, lift), inner =
 * preserve-3d flip layer, faces = backface-hidden absolute panes.
 * No overflow-hidden on the inner layer — it would force transform-style: flat.
 * NOTE: className must stay free of stray words — every token is a class, and
 * legacy boilerplate like `.card { padding: 2em }` in index.css will bite.
 */
function ProductCard({ itemName, image, desc, bgColor = "#FFFFFF", logo }: ProductCardProps) {
  const navigate = useNavigate()

  const cleanHex = bgColor.startsWith("#") ? bgColor.slice(1) : bgColor
  const glowShadowColor = `#${cleanHex}4d`

  return (
    <div
      onClick={() => navigate(`/products/${encodeURIComponent(itemName)}`)}
      // w-full + max-w-full lets the card shrink to narrow (phone) columns
      // instead of being clipped by its overflow-hidden ancestors.
      // card-side-glow = base premium soft shadow; hover lift is a subtle
      // elevation shift instead of a layout-breaking margin.
      className="group relative h-[400px] w-full max-w-[18rem] flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden border border-[#8B5CF6]/25 [perspective:1200px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] card-side-glow hover:-translate-y-2"
      style={{
        '--hover-shadow': `0 20px 40px ${glowShadowColor}, inset 0 0 0 1px #${cleanHex}66`,
      } as React.CSSProperties}
    >
      {/* Inset border highlight on hover, painted above both faces */}
      <div className="absolute inset-0 rounded-2xl transition-all duration-500 [box-shadow:var(--hover-shadow)] opacity-0 group-hover:opacity-100 pointer-events-none z-30" />

      {/* ===== FLIP LAYER ===== */}
      <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:[transform:rotateY(180deg)]">
        {/* ---------- FRONT: visual + name ---------- */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-[#0a0a0a]">
          {/* Soft full-bleed backdrop */}
          <img
            src={logo}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[3px] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />

          <div className="relative flex h-full flex-col items-center justify-end gap-5 px-6 pb-12">
            {/* Product visual */}
            <img
              src={image}
              alt={itemName}
              className="h-[10rem] w-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.35)]"
            />
            <h3 className="text-center text-3xl font-bold text-white">{itemName}</h3>
          </div>

          {/* Product accent strip */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: bgColor }} />
        </div>

        {/* ---------- BACK: description + CTA ---------- */}
        <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* Product-tinted glow rising from the bottom */}
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(120% 85% at 50% 118%, ${bgColor}59, transparent 62%)` }}
          />

          <div className="relative flex h-full flex-col p-7">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: bgColor }}
            >
              Product
            </span>

            <h3 className="mt-2 text-2xl font-bold text-white">{itemName}</h3>

            <div className="mt-3 h-px w-10" style={{ backgroundColor: bgColor }} />

            <p className="mt-4 flex-1 min-h-0 overflow-hidden text-[13px] leading-relaxed text-neutral-400">
              {desc}
            </p>

            <button
              type="button"
              className="mt-4 w-full rounded-full bg-[#8B5CF6] py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Discover Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
