import '../../styles/Analytics.css'
import AnalyticsCards from '../../components/cards/AnalyticsCards'
import OpsieLogo from '../../assets/icons/opsie_logo_only.png'
import TopSectionCard from '../../components/cards/TopSectionCard'

function Analytics() {
  return (
    <div className="analytics-container vw100 flex fd-c jc-c">
      <TopSectionCard secName='Client and Feedback'/>

      <div className='analytics-content flex ai-c jc-c'>
        <div className="header-sec">
           {
            /**
             * <div className='flex-col-center'>
            <img width={40} src={NumberVisuals} alt="" />
          </div>
             */
           }
          <div className='header-analytics-container'>
      
             <div className='flex-col-center'>
              <img  width={90} src={OpsieLogo} alt="" />
            </div>
         
            <h1>Our <span className='hl-txt'>Numbers</span> by Experience</h1>
          </div>
              <div className='header-analytic-desc'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, blanditiis.</p>
              </div>
        </div>
        
        <div>   
          <div className="numbers-item flex fd-r jc-c">
          <AnalyticsCards numbers={'10+'} desc='HAPPY CLIENTS' />

         <AnalyticsCards numbers={'10+'} desc='COMPANIES' />

         <AnalyticsCards numbers={'10+'} desc='PROJECTS DONE' />

         <AnalyticsCards numbers={'10+'} desc='CONSULTANTS' />
        </div>

      
        </div>
    
       


      </div>
    </div>
  )
}

export default Analytics
