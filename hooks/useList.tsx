import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

function useList(uid: string | undefined, category: string) {
  const [list, setList] = useState<Movie[] | DocumentData[]>([])
  useEffect(() => {
    if (!uid) return

    return onSnapshot(collection(db, 'customers', uid, category), (snapshot) => {
      setList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    })
  }, [uid, category])
  
  return list
}

export default useList
