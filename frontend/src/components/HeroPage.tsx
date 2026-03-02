import '../styles/HeroPage.css'
import LogoOnly from '../assets/icons/opsie_logo_only.png'


function HeroPage() {
  return (
    <div className='hero-page-container vw100 vh100 flex fd-c ai-c jc-fe'>
      <div className="hero-content flex ai-c fd-c jc-c">
        <div>
          <img className='hero-visual' width={600} src={LogoOnly} alt="" />
        </div>
          <div className="hero-text-content">
            <h1 className='hero-title playfair-text'>Bringing Ideas into Reality</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aperiam aliquam neque, vero labore nostrum accusantium atque molestias.</p>
        <button className='btn-hero'>GET STARTED</button>
          </div>
      </div>
    </div>
  )
}

export default HeroPage
