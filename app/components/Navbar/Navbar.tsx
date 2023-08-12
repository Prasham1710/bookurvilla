import Container from '@/app/Container'
import React from 'react'
import Logo from './Logo'
const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className=' py-4
        border-b-[1-px]'>
            <Container>
                <div
                className='
                flex 
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0'>
                </div>
                <Logo />
            </Container>
        </div>
    </div>
  )
}

export default Navbar