import { useParams } from 'react-router-dom'
import ProductItemCTA from '@/components/cards/ProductItemCTA'
import { TestimonialCard } from '@/components/Card/ClientCard'
import heroImg from '../assets/samples/HRIS/image.png'
import ss1 from '../assets/samples/HRIS/ss1.png'
import ss2 from '../assets/samples/HRIS/ss2.png'
import ss3 from '../assets/samples/HRIS/ss3.png'
import ss4 from '../assets/samples/HRIS/ss4.png'

const cards = [
    {
      name: "John Doe",
      role: "Co-Founder at Skale",
      avatar: "/profiles/prof1.svg",
      review: "The website was very easy to navigate, and booking their service only took a few minutes. Everything was clear and straightforward. The team delivered exactly what was promised. I’m very satisfied with the overall experience!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "CEO at Techwave",
      avatar: "/profiles/prof2.svg",
      review: "I used their website to request a service, and the whole process was smooth and hassle-free. I received confirmation quickly, and their team kept me updated throughout the project. Highly recommended!",
      rating: 5,
    },
    {
      name: "Mark Johnson",
      role: "CTO at Devhub",
      avatar: "/profiles/Rectangle 399.svg",
      review: "After submitting my request through the website, I was contacted almost immediately. Their response time was impressive, and the quality of work exceeded my expectations. I will definitely use their services again.",
      rating: 4,
    },
    {
      name: "Sarah Lee",
      role: "Designer at Pixelco",
      avatar: "/profiles/Rectangle 399.svg",
      review: "I felt confident using their website because everything was secure and well-organized. The service I received matched exactly what was described online. It’s convenient, reliable, and very professional.",
      rating: 5,
    },
  ];

  const sampleKeyFeatures  = [
  {
    title: "Employee Onboarding",
    description: "Easily add new employees and manage their records in one place.",
  },
  {
    title: "Attendance Tracking",
    description: "Monitor time-in, time-out, and leave requests in real-time.",
  },
  {
    title: "Payroll Processing",
    description: "Automate salary computation, taxes, and payslips.",
  },
  {
    title: "Performance Review",
    description: "Evaluate employee progress and set measurable goals.",
  },
]

const sampleFeatureImg = [
  ss1, ss2, ss3, ss4
]

function ProductItemPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="w-full flex flex-col justify-center align-center items-center bg-gray-900 text-white overflow-hidden"
      
    >

      {/* Top Section */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-800 relative"
      style={{
          backgroundColor: '#000000c4',
          backgroundImage: 'url("/PBG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'darken'
        }}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src={heroImg}
              alt={id}
              className="w-80 md:w-100 lg:w-150 rounded-3xl object-contain shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-extrabold">
              {id}
            </h1>

            <p  data-aos="fade-left" className="text-gray-300 leading-relaxed text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis impedit accusantium nesciunt cupiditate repudiandae quas quidem quos, suscipit pariatur aut.
            </p>

            <div className="flex justify-center md:justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-bold text-white shadow-lg hover:scale-105 hover:shadow-cyan-400/50 transition-all duration-300">
                Get a Demo
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Product Info Section */}
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl rounded-3xl mt-16 md:p-12 space-y-12 shadow-2xl">
        <div className="w-full">
          <iframe
            className="w-full h-[400px] md:h-[500px] rounded-2xl shadow-xl"
            src="https://www.youtube.com/embed/aAvDI1qae-U"
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>

        {/* Gallery */}
        

        {/* Product Title */}
        <div className="text-center md:text-left">
          <div className="">
          <h2 className="text-3xl md:text-4xl font-bold my-3">
            {id}
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-4xl text-center md:text-left text-gray-300 leading-relaxed text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque enim, maiores reiciendis architecto at, nobis veniam ipsam consequatur quaerat quos.
          </p>
        </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {sampleFeatureImg.map((_, index) => (
            <img
              key={index}
              src={_}
              width={200}
              alt={`Gallery ${index + 1}`}
              className="rounded-xl border border-white/20 shadow-md hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Key Features */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">
            🚀 Key Features
          </h2>

          <div className='flex flex-col md:flex-row justify-center'>
            {
              sampleKeyFeatures.map((item, index)=> {
                return(
                  <div key={index} className='border-l p-2 m-3'>
                    <div className='absolute'>
                      <p className='relative bottom-4 right-5.5 text-xl' >♦️</p>
                    </div>
                    <div>
                      <h1 className='text-xl font-semibold ml-3'>{item.title}</h1>
                    <p className='ml-3'>{item.description}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleFeatureImg.map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="flex justify-center mb-4">
                  <img src={_} alt={`Feature ${index + 1}`} className="w-12 rounded-3xl border-3" />
                </div>
                <h4 className="font-semibold text-xl mb-2">
                  Feature {index + 1}
                </h4>
                <p className="text-gray-300 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil et, amet, necessitatibus odio animi.
                </p>
              </div>
            ))}
          </div>

          <div className='p-cards-container md:flex-row flex-col h-full w-full flex overflow-x-auto overflow-y-visible'>
            {
              cards.map((card, item)=> (
                <div key={item} className='p-cards-container flex-shrink-0 w-[40%] px-4'>
                  <TestimonialCard {...card} />
                </div>
              ))
            }
          </div>
            

         
        </div>
      </div>

        <ProductItemCTA />


       

          
           
    </div>
  )
}

export default ProductItemPage