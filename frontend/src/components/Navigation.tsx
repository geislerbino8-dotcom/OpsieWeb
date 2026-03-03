import '../styles/Navigation.css';
import logo from  '../assets/opsie/WhiteLogoText.png';
import burgermenu from '../assets/icons/bars-solid.png'
import PrimaryButton from './buttons/PrimaryButton';
import upArrow from '../assets/opsie/up-right-arrow.png'
import MobileMenu from './MobileMenu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuLists = {
  nav1: {
    name: 'What We Do',
    link: '/what-we-do'
  },

  nav2: {
    name: 'Who We Are',
    link: '/who-we-are'
  },

   nav3: {
    name: 'Contact Us',
    link: '/contact-us'
  },
   nav4: {
    name: 'Products',
    link: '/products'
  },
}

function Navigation() {

  const location = useLocation()
  const [ navIsOpen, setNavIsOpen ] = useState(false)
  const [ activeNav, setActiveNav ] = useState()
  const navigate = useNavigate()

  useEffect(()=> {
    
  }, [])

  const openMobileNav = ()=> {
    setNavIsOpen(navIsOpen ? false : true)
  }

  const directToHome = ()=> {
    navigate('/')
    setNavIsOpen(false)
  }

  return (
    <div className='nav-container w100'>
      <div className="desktop-nav flex nav-wrapper ai-c fd-r jc-c">
        <div className="desktop-nav-wrapper flex fd-r jc-c ai-c">
          <div className='logo-wrapper'>
          <img onClick={()=> {
            directToHome()
          }} className='logo' width={120} src={logo} alt="" />
        </div>

        <div className="menu-wrapper">
            <ul className='menu flex'>
              {
                Object.values(menuLists).map((val, index)=> {

                  if(val.link == location.pathname){
                    
                  }

                  return (
                    <li key={index} className='item-menu'>
                      <Link to={val.link} 
                      className={
                        `nav-link ${val.link === location.pathname ? 'active-menu' : ""}`
                      }>{val.name}</Link>
                    </li>
                  )
                })
              }
             
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
          <img onClick={()=> {
            directToHome()
          }} width={100} src={logo} alt="" />
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
