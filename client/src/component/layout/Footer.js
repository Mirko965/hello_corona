import React from "react";
import gitHubIcon from '../../images/GitHub-Mark-32px.png'

const Footer = () => {
  return (
    <>
      <a href='https://github.com/Mirko965/hello_corona.git' rel="noopener noreferrer" target='_blank'>
        <img src={gitHubIcon} className='profile__header--img' alt='github icon'/>
      </a>
    </>
  )
}

export default Footer