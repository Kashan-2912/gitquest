import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <header className='absolute top-0 p-4 w-full flex items-center justify-between'>
        <Link href="/"><Image src="/github-creature-logo.png" alt="Logo" width={50} height={50} /></Link>

        <ModeToggle />
    </header>
  )
}

export default Header