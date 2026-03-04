import React from 'react'
import OpsieImage from '../../assets/opsie/opsie_full.jpg'
import '../../styles/AboutUsSection.css'
import TopSectionCard from '../../components/cards/TopSectionCard'

function AboutUsSection() {

  

  return (
    <div className='about-us-section-container flex fd-c'>
      <div>
        <TopSectionCard secName='About Us' />
      </div>
     
      <div className="about-us-section-wrapper flex">
         
        <div className='flex-col-center'>
          
          <img src={OpsieImage} width={300} alt="" />
        </div>
        <div className="about-us-desc flex">
          <div>
          <h2>Let your Business into Digitally Real</h2>
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae sequi minus rerum fugit distinctio eos quis facere nihil fugiat non facilis voluptatibus, saepe, repudiandae natus quaerat modi dignissimos doloribus ducimus?
          Dolores tempore perspiciatis minima quis animi eos, odio deleniti cum et delectus id suscipit tempora, mollitia magnam eum ex sint fugiat dignissimos quaerat quibusdam, consequatur similique culpa voluptas. Voluptatibus, quas!
          Minus itaque corrupti repellendus ducimus aperiam ipsa, cum voluptas architecto ratione! Dignissimos voluptatem reiciendis vel quod nisi molestiae sunt facilis necessitatibus ad, possimus modi velit fugiat nihil? Odio, quis aperiam!
        </div>
        <div className='learn-more-button-wrapper'>
          <button>Learn more</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsSection
