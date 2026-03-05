type TopSectionCardProps = {
    image? : string
    secName: string
}

function TopSectionCard({image, secName} : TopSectionCardProps) {
  return (
    <div className="top-section-card-container flex"
    
    >
      <div className="top-section-card-wrapper flex fd-r ai-c jc-c"
        style={{
            boxShadow: 'inset 3px 4px 8px -4px rgba(60, 189, 230, 1)',
            padding: '0.5em 2em',
            borderRadius: '1em',
            margin: '1em 0'
        }}
      >
        <img width={10} src={image} alt="" />
        <h5 style={{
            color: '#3CBDE6',
            

        }}>{secName}</h5>
      </div>
    </div>
  )
}

export default TopSectionCard
