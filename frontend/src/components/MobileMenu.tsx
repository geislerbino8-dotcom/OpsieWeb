import '../styles/MobileMenu.css'
import PrimaryButton from './buttons/PrimaryButton'


function MobileMenu() {
  return (
    <div className='mobile-menu-container flex vw100 vh100'>
        <div className="mobile-menu-wrapper flex fd-c ai-c">
            <div className='slide-bar'>
            </div>
            <div>
                <ul>
                    <li><a href="">What We Do</a></li>
                    <li><a href="">Who We Are</a></li>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">Products</a></li>
                </ul>

                <button>Get Started</button>
            </div>

        </div>

    </div>
  )
}

export default MobileMenu
