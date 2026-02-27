import React from 'react'
import Hero from './components/HeroSection'

import Header from '../../components/layout/Header'
import ProblemsSection from './components/CommonPromblem'
import WhyAluminum from './components/SolutionSection'

import SlidingDoorShowcase from './components/SlidingShowCase'
import HowItWorks from './components/HowItWorkSection'
import SolutionSection from './components/SolutionsSectionv0'

const Homepage = () => {
  return (
      <div className='relative min-h-screen w-full overflow-x-hidden'>
        <Header/>
        <Hero />
        <ProblemsSection/>  
        {/* <WhyAluminum/> */}
        <SolutionSection/>
        <SlidingDoorShowcase/>
        <HowItWorks/>
      </div>

  )
}

export default Homepage
