import React from 'react'
import email from '../images/email.png'
import linkedin from '../images/linkedin.png'
import instagram from '../images/instagram.png'
const Footer = () => {
  return (
    <footer class="footerdiv">
      <div class="footerdiv_text">
        <h2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquid
          vero qui quibusdam similique excepturi eveniet facere deserunt quaerat
          officiis eaque nostrum dicta iure, veniam ducimus porro aperiam
          distinctio provident!
        </h2>
        <div class="footerdiv_connect">
          <a href="mailto:104823405@student.swin.edu.au">
            <img src={email} alt="email logo" id="email" />
          </a>
          <a href="https://www.linkedin.com/in/zubair-ali-b8281b174/">
            <img src={linkedin} alt="linkedin logo" id="linkedin" />
          </a>
          <a href="https://www.instagram.com/psy_agent_x/">
            <img src={instagram} alt="instagram logo" id="instagram" />
          </a>
        </div>
        <div class="copyright">
          Copyright © 2023 All rights reserved
          <br />
          All trademarks are the property of their respective owners
        </div>
      </div>
      <div class="footerdiv_mapsection"></div>
    </footer>
  )
}

export default Footer
