import React, { useState, useEffect, useMemo, useContext, createContext } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as logout,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../firebase'
import toast from 'react-hot-toast'

interface AuthProviderProps {
  children: React.ReactNode
}

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  loading: false,
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(
    () =>
      // run and clear the function at the same time
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          setLoading(false)
        } else {
          setUser(null)
          setLoading(false)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }

  const signOut = async () => {
    setLoading(true)
    await logout(auth)
      .then(() => {
        router.push('/login')
        setUser(null)
        setLoading(false)
      })
      .catch((error) => toast.error(error.message))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      signUp,
      signIn,
      signOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
