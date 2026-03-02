import P1 from '../../assets/visuals/HRIS.png'
import '../../styles/PartnerSection.css'
import PartnersImage from '../../assets/visuals/Partners.png'
import TopSectionCard from '../cards/TopSectionCard'

function PartnerSection() {
  return (
    <div className="partner-section-container flex fd-c jc-c vw100 vh100">
      <TopSectionCard secName='Products' />
        <div className="partner-section-wrapper">
            <h1 className="p-title txt-a-c">PARTNERS AND CLIENTS</h1>
            <p className="txt-a-c">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, laboriosam.</p>
        </div>
        <div className="partners-content">
          <div className="partners-desc">
            <div className="partner-item-wrapper">
            <img width={330} src={PartnersImage} alt="" />

        </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque nostrum sunt soluta explicabo nulla incidunt nobis dicta molestias. Nobis accusamus numquam a excepturi distinctio temporibus veritatis, doloribus porro quis?
            Repudiandae pariatur eligendi omnis repellendus a laborum, maxime molestiae quis ex ipsum quo est adipisci facere porro officia enim ipsam ducimus quas totam nesciunt? Atque repudiandae modi id quae magni.
            Dolor obcaecati consequuntur adipisci sit doloribus illo, hic vel laborum veritatis ad accusantium cumque eos enim vero tenetur non ex! Illum accusantium fugit sit maiores suscipit voluptas ullam temporibus dolore.</p>
          </div>
          
        </div>
    </div>
  )
}

export default PartnerSection
