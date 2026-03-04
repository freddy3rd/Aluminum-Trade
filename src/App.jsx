import { useState } from 'react'
import './App.css'
import Homepage from './page/homepage'
import { updateMetaTags } from './utils/seoMetaTags'
import Route from './Route'

function App() {
  const [count, setCount] = useState(0)

  // Initialize default meta tags on app load
  const handleAppLoad = () => {
    updateMetaTags({
      title: 'Aluminum Trade | Premium Architectural Aluminum Systems',
      description: 'Discover innovative aluminum architectural systems that bridge design and functionality. Premium solutions for modern construction and design projects.',
      image: 'https://aluminumtrade.com/og-image.jpg',
      url: 'https://aluminumtrade.com/',
    })
  }

  return (
    <>
      <Route onLoad={handleAppLoad} />
    </>
  )
}

export default App
