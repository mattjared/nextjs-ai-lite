import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconVercel, IconNextChat, IconSeparator } from './ui/icons'
import EnvCard from "@/components/envcard";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-white ">
      <EnvCard /> 
      <Link href="/" rel="nofollow" className="mr-5">
        Next.js AI Chatbot Lite
      </Link>
      <IconSeparator className='hidden md:flex' />
      <Link
        href="/about"
        className={cn(buttonVariants({ variant: 'link' }), "mr-auto")}
      >
        <span className="hidden md:flex">About</span>
      </Link>
      <Link
        href="https://vercel.com/new"
        target="_blank"
        className={cn(buttonVariants())}
      >
        <IconVercel className="mr-2" />
        <span className="hidden sm:block">Deploy to Vercel</span>
        <span className="sm:hidden">Deploy</span>
      </Link>
    </header>
  )
}
