import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Add your firebase web client configuration here.
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}

const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)
const auth = getAuth(app)
const firestore = getFirestore(app)

export { analytics, auth, firestore }
