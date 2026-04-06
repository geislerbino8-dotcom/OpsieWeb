import TextType from '@/components/TextType'
import b1 from '../../assets/visuals/Products1.jpg'
import b2 from '../../assets/visuals/Products2.jpg'
import b3 from '../../assets/visuals/Products3.jpg'
import b4 from '../../assets/visuals/Products4.jpg'

const content = [
  {
    head: "100% Web Based",
    desc: "Use freely on any device, anywhere with internet access.",
    bgImage: b1
  },
  {
    head: "Unlimited Users",
    desc: "No additional cost for the number of Opise users.",
    bgImage: b2
  },
  {
    head: "Free Additional Services",
    desc: "Mobile app and corporate messenger included.",
    bgImage: b3
  },
  {
    head: "Continuous Feature Upgrades",
    desc: "Regular improvements and new functionality.",
    bgImage: b4
  }
]

function WhyChooseUsSection() {
  return (
    <section
      className="w-full h-full py-20 flex justify-center"
      style={{ backgroundColor: '#0082ba' }}
    >
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row gap-8 md:gap-16 p-5 md:p-10">

     <div className="
  grid 
  grid-cols-1 
  \
  
  sm:grid-cols-2 
  gap-4 sm:gap-6 md:gap-8 
  flex-1
">
  {content.map((item, index) => (
    <div
      key={index}
      style={{ willChange: 'transform' }}
      className="
        group relative overflow-hidden rounded-lg shadow-lg 
        flex items-center 
        p-4 sm:p-5 md:p-6 
        text-white 
        min-h-[160px] sm:min-h-[200px] md:min-h-[220px]

        transform transition-all duration-500 ease-out

        hover:-translate-y-1 
        sm:hover:scale-[1.05] 
        md:hover:scale-[1.08] 
        lg:hover:scale-[1.1]

        hover:ring-2 sm:hover:ring-3 hover:ring-white/50
      "
    >
      {/* Background image */}
      <img
        src={item.bgImage}
        alt=""
        className="
          absolute inset-0 w-full h-full object-cover 
          transition-transform duration-700 ease-in-out 
          group-hover:scale-110
        "
      />

      {/* Base dim */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated overlay */}
      <div
        className="
          absolute inset-0 bg-black/40
          origin-left scale-x-0
          transition-transform duration-500 ease-out
          group-hover:scale-x-100
        "
      />

      {/* Content */}
      <p
        className="
          relative z-10 
          text-sm sm:text-base md:text-[1.05rem] lg:text-[1.1rem]
          leading-relaxed
          drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]
        "
        data-aos="fade-right"
      >
        <strong className="block text-base sm:text-lg md:text-xl mb-1">
          {item.head}
        </strong>
        {item.desc}
      </p>
    </div>
  ))}
</div>

        {/* RIGHT - TEXT */}
        <div className="flex-1 flex items-center justify-center px-6 rounded-3xl">
          <TextType
            className="mr-7 text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left text-[#cdf7ff]"
            text={["Why do so many companies choose Opsie Software Solutions?"]}
            typingSpeed={75}
            pauseDuration={10000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={100}
            cursorBlinkDuration={0.5}
          />
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUsSection