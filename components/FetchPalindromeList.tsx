"use client"

import { db } from '@/app/firebase/config';
import { FirestoreDocument, useDocumentStore } from '@/app/state/useDocumentStore';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'

export default function FetchPalindromeList() {
  const [error, setError] = useState<string>("")
  const { documents, addDocument } = useDocumentStore()

  async function fetchDocs(ref: string) {
    try {
      const querySnapshot = await getDocs(query(collection(db, ref)));
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => { 
        const data = doc.data() as FirestoreDocument
        console.log(data)
        addDocument(data);
      })
    } catch(err: any) {
      setError("Could not fetch documents.")
    }
  }

  useEffect(() => {
    fetchDocs("entries");
  }, [])

  return (
    <>
    <h1 className="p-4 font-bold text-2xl">Palindromes found:</h1>
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