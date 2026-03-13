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
    <section className="w-full py-10 bg-gray-50 flex justify-center"
      style={{
        backgroundColor: '#0082ba'
      }}
    >
      <div className="w-full max-w-6xl flex flex-col-reverse flex-col  md:flex-row gap-8 md:gap-16 p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 flex-1">
          {
            content.map((item, index)=> {
              return(
                <div
                data-aos="fade-right"
                key={index} className="text-white bg-white rounded-xl shadow-lg p-6 flex items-center justify-start"
                  style={{
                    backgroundColor: '#00000083',
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundBlendMode: 'darken',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'

                  }}
                >
                  <p>   
                    <strong>{item.head}</strong><br />
                    {item.desc}
                  </p>
                </div>
              )
            })
          }

          

         

          
        </div>

        <div className="flex-1 flex items-center justify-center px-6
          rounded-3xl
        ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left"
            style={{
              color: '#cdf7ff'
            }}
            data-aos="fade-left"
          >
            Why do so many companies choose Opise software solutions?
          </h1>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUsSection;