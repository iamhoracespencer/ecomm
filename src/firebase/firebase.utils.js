import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDKIaAkgC503ww1fhem3zxlRXbl02hyztw',
  authDomain: 'ecom-db-bd0d9.firebaseapp.com',
  projectId: 'ecom-db-bd0d9',
  storageBucket: 'ecom-db-bd0d9.appspot.com',
  messagingSenderId: '828734520900',
  appId: '1:828734520900:web:6c4c1bc57ae00da3374611',
  measurementId: 'G-EYV6WGQRSZ',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  //if user (document) does not exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} else {
  firebase.app() // if already initialized, use that one
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

//authentication util
const provider = new firebase.auth.GoogleAuthProvider()
//popups google authentication when selecting google
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
