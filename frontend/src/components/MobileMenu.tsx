import '../styles/MobileMenu.css'
import { Link } from 'react-router-dom'

function MobileMenu() {
  return (
    <div className='mobile-menu-container flex vw100 vh100'>
        <div className="mobile-menu-wrapper flex fd-c ai-c">
            <div className='slide-bar'>
            </div>
            <div>
                <ul>
                    <li className=' item-menu'>
                <Link to={'/what-we-do'}>What We Do</Link>
              </li>
              <li className='item-menu'>
                <Link to={'/who-we-are'}>Who We Are</Link>
              </li>
              <li className='item-menu'>
                <Link to={'./contact-us'}>Contact Us</Link>
              </li>
              <li className='item-menu'>
                <Link to={'/products'}>Products</Link>
              </li>
                </ul>

                <button>Get Started</button>
            </div>

        </div>

    </div>
  )
}

export default MobileMenu
