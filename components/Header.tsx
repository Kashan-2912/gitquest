import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='absolute top-0 p-4 w-full flex items-center justify-between'>
        <Image src="/github-creature-logo.png" alt="Logo" width={50} height={50} />

        <div className='flex items-center gap-2'>something</div>
    </header>
  )
}

export default Header