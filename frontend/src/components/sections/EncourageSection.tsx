import EncourageCard from "../cards/EncourageCard"
import '../../styles/EncourageSection.css'

function EncourageSection() {
  return (
    <div className="encourage-section-container flex fd-c ai-c jc-c vw100">
      <div className="encourage-section-wrapper">
        <EncourageCard />
      </div>
    </div>
  )
}

export default EncourageSection
