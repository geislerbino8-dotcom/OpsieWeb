import '../../styles/ServicesSection.css'

type ServicesCardsProps = {
    serviceName: string
    desc: string
    image: string
}

function ServicesCards({ serviceName, desc, image }: ServicesCardsProps) {
  return (
    <div style={{minWidth: '20em'}} data-aos="fade-down">
        <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken',
        borderRadius: '2rem',
        padding: '1em',
        height: '30em',
        margin: '0 1em',
        justifyContent: 'flex-end',
        color: 'white'


    }} className="group relative service-card text-center flex flex-col">
      <h2 className='text-3xl font-bold'>{serviceName}</h2>
      <p 
        className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      style={{textAlign: 'left', margin: '1em 0 2em 0', color: 'white'}}>L repellat veniam iste explicabo error facere enim, possimus harum expedita impedit et, ipsa at voluptas velit qui! Repellat soluta consequuntur nulla accusamus!</p>


   
  <button
    onClick={()=> window.location.href = '/what-we-do'}
  className="opacity-0 group-hover:opacity-100p transition-opacity duration-300  bg-blue-500 text-white rounded shadow-lg cursor-pointer ">
    View
  </button>


    </div>
    </div>
  )
}

export default ServicesCards
