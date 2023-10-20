"use client"

import { db } from '@/app/firebase/config';
import { FirestoreDocument, useDocumentStore } from '@/app/state/useDocumentStore';
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, query, startAfter } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { Button } from './ui/button';

export default function PalindromeList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastpage] = useState<number | null>(null)
  const [lastItem, setLastItem] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);

  const { documents, addDocument } = useDocumentStore();

  const pageSize = 5;

  async function fetchDocs(ref: string) {
    setLoading(true);
    try {
      const queryRef = lastItem ? query(collection(db, ref), startAfter(lastItem), limit(pageSize)) : query(collection(db, ref), limit(pageSize));
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirestoreDocument;
        addDocument(data);
      });
  
      const last = querySnapshot.docs[querySnapshot.size - 1];
      setLastItem(last);
  
      const nextQueryRef = query(collection(db, ref), startAfter(last), limit(pageSize));
      const nextQuery = await getDocs(nextQueryRef);
  
      if (nextQuery.empty) {
        setLastpage(page);
      }
    } catch (err: any) {
      setError("Could not fetch documents.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (lastPage === null) {
      fetchDocs("entries");
    }
  }, [page, lastPage])

  return (
    <>
    <h1 className="p-6 pb-4 font-bold text-2xl">Palindromes found:</h1>
      <div className="flex flex-col gap-4 p-4 items-center align-center w-50">
        {error && <h3 className="text-red-500">{error}</h3>}
        {documents.length === 0 && !error && !loading && <h3>Nothing to display.</h3>}
        {documents.length !== 0 && (
          <>
            {documents.slice((page - 1) * pageSize, page * pageSize).map((document, index) => (
              <h3 className="text-xl" key={document.value + index.toString()}>
                {document.value}
              </h3>
            ))}
          </>
        )}
        <div className="lg:absolute lg:bottom-4 flex gap-4">
          <Button size={"sm"} onClick={() => setPage(page - 1)} disabled={page === 1 || loading || documents.length === 0}>{"<"}</Button>
          <Button size={"sm"} onClick={() => setPage(page + 1)} disabled={page === lastPage || loading || documents.length === 0}>{">"}</Button>
        </div>
      </div>
    </>
  )
}
