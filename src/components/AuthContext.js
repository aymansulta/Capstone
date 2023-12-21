import React, { createContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const authContextValue = {
    user,
    signUp,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };