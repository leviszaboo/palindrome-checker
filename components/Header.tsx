import { PawPrint } from 'lucide-react'
import React from 'react'

export default function Header() {
  return (
    <header className="flex mx-6 my-4">
      <div className="mr-auto">
        <PawPrint size={42}/>
      </div>
    </header>
  )
}
