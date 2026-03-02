type AnalyticsCardsProps = {
    numbers: String,
    desc : string,

}

function AnalyticsCards({numbers, desc} : AnalyticsCardsProps) {
  return (
    <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5em', 
        padding: '1em',
        width: '45%',
        height: '9em',
        boxShadow: '3px 4px 12px -6px rgba(66, 68, 90, 1)'

      }}
      className="flex-col-center">
      <h1 style={{fontSize: '2rem', color: '#242424'}}>{numbers}</h1>
      <h4 style={{color: 'gray', textAlign: 'center'}}>{desc}</h4>
    </div>
  )
}

export default AnalyticsCards
