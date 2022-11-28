/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'
import Link from 'next/link'
import useAuth from '../../hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="flex items-center space-x-4 md:space-x-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
          alt="logo"
          className="w-[100px] cursor-pointer object-contain"
        />

        <ul className="hidden space-x-3 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">Documentaries</li>
          <li className="headerLink">For you</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <div className="headerIcon">
          <AiOutlineSearch />
        </div>
        <p className="hidden text-lg font-semibold md:inline">Kids</p>
        <div className="headerIcon">
          <AiOutlineBell />
        </div>
        {/* <Link href="/account"> */}
        <img src="/account.png" alt="" className="cursor-pointer rounded-md" onClick={signOut} />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
