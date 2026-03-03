
type ServicesCardsProps = {
    serviceName: string
    desc: string
    image: string
}

function ServicesCards({ serviceName, desc, image }: ServicesCardsProps) {
  return (
    <div style={{minWidth: '20em'}}>
        <div style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'darken',
          borderRadius: '1rem',
          padding: '1em',
          height: '30em',
          margin: '0 1em',
          justifyContent: 'flex-end',
          color: 'white'


    }} className="services-card-container flex fd-c">
      <h2>{serviceName}</h2>
      <p style={{textAlign: 'left', margin: '1em 0 2em 0', color: 'white'}}>L repellat veniam iste explicabo error facere enim, possimus harum expedita impedit et, ipsa at voluptas velit qui! Repellat soluta consequuntur nulla accusamus!</p>

    </div>
    </div>
  )
}

export default ServicesCards
