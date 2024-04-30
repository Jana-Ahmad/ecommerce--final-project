import React from 'react'
import Categories from './Categories'
import Banner from './Banner'
import Signup from './Signup'
import About from './About'
import AppSection from './AppSection'
import Sponsor from './Sponsor'

function Home() {
  return (
    <div >
     <Banner/>
     <Categories/>
     <Signup/>
     <About/>
     <AppSection/>
     <Sponsor/>
    </div>
  )
}

export default Home