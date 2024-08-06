import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'


export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0">
      <Link
        target="_blank"
        href="https://github.com/mattjared/nextjs-ai-lite/"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        <span className="hidden ml-2 md:flex">GitHub</span>
      </Link>
      <Link
        href="https://vercel.com/new"
        target="_blank"
        className={cn(buttonVariants())}
      >
        <span className="hidden sm:block">Deploy to Vercel</span>
        <span className="sm:hidden">Deploy</span>
      </Link>
    </header>
  )
}
