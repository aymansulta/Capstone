import React, { createContext, useContext } from "react";
import { db } from '../config/firebase';


const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={db}>
            {children}
        </FirebaseContext.Provider>
    )
}