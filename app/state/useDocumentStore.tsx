import { create } from "zustand";

export interface FirestoreDocument {
    value: string
}

interface DocumentStore {
    documents: FirestoreDocument[],
    setDocuments(documents: FirestoreDocument[]): void,
    addDocument(document: FirestoreDocument): void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
    documents: [],
    setDocuments: (documents) => set({documents: documents}),
    addDocument: (document) => set((state) => ({ documents: [...state.documents, document] }))
}))