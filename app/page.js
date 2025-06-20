'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

const images = [
  '/1.PNG',
  '/2.PNG',
  '/3.PNG',
  '/4.PNG',
  '/5.PNG',
  '/6.PNG'
]

const contents = [
  {
    title: 'BBQ Chicken',
    description: 'Savor the bold, smoky flavors of perfectly grilled BBQ chicken—juicy, tender, and coated in our signature, finger-licking sauce. A mouthwatering delight for every bite, made to satisfy your cravings and fire up your taste buds!'
  },
  {
    title: 'Margherita Pizza',
    description: 'A timeless classic with a crispy crust, rich tomato sauce, creamy mozzarella, and fresh basil. Simple, elegant, and bursting with authentic Italian flavor in every slice!'
  },
  {
    title: 'Fresh Garden Salad',
    description: 'A vibrant mix of crisp lettuce, juicy tomatoes, crunchy cucumbers, and colorful veggies, tossed in a light, zesty dressing. Refreshing, healthy, and full of natural goodness!'
  },
  {
    title: 'Pumpkin Soup',
    description: 'Creamy, comforting, and full of warmth—our pumpkin soup is a velvety blend of roasted pumpkin, aromatic herbs, and a touch of spice. A cozy bowl of autumn in every sip!'
  },
  {
    title: 'Sheet Pan Salmon',
    description: 'Perfectly roasted salmon fillets with a medley of seasoned vegetables—all cooked on one pan for maximum flavor and minimal cleanup. Healthy, hearty, and effortlessly delicious!'
  },
  {
    title: 'Tandoori Chicken',
    description: 'Succulent chicken marinated in a blend of yogurt and bold Indian spices, then roasted to perfection in a traditional tandoor style. Smoky, spicy, and irresistibly flavorful!'
  }
]

export default function Page() {
  const [active, setActive] = useState(0)
  const [rotation, setRotation] = useState(0)
  const countItem = images.length
  const rotateAdd = 360 / countItem

  const nextSlider = useCallback(() => {
    setActive((prev) => (prev + 1) % countItem)
    setRotation((prev) => prev + rotateAdd)
  }, [countItem, rotateAdd])

  const prevSlider = () => {
    setActive((prev) => (prev - 1 + countItem) % countItem)
    setRotation((prev) => prev - rotateAdd)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlider()
    }, 3500)
    return () => clearInterval(interval)
  }, [nextSlider])

  return (
    <div className="relative w-full h-screen overflow-hidden font-mono bg-gradient-to-r from-[#2B2F3A] to-[#0D0E12]">
      <header className="absolute w-full z-50 border-b border-white/25">
        <ul className="flex flex-wrap justify-center items-center list-none text-sm sm:text-base">
          <li className="px-6 sm:px-10 py-6 text-white hover:border-b-2 border-white cursor-pointer">Home</li>
          <li className="px-6 sm:px-10 py-6 text-white hover:border-b-2 border-white cursor-pointer">About</li>
          <li className="px-6 sm:px-10 py-6 text-white hover:border-b-2 border-white cursor-pointer">Menu</li>
          <li className="px-6 sm:px-10 py-6 text-white hover:border-b-2 border-white cursor-pointer">Gallery</li>
        </ul>
      </header>

      <div className="absolute top-0 left-0 w-1/2 h-full bg-[#E88735] z-0" />

      <h1 className="absolute top-[13%] right-[60%] w-[40%] text-[40px] sm:text-[60px] md:text-[80px] lg:text-[110px] text-center text-white font-[Pacifico] leading-none rotate-[-10deg] drop-shadow-[3px_5px_0px_#478860] z-10">
        Let&apos;s<br />Taste!
      </h1>

      <div
        className="absolute bottom-0 left-1/2 w-[500px] sm:w-[600px] md:w-[800px] lg:w-[1000px] h-[500px] sm:h-[600px] md:h-[800px] lg:h-[1000px] rounded-full outline outline-dashed outline-white/30 outline-offset-[-80px] transition-transform duration-700 ease-out"
        style={{ transform: `translate(-50%, 60%) rotate(${rotation}deg)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute w-full h-full text-center"
            style={{ rotate: `${rotateAdd * i}deg` }}
          >
            <Image
              src={src}
              alt={`img-${i}`}
              width={300}
              height={420}
              style={{ height: 'auto' }}
              className="mx-auto w-[150px] sm:w-[200px] md:w-[240px] lg:w-[300px]"
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute top-[20%] left-[60%] sm:left-[65%] md:left-[70%] w-[280px] sm:w-[320px] md:w-[350px] text-white z-20">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-[#E88735] animate-fade-in">{contents[active].title}</h1>
        <p className="mt-2 text-justify text-xs sm:text-sm animate-fade-in delay-300">{contents[active].description}</p>
        <button className="mt-3 px-6 py-2 bg-[#E88735] rounded-full float-left animate-fade-in delay-500 cursor-pointer text-sm">
          Explore
        </button>
      </div>

      <button
        onClick={prevSlider}
        className="absolute top-1/2 left-[50px] sm:left-[150px] md:left-[250px] text-white font-bold text-[50px] sm:text-[70px] md:text-[100px] font-[cursive] bg-transparent opacity-30 hover:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlider}
        className="absolute top-1/2 right-[50px] sm:right-[150px] md:right-[250px] cursor-pointer text-white font-bold text-[50px] sm:text-[70px] md:text-[100px] font-[cursive] bg-transparent opacity-30 hover:opacity-100"
        aria-label="Next Slide"
      >
        ›
      </button>
    </div>
  )
}
