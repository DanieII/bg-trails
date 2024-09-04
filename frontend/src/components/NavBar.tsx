import Logo from './icons/Logo'
import { Link, useLocation } from 'wouter'

export default function NavBar() {
  const [location, setLocation] = useLocation()
  const isIndexPage = location === '/'

  return (
    <nav
      className={`${
        isIndexPage
          ? 'absolute w-full h-36 !text-white bg-gradient-to-b from-black/80 to-transparent`'
          : 'text-black'
      }`}
    >
      <div className='container flex justify-between items-center'>
        <Link href='/'>
          <div className='flex items-center gap-1'>
            <div className='w-12 sm:w-16'>
              <Logo initialFill={isIndexPage ? 'white' : 'black'} />
            </div>
            <div className='flex-col justify-center hidden sm:flex'>
              <div className='text-xl font-extrabold leading-none'>
                Bulgaria
              </div>
              <div className='font-bold leading-none'>Trails</div>
            </div>
          </div>
        </Link>
        <div>
          <Link href='' className='font-bold'>
            Explore
          </Link>
        </div>
      </div>
    </nav>
  )
}
