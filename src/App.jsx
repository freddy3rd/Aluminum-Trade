import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import aluminum from './assets/video/animated_aluminum.mp4'
import Hero from './page/homepage'
import Header from './components/layout/Header'
import AluminumScrollAnimation from './components/AluminumScrollAnimation'
import Homepage from './page/homepage'
// import MaterialsSection from './page/materialSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Homepage/>

    </>
  )
}

export default App
