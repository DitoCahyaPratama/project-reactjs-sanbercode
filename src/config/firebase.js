import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDsRFcPNUWk9_kiPHzKfaOUsvqUSxdgR-8",
    authDomain: "noted-da26e.firebaseapp.com",
    databaseURL: "https://noted-da26e.firebaseio.com",
    projectId: "noted-da26e",
    storageBucket: "noted-da26e.appspot.com",
    messagingSenderId: "576290653596",
    appId: "1:576290653596:web:1039910c6f2f1f888d3459",
    measurementId: "G-5CD4166EFM"
  };
  
firebase.initializeApp(firebaseConfig)

export default firebase