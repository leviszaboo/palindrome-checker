import { useDocumentStore } from '@/app/state/useDocumentStore'
import React from 'react'

export default function PalindromeList() {
  const {documents} = useDocumentStore()
  return (
    <>
    <h1 className="p-4 font-bold text-2xl">Enter a word or sentence to check if it's a palindrome:</h1>
    <div className="flex flex-col gap-4 p-4 items-center align-center w-50">
    {documents.map((document) => (
      <h3>
        {document.value}
      </h3>
    ))}
    </div>
    </>
  )
}
