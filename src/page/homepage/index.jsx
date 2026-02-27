import React from 'react'
import Hero from './components/HeroSection'

import Header from '../../components/layout/Header'
import ProblemsSection from './components/CommonPromblem'


import SlidingDoorShowcase from './components/SlidingShowCase'
import HowItWorks from './components/HowItWorkSection'
import SolutionSection from './components/SolutionsSection'
import ClosingCTA from './components/ContactSection'
import Testimonials from './components/Testimonials'

const Homepage = () => {
  return (
      <div className='relative min-h-screen w-full overflow-x-hidden'>
        <Header/>
        <Hero />
        <ProblemsSection/>  
        <SolutionSection/>
        <SlidingDoorShowcase/>
        <Testimonials/>
        <HowItWorks/>
        <ClosingCTA/>
      </div>

  )
}

export default Homepage
