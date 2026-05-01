import TextType from '@/components/TextType'


import { usePageContent } from '@/data/usePageContent'
import { useState } from 'react'


type PageContent = {
  bigHeader: string
  subHeader: string
}

function WhyChooseUsSection() {

  const [ contents ] = useState<PageContent>(usePageContent.data[0].advantageSection)

  const [ cardContent ] = useState(usePageContent.data[0].advantageSection.benefits)

  console.log(contents)

  return (
    <section
      className="w-full py-24 flex justify-center relative overflow-hidden"
      /* Refined Gradient: Deep Navy to Professional Blue */
      style={{ background: 'linear-gradient(135deg, #001a2c 0%, #004e7a 100%)' }}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3CBDE6]/10 rounded-full blur-[120px] -z-0" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 px-6 md:px-12">

        {/* LEFT - CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 flex-[1.2]">
          {cardContent.map((item: any, index: number) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="
                group relative overflow-hidden rounded-2xl shadow-2xl 
                flex items-end 
                p-6 md:p-8 
                text-white 
                min-h-[220px] md:min-h-[260px]
                border border-white/10
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                hover:-translate-y-2 hover:shadow-[#3CBDE6]/20
                hover:border-[#3CBDE6]/40
              "
            >
              {/* Background image with Zoom effect */}
              <img
                src={item.bgImage}
                alt=""
                className="
                  absolute inset-0 w-full h-full object-cover 
                  transition-transform duration-1000 ease-in-out 
                  group-hover:scale-110 opacity-60
                "
              />

              {/* Sophisticated Overlay: Gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

              {/* Blue Tint Hover Effect */}
              <div className="absolute inset-0 bg-[#3CBDE6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-[#3CBDE6] transition-colors duration-300 group-hover:text-white">
                  {item.head}
                </h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - HEADER TEXT */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <span className="text-[#3CBDE6] font-bold tracking-[0.2em] uppercase text-xs">
              The Opsie Advantage
            </span>
            <div className="h-1 w-12 bg-[#3CBDE6] mx-auto lg:mx-0 rounded-full" />
          </div>

          <div className="min-h-[120px] md:min-h-[180px]">
            <TextType
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white"
              text={[contents.bigHeader]}
              typingSpeed={50}
              pauseDuration={10000}
              showCursor
              cursorCharacter="|"
              deletingSpeed={100}
              cursorBlinkDuration={0.5}
            />
          </div>
          
          <p className="text-blue-100/70 text-lg font-light max-w-lg mx-auto lg:mx-0" data-aos="fade-left" data-aos-delay="500">
            {contents.subHeader}
          </p>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUsSection;