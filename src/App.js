import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { db, auth, storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [foodList, setFoodList] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [foodReleaseDate, setFoodReleaseDate] = useState(0);
  const [isDessert, setIsDessert] = useState(false);

  const [updateTitleName, setUpdateTitleName] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const foodsCollectionRef = collection(db, "Food");

  const getFoodList = async () => {
    try {
      const data = await getDocs(foodsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(filteredData);
      setFoodList(filteredData);
    }catch (err) {
      console.error(err);
    }
  }

  const deleteFood = async (id) => {
    const foodDoc = doc(db, "Food", id)
    await deleteDoc(foodDoc);
    getFoodList();
  }

  const updateFood = async (id) => {
    const foodDoc = doc(db, "Food", id)
    await updateDoc(foodDoc, {title: updateTitleName});
    getFoodList();
  }

  useEffect(() => {
    getFoodList();
  }, []);

  const onSubmitFood = async () => {
    try {
      await addDoc (foodsCollectionRef, {
        title: foodName,
        releaseDate: foodReleaseDate,
        isDessert: isDessert,
        userId: auth?.currentUser?.uid,
      });
      getFoodList();
    } catch (err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    }catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <Nav />
      <Main />
      <div>
        <input placeholder='Food name...' type='text' onChange={(e) => setFoodName(e.target.value)}/>
        <input placeholder='Release date...' type='number' onChange={(e) => setFoodReleaseDate(Number(e.target.value))}/>
        <label>Is food desserts?</label>
        <input value={false} type='checkbox' checked={isDessert} onChange={(e) => setIsDessert(e.target.checked)}/>
        <button onClick={onSubmitFood}>Submit food</button>
      </div>
      <div>
        {foodList.map((foo) => (
          <div>
            <h1 style={{color: foo.isDessert ? "red" : "green"}}>Title: {foo.title}</h1>
            <p>Release Date: {foo.releaseDate}</p>
            <button onClick={() => deleteFood(foo.id)}>Delete</button>
            <input placeholder='update food title....' type='tex' onChange={(e) => setUpdateTitleName(e.target.value)}/>
            <button onClick={() => updateFood(foo.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
      <button onClick={uploadFile}>Upload File</button>
      <Menu />
      <Footer />
    </>
  );
}

export default App;
