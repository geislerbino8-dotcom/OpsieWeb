import ProductItemCTA from '@/components/cards/ProductItemCTA'
import ContactForm from '@/components/cards/ContactForm'
import ContactsCard from '@/components/cards/ContactsCard'
import { SiFacebook, SiInstagram, SiGmail, SiIndeed } from 'react-icons/si';
import MapBox from '@/components/MapBox'
import ContactBg from '../assets/background-images/ContactUsBg.png'
import { useNavigate } from 'react-router-dom';


function ContactUsPage() {

  const  dirAction = false
  const navigate = useNavigate()

  return (
    <div className="max-w-[1280px] mt-25 mx-auto overflow-hidden">

  {/* HERO SECTION */}
  <div className="w-full px-2">
    <div className="relative w-full  ">
    <div data-aos="fade-right" className="relative h-[90vh] lg:h-[85vh] md:min-h-[600px] rounded-4xl overflow-hidden mb-10">
  
    {/* Background Image */}
    <img
      src={ContactBg}
      alt="Hero Image"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="lg:w-[820px] md:via-black/70 absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 sm:bg-gradient-to-t md:bg-gradient-to-r sm:from-black/100 sm:via-black/20 md:from-black/100  to-transparent"></div>
    {/* Overlay Content */}
    <div>
      
    </div>
    <div  className="hidden md:block absolute md:right-2 md:bottom-4 lg:bottom-4 lg:right-0 mx-auto z-50 ">
      <div data-aos="fade-down"  className="flex flex-col items-start md:flex-row-reverse lg:justify-center leading-4  gap-2 ml-2 ">
          <div className="flex flex-col justify-start items-start md:items-start md:justify-center lg:leading-5">
          
          {/* MD VERSION */}
          <div className="flex flex-col items-center justify-center lg:hidden mt-2 gap-2">
            <div className="text-[#3CBDE6] text-[20px] xl:text-[30px] lg:hidden mt-2  flex items-center justify-center gap-1">
              <span className="text-3xl leading-0 ml-2">★</span> 5/5
            </div>
          </div>

          {/* LG VERSION */}
          <h1 className="hidden lg:block font-poppins font-semibold text-[14px] xl:text-[20px]">
            10+ Satisfied Clients
          </h1>
          <div className="hidden lg:flex flex flex-row gap-2 items-center justify-center ">
            <div className=" text-[#3CBDE6] text-[22px] xl:text-[30px]">
              ★★★★★ 
            </div>
            <h1 className="font-poppins mt-2 xl:text-[20px]">
                5/5
            </h1>
          </div>
        </div>

        <div className="flex flex-row -space-x-3 lg:-space-x-2 xl:-space-x-4 mt-2 lg:mt-0 ">
          <img src="/profiles/Rectangle 780.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14  object-cover  " />
          <img src="/profiles/Rectangle 816.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full object-cover " />
          <img src="/profiles/Rectangle 818.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full object-cover " />
          <img src="/profiles/Rectangle 818-1.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full md:hidden lg:flex " />
        </div>
      </div>
    </div>
        

      {/* Header overlays the image */}
          {/* Content on top of image */}
          <div className="relative z-10 flex flex-col items-center justify-end md:justify-end  mt-20 md:mt-10 h-full px-4 text-white">
            <div className="mb-24 flex flex-col items-center justify-center md:items-start w-full">
              <h1 data-aos="fade-right" data-aos-once="false" data-aos-mirror="true" data-aos-offset="0"  className="w-full max-w-[605px] font-poppins text-[40px] leading-[38px] md:text-[60px] md:leading-[60px] text-center md:text-left font-light">
                Let's Talk About What's on your Mind.
              </h1>
              <p data-aos="fade-right" data-aos-offset="50"  data-aos-delay="300" className="font-poppins mt-4 text-[14px] leading-[14px] md:text-xl md:leading-[24px] font-light text-center md:text-left  max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <div data-aos="fade-right" data-aos-offset="50" data-aos-delay="400">
            
              </div>
              
            </div>
          </div>
          
      </div>
      <div data-aos="fade-left" className="flex flex-row justify-center items-center md:items-start md:justify-center md:hidden gap-4 mb-6 sm:mb-10">

          <div className="flex flex-row -space-x-2 mt-2 lg:mt-0">
              <img src="/profiles/Rectangle 780.svg" className="w-12 h-12   object-cover  " />
              <img src="/profiles/Rectangle 816.svg" className="w-12 h-12  rounded-full " />
              <img src="/profiles/Rectangle 818.svg" className="w-12 h-12  rounded-full " />
              <img src="/profiles/Rectangle 818-1.svg" className="w-12 h-12  rounded-full md:hidden lg:flex " />
            </div>

            <div className="flex flex-col leading-4 items-start mt-2">
                <h1 className="flex font-poppins font-semibold text-[16px] xl:text-[20px]">
                10+ Satisfied Clients
                </h1>
              <div className="flex flex-row items-center justify-center gap-2 ">
                  <div className=" text-[#3CBDE6] text-[24px]">
                    ★★★★★ 
                  </div>
                  <h1 className="font-poppins mt-2 text-[18px]">
                      5/5
                  </h1>
              </div>
            </div>

            
          </div>
        <div className="flex flex-col md:flex-row justify-center">
          <ContactForm />
          <div className="flex flex-col mt-5">
            <ContactsCard title='Give us a Call.' 
              children={
                <>
                <p data-aos="fade-left" className="text-gray-600">
            For contact details, kindly reach:
          </p>

            <p data-aos="fade-left">Mobile No. 12345678911</p>
            <p data-aos="fade-left">Mobile No. 21314456272</p>
            <p data-aos="fade-left">HR Department email: asdas@gmail.com</p>
                  <p>1-800-664-9073</p>
                </>
              }
            />
            <ContactsCard data-aos="fade-left" title='Chat with us.' 
              children={
                <>
                 <div className="flex flex-row items-center">
                    <SiFacebook data-aos="fade-left" className="my-2 text-gray-400 text-3xl md:w-4 md:h-4 lg:w-8 lg:h-8 group-hover:text-white" />
                    
                    <div className="flex items-center">
                      <a data-aos="fade-left" href="" className='ml-3'>
                        www.facebook.com
                      </a>
                    </div>
                  </div>
                 <div className="flex flex-row items-center">
                    <SiInstagram data-aos="fade-left" className="my-2 text-gray-400 text-3xl md:w-4 md:h-4 lg:w-8 lg:h-8 group-hover:text-white" />
                    
                    <div className="flex items-center">
                      <a data-aos="fade-left" href="" className='ml-3'>
                        @opsiesoftware
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <SiGmail data-aos="fade-left" className="my-2 text-gray-400 text-3xl md:w-4 md:h-4 lg:w-8 lg:h-8 group-hover:text-white" />
                    
                    <div className="flex items-center">
                      <a data-aos="fade-left" href="" className='ml-3'>
                        opsiesoftwaresolutions@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <SiIndeed data-aos="fade-left" className="my-2 text-gray-400 text-3xl md:w-4 md:h-4 lg:w-8 lg:h-8 group-hover:text-white" />
                    
                    <div className="flex items-center">
                      <a data-aos="fade-left" href="" className='ml-3'>
                        www.facebook.com
                      </a>
                    </div>
                  </div>
                </>
              }
            />
            <ContactsCard 
              title="Meet us Virtually"
              children={
                <div className="flex flex-col gap-3 text-center">
                  <p data-aos="fade-left" className="text-gray-600">
                    Schedule a virtual meeting with our team 
                    <span><br /></span>and let’s discuss how we can help you.
                  </p>

                  <button data-aos="fade-left" className="bg-[#3CBDE6] text-white px-4 py-2 rounded-md hover:bg-[#34a9cc] transition"
                    onClick={()=> {
                      navigate("/book-a-schedule")
                    }}
                  >
                    Book a Meeting
                  </button>
                </div>
              }
            />
          </div>
        </div>

       <div className="w-full grid lg:grid-cols-2 gap-10 md:m-5 md:mt-20 items-start">

  {/* LEFT: MAP */}
  <div className="bg-white p-4 rounded-2xl">
    
    <div className='relative md:left-9'>
      <MapBox data-aos="fade-right" getDirection={dirAction} />
    </div>
    <div className='my-10'>
      <div className='my-3'>
      <h1 data-aos="fade-right" className='text-3xl font-bold'>Main Office</h1>
      <p data-aos="fade-right">Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila
</p>
    </div>
    <button 
          data-aos="fade-right"
          onClick={() => dirAction}
          className="text-[#3CBDE6] text-sm mt-2 hover:underline"
        >
          Get Directions →
        </button>
    </div>
  </div>

  {/* RIGHT: OTHER LOCATIONS */}
  <div className="w-full md:w-[90%] flex flex-col gap-6">

    <div>
      <h1 data-aos="fade-right" className="text-3xl">
        Other Locations
      </h1>
      <p data-aos="fade-right" className="text-gray-500 text-sm mt-1">
        Explore our branches across the Philippines.
      </p>
    </div>

    {/* Locations List */}
    <div className="flex flex-col gap-4">

      {/* ITEM */}
      <div className="p-4 rounded-xl border hover:shadow-md transition">
        <h2 data-aos="fade-right" className="font-semibold">Quezon City (HQ)</h2>
        <p data-aos="fade-right" className="text-gray-500 text-sm">Diliman, Quezon City</p>
        <button 
          onClick={() => dirAction}
          className="text-[#3CBDE6] text-sm mt-2 hover:underline"
        >
          Get Directions →
        </button>
      </div>

      {/* ITEM */}
      <div className="p-4 rounded-xl border hover:shadow-md transition">
        <h2 data-aos="fade-right" className="font-semibold">Makati Office</h2>
        <p data-aos="fade-right" className="text-gray-500 text-sm">Ayala Avenue, Makati</p>
        <button 
          onClick={() => dirAction}
          className="text-[#3CBDE6] text-sm mt-2 hover:underline"
        >
          Get Directions →
        </button>
      </div>

      {/* ITEM */}
      <div className="p-4 rounded-xl border hover:shadow-md transition">
        <h2 data-aos="fade-right" className="font-semibold">Cebu Branch</h2>
        <p data-aos="fade-right" className="text-gray-500 text-sm">IT Park, Cebu City</p>
        <button 
          onClick={() => dirAction}
          className="text-[#3CBDE6] text-sm mt-2 hover:underline"
        >
          Get Directions →
        </button>
      </div>

    </div>

  </div>

</div>

    
    
    
      </div>
    </div>

    <div className='w-full'>
      <ProductItemCTA />
    </div>
</div>
  )
}

export default ContactUsPage
