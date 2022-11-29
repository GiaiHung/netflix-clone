import { DocumentData } from 'firebase/firestore'
import {atom} from 'recoil'

export const modalAtom = atom({
  key: 'modal', 
  default: false, 
})

export const movieAtom = atom<Movie | DocumentData | null>({
  key: 'movie',
  default: null
})