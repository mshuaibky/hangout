
import {getApp,getApps,initializeApp}from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyANvQVQYTXR-zp1DUWdyb6emVnJwu-zFtQ",
    authDomain: "fir-new-63685.firebaseapp.com",
    projectId: "fir-new-63685",
    storageBucket: "fir-new-63685.appspot.com",
    messagingSenderId: "352118331767",
    appId: "1:352118331767:web:38d264c7b90f4ece3e6972",
    measurementId: "G-EDKHMDT4EV"
  };

  const  app=getApps.length>0?getApp():initializeApp(firebaseConfig)

  export {app}