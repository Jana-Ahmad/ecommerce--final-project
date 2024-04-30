import React from 'react'
import { Link } from 'react-router-dom';

function AppSection() {
    const btnText="Sign up for Free";
    const title="Shop Anytime, Anywhere";
    const desc= "Take shop on your any device with our app & learn all time what you want. Just download & install & start to learn"
  return (
    <div className='app-section padding-tb'>
      <div className='container'>
<div className='section-header text-center'>
  <Link to="/signup" className='lab-btn mb-4'>
    {btnText}
  </Link>
  <h2 className='title'>{title}</h2>
  <p className='desc'>{desc}</p>

</div>
<div className='section-wrapper'>
  <ul className='lab-ul'>
    <li><a href="#"><img src="/src/assets/images/app/01.jpg" /></a></li>
    <li><a href="#"><img src="/src/assets/images/app/02.jpg" /></a></li>
  </ul>

</div>
      </div>

    </div>
  )
}

export default AppSection