"use client"

import Image from "next/image"

const Avatar = () => {
  return (
    <Image 
    src={'/images/placeholder.jpg'}
    alt="Avatar"
    className="rounded-full"
    height={40}
    width={40} />                                           
    
  )
}

export default Avatar