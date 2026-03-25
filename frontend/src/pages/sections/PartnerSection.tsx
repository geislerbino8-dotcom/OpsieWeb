import LogoLoop from "../../components/LogoLoop";

const imageLogos = [
  { src: "/logo/Frame.svg", alt: "Company 1",  },
  { src: "/logo/Frame-1.svg", alt: "Company 2",  },
  { src: "/logo/Frame-2.svg", alt: "Company 3",  },
  { src: "/logo/Frame-4.svg", alt: "Company 4",  },
  { src: "/logo/Frame-3.svg", alt: "Company 5",  },
];

function PartnerSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-white">


      {/* Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          PARTNERS AND CLIENTS
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, laboriosam.
          
        </p>
      </div>

      {/* Partners Content */}
      <div className="w-full max-w-6xl flex flex-col items-center md:flex-col gap-8">

        {/* Partner Image */}
           <LogoLoop
                  logos={imageLogos}
                  speed={100}
                  direction="left"
                  logoHeight={60}
                  gap={60}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#ffffff"
                  ariaLabel="Technology partners"
                />

        {/* Description */}
        <div className="flex-1 text-gray-700 leading-relaxed">
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque nostrum sunt soluta explicabo nulla incidunt nobis dicta molestias. Nobis accusamus numquam a excepturi distinctio temporibus veritatis, doloribus porro quis?
          </p>
          <p className="mb-4">
            Repudiandae pariatur eligendi omnis repellendus a laborum, maxime molestiae quis ex ipsum quo est adipisci facere porro officia enim ipsam ducimus quas totam nesciunt? Atque repudiandae modi id quae magni.
          </p>
         
        </div>

      </div>

    </section>
  );
}

export default PartnerSection;