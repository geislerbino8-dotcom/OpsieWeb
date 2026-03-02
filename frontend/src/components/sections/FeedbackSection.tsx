import '../../styles/FeedbackSection.css'
import FeedbackSectionCard from '../cards/FeedbackSectionCard'

function FeedbackSection() {
  return (
    <div className='feedback-section-container flex fd-c jc-c ai-c vw100'>
      <div className="feedback-section-wrapper flex fd-c jc-c ai-c">
      </div>
      <div className="feedback-items flex ai-c">
        <FeedbackSectionCard />
        <FeedbackSectionCard />
        <FeedbackSectionCard />
        <FeedbackSectionCard />
      </div>
    </div>
  )
}

export default FeedbackSection
