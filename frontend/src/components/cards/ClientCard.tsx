type ClientCardProps = {
    image: string
}

function ClientCard({image} : ClientCardProps) {
  return (
    <div className="client-card-container">
      <div className="client-card-wrapper">
        <img width={100} src={image} alt="" />
      </div>
    </div>
  )
}

export default ClientCard
