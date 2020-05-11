import React, { createContext } from 'react';
import * as firebase from 'firebase/app';

import firebaseConfig from '../config/firebase-config.json';

export const FirebaseContext = createContext(firebase);

export const FirebaseProvider = ({ children }) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
};
