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
<<<<<<< HEAD
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
              
        
=======
            <h1 className='hero-title playfair-text'>Bringing Ideas into Reality</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aperiam aliquam neque, vero labore nostrum accusantium atque molestias.</p>
        <button className='btn-hero'>GET STARTED</button>
>>>>>>> a68b8d75a068078bd35e10af51f81c773624a34b
          </div>
      </div>
    </div>
  )
}

export default HeroPage
