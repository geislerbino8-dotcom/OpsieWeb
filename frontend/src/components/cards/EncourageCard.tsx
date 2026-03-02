import PrimaryButton from "../buttons/PrimaryButton"
import '../../styles/EncourageSection.css'

function EncourageCard() {
  return (
    <div className="encourage-card-container flex fd-c ai-c jc-c"
        style={{
            padding: '3em 1em ',
            backgroundColor: '#3CBDE6',
            margin: '1em auto',
            borderRadius: '1em',
        }}
    >
        <div className="encourage-card-wrapper">
            <h1 style={{
                textAlign: 'center'
            }}>Your <span>Vision</span>. Our <span>expertise</span>.
                One <span>Powerfull Collaboration</span>
            </h1>
        </div>
        <div>
            <p style={{
                textAlign: 'center',
                margin: '1em 0',
                color: 'white'
            }}>Great products are built through teamwork. We work side by side with our clients, 
                combining strategy, creativity, and technology to 
                create solutions that drive real growth and measurable impact.</p>

        </div>
        <div>
            <button style={{
                backgroundColor: 'white',
                border: 0,
                padding: '1em',
                borderRadius: '1em',
                fontWeight: 'bolder',
                color: '#3CBDE6',
            }}
                className="flex fd-c jc-c ai-c"
            >Contact Us Now</button>
        </div>
      
    </div>
  )
}

export default EncourageCard
