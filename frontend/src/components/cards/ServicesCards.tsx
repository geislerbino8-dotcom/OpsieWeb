
type ServicesCardsProps = {
    serviceName: string
    desc: string
    image: string
}

function ServicesCards({ serviceName, image }: ServicesCardsProps) {
  return (
    <div data-aos="fade-down">
        <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken',
        borderRadius: '1rem',
        padding: '1em',
        // Height is now controlled by Tailwind responsive classes below
        justifyContent: 'flex-center',
        alignItems: 'center',
        color: 'white',
        transition: 'all 0.5s ease'
        

          
    }} className="service-card text-center flex justify-center align-center h-48 sm:h-64 md:h-72 lg:h-[30em]">
      <h2 className='text-2xl sm:text-3xl font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]'>{serviceName}</h2>
      
    </div>
    </div>
  )
}

export default ServicesCards
