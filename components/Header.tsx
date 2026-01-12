import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <header className='absolute top-0 p-4 w-full flex items-center justify-between'>
        <Image src="/github-creature-logo.png" alt="Logo" width={50} height={50} />

        <ModeToggle />
    </header>
  )
}

export default Header