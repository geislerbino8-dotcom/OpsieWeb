import '../styles/HeroPage.css'
import LogoOnly from '../assets/icons/opsie_logo_only.png'
import HomeHeroImg from '../assets/background-images/landing-hero.jpg'

type HeroContent = {
  heroText?: string
  bgImage?: string
}


function HeroPage({heroText, bgImage} : HeroContent) {
  return (  
    <div className='hero-page-container vw100 vh100 flex fd-c ai-c flex jc-c'
      style={{
        backgroundImage: `url(${bgImage? bgImage : HomeHeroImg})`
      }}
    >
      <div className="hero-content flex ai-c fd-c jc-c">
       { /**<div>
          <img className='hero-visual' width={600} src={LogoOnly} alt="" />
        </div> */}
          <div className="hero-text-content">
            {
              !heroText ? <h1 className='hero-title'>Turning
              Ideas into 
              <span className='playfair-text i blue-txt'> Reality</span>✨</h1>
              : <h1>{heroText}</h1>
            }

            <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga temporibus ipsa dolore laboriosam ea harum iure quo consequuntur dolorem rem nobis sint magni esse quam, hic laudantium dolorum aliquam suscipit?</p>
            </div>

            <div>
              <button className='btn-hero'>GET STARTED</button>
            </div>
              
        
          </div>
      </div>
    </div>
  )
}

export default HeroPage
