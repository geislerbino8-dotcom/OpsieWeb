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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {content.map((item, index) => (
            <div
              key={index}
              style={{ willChange: 'transform' }} 
              className="group relative overflow-hidden rounded-lg shadow-lg flex items-center p-6 text-white min-h-[200px]
                transform transition-al l duration-500 ease-out 
                hover:-translate-y-1 hover:scale-[1.1] hover:ring-3 hover:ring-white/50"
                 >
              <img
                src={item.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover 
                transition-transform duration-700 ease-in-out 
                group-hover:scale-110"
              />

              {/* Base dim */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Animated overlay */}
              <div
                className="absolute inset-0 bg-black/40
                origin-left scale-x-0
                transition-transform duration-500 ease-out
                group-hover:scale-x-100"
              />

              {/* Content */}
              <p className="relative text-white z-10 text-[1.1rem] drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]" data-aos="fade-right">
                <strong>{item.head}</strong><br />
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