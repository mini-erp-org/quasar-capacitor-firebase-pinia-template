import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { initializeAuth, browserLocalPersistence } from 'firebase/auth'
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
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
})
const firestore = getFirestore(app)

export { analytics, auth, firestore }
