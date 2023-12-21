import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';
import { FirebaseProvider } from './components/FirebaseContext';

function App() {

  return (
    <AuthProvider>
      <FirebaseProvider>
        <Nav />
        <Main />
        <Menu />
        <Footer />
      </FirebaseProvider>
    </AuthProvider>
  );
}

export default App;
