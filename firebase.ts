import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCBCPatoovPW2fss3UGSQrqWyzEmn6Qny8',
  authDomain: 'netflix-clone-4c811.firebaseapp.com',
  projectId: 'netflix-clone-4c811',
  storageBucket: 'netflix-clone-4c811.appspot.com',
  messagingSenderId: '510655874463',
  appId: '1:510655874463:web:bb904aadd05613cdab69aa',
}

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
export default app
