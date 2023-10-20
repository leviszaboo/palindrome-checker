"use client"

import { ChangeEvent, useState } from "react"
import { Input } from "./ui/input";
import { checkIfPalindrome } from "@/app/helpers/checkIfPalindrome";
import { Button } from "./ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { FirestoreDocument, useDocumentStore } from "@/app/state/useDocumentStore";

export default function PalindromeChecker() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [inputString, setInputString] = useState<string>("");
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null)

  const { addDocument } = useDocumentStore()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setInputString(event.target.value)
  }

  async function handleClick() {
    setLoading(true);
    setError(null);
    if (checkIfPalindrome(inputString)) {
      setIsPalindrome(true);
      
      try {
        if (inputString.length >= 3) {
          const documentId = Date.now()
          const document: FirestoreDocument = {
            value: inputString
          }
          await setDoc(doc(db, `entries/${documentId}`), document);
          console.log("doc set")
          addDocument(document)
        } else {
          setError("Input must be at least 3 characters long.")
        }

      } catch(err: any) {
        console.log("error")
        setError("Something went wrong.")
        setLoading(false)
      }
    } else {
      console.log("false")
      setIsPalindrome(false);
    }
    setLoading(false);
  }
  return (
    <>
    <h1 className="p-4 font-bold text-2xl">Enter a word or sentence to check if it&apos;s a palindrome:</h1>
    <div className="flex flex-col gap-4 p-4 items-center align-center w-50">
      {error && <h5 className="text-red">{error}</h5>}
      <Input className={error ? "border-black" : "border-red"} type="text" onChange={handleChange} />
      {isPalindrome === true && <h5 className="text-green-500">{inputString} is a palindrome!</h5>}
      {isPalindrome === false && <h5 className="text-red-500">{inputString} is a not palindrome.</h5>}
      <Button onClick={handleClick}>
        {!loading ? "Check Palindrome" : "Loading..."}
      </Button>
    </div>
    </>
  )
}
