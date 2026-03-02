import '../styles/Navigation.css';
import logo from  '../assets/opsie/WhiteLogoText.png';
import burgermenu from '../assets/icons/bars-solid.png'
import PrimaryButton from './buttons/PrimaryButton';
import upArrow from '../assets/opsie/up-right-arrow.png'
import MobileMenu from './MobileMenu';
import { useState } from 'react';

function Navigation() {

  const [ navIsOpen, setNavIsOpen ] = useState(false)

  const openMobileNav = ()=> {
    setNavIsOpen(navIsOpen ? false : true)
  }

  return (
    <div className='nav-container w100'>
      <div className="desktop-nav flex nav-wrapper ai-c fd-r jc-c">
        <div className="desktop-nav-wrapper flex fd-r jc-c ai-c">
          <div className='logo-wrapper'>
          <img className='logo' width={120} src={logo} alt="" />
        </div>

        <div className="menu-wrapper">
            <ul className='menu flex'>
              <li className=' item-menu'><a href="">What We Do</a></li>
              <li className='item-menu'><a href="">Who We Are</a></li>
              <li className='item-menu'><a href="">Contact Us</a></li>
              <li className='item-menu'><a href="">Products</a></li>
          </ul> 
        </div>

        <div className="gt-button-wrapper">
          <PrimaryButton text={"Get Started"} color='#3CBDE6' fontSize='1' borderRadius='2' 
          margin='0' padding='1' image={upArrow}/>
        </div>
        </div>
      

        <div>
        </div>

       
      </div>

       <div className='mobile-nav flex fd-r ai-c jc-sb'>
        <div className='logo-wrapper'>
          <img width={100} src={logo} alt="" />
        </div>
          <button onClick={openMobileNav} className='bm-wrapper flex fd-c ai-c'>
            <img  className='burger-menu' width={30} src={burgermenu} alt="" />
          </button>
          
        </div>
        {
            navIsOpen ? <MobileMenu /> : null
          }

    </div>
  )
}

export default Navigation
