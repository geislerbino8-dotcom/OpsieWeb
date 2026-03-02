import MapImage from '../../assets/visuals/Map.png'
import BlackButton from '../buttons/BlackButton'


function MapCard() {
  return (
    <div className='map-card flex fd-c'
        style={{
            padding: '1em'
        }}
    >
        <div>
            <h3>Prefer a Direct Approach?</h3>
            <p>+5654654654</p>
            <p>contact@landing.com</p>
            <p>Monday to Friday, 9 AM - 6 PM (PHT)</p>

        </div>
      <img className='map-image' width={320} src={MapImage} alt="" 
        style={{
            borderRadius: '1em',
            border: '1px solid black'
        }}
      />
      <p style={{margin: '0.5em 0'}}>Princeton Street, Corner Shaw Blvd, Mandaluyong City, 1554 Metro Manila</p>
        
        <div className='flex fd-r ai-c'
            style={{
                justifyContent: 'space-between'
            }}
        >
            <h1>Visit Our Office</h1>
            <BlackButton text="Get Direction" fontSize="1" borderRadius="1" margin="1" image="" color={""} padding={""}/>

        </div>
    
    </div>
  )
}

export default MapCard
