import { auth, storage } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useFirebase } from './FirebaseContext';


const Store = () => {

  const db = useFirebase();
  const [foodList, setFoodList] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodReleaseDate, setFoodReleaseDate] = useState("");
  const [isDessert, setIsDessert] = useState(false);
  const [foodPrice, setFoodPrice] = useState(0);

  // const [clearFormFlag, setClearFormFlag] = useState(false);

  const [updateTitleName, setUpdateTitleName] = useState("");
  const [updateFoodPrice, setUpdateFoodPrice] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const foodsCollectionRef = collection(db, "Food");


  useEffect(() => {
    const unsubscribe = onSnapshot(foodsCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFoodList(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getFoodList = async () => {
    try {
      if (auth.currentUser) {
        const data = await getDocs(foodsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
        }));
        // console.log(filteredData);
        setFoodList(filteredData);
      } else {
        // {loggedIn ? null : <h3>Please login first</h3>}
      }
    }catch (err) {
      console.error(err);
    }
  }


  const deleteFood = async (id, e) => {
    try {
      e.preventDefault();
      const foodDoc = doc(db, "Food", id)
      await deleteDoc(foodDoc);
      getFoodList();
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  }

  const updateFood = async (id, e) => {
    try {
      e.preventDefault();
      const foodDoc = doc(db, "Food", id)
      await updateDoc(foodDoc, {title: updateTitleName});
      getFoodList();
    } catch (err) {
      console.error("Error updating food:", err);
    }
  }

  const updatePrice = async (id, e) => {
    try {
      e.preventDefault();
      const foodDoc = doc(db, "Food", id)
      await updateDoc(foodDoc, {price: updateFoodPrice});
      getFoodList();
    } catch (err) {
      console.error("Error updating food:", err);
    }
  }

  useEffect(() => {
    getFoodList();
  }, []);

  // useEffect(() => {
  //   console.log('Food name:', foodName, 'Release Date:', foodReleaseDate, 'Price:', foodPrice);
  // }, [foodName, foodReleaseDate, isDessert, foodPrice]);

  // useEffect(() => {
  //   if (clearFormFlag) {
  //     console.log("Clearing form...");
  //     setFoodName("");
  //     setFoodReleaseDate("");
  //     setIsDessert(false);
  //     setFoodPrice(0);
  //     setTimeout(() => {
  //       console.log("Form cleared:", { foodName, foodReleaseDate, isDessert, foodPrice });
  //     }, 0);
  //     setClearFormFlag(false); // Reset the flag
  //   }
  // }, [clearFormFlag]);

  const onSubmitFood = async (e) => {
    e.preventDefault();
    try {
      await addDoc (foodsCollectionRef, {
        title: foodName,
        releaseDate: foodReleaseDate,
        isDessert: isDessert,
        price: foodPrice,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
    // alert("Food created!");
    // console.log("Food name: ", foodName, "Release Date: ", foodReleaseDate, "Price: ", foodPrice)
    clearForm();
    // setClearFormFlag(true);
    getFoodList();
    // console.log("Food name: ", foodName, "Release Date: ", foodReleaseDate, "Price: ", foodPrice)
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      setFileUpload(null);
    }catch (err) {
      console.error(err);
    }
  }

  const allowSubmit = () => {
    return (
      foodName &&
      foodReleaseDate &&
      foodPrice
    )
  }

  const clearForm = () => {
    console.log("Clearing form...");
    setFoodName("");
    setFoodReleaseDate("");
    setIsDessert(false);
    setFoodPrice(0)
    // console.log("Form cleared:", { foodName, foodReleaseDate, isDessert, foodPrice });
  }

  return (
    <>
      <div>
        {auth.currentUser? (
        <div>
          <form onSubmit={onSubmitFood}/* key={foodName + foodReleaseDate + isDessert + foodPrice} */>
            <fieldset>
              <div className="loginInput">
                <div>
                  <label htmlFor="foodName">Enter Food Name</label>
                  <input id="foodName" value={foodName} placeholder='Food name...' type='text' onChange={(e) => setFoodName(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="releaseDate">Enter the Date</label>
                  <input id="releaseDate" value={foodReleaseDate} placeholder='Release date...' type='date' onChange={(e) => setFoodReleaseDate(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="foodprice">Enter the Price</label>
                  <input id="foodprice" value={foodPrice} placeholder='Price...' type='number' onChange={(e) => setFoodPrice(Number(e.target.value))}/>
                </div>
                <div>
                  <label>Is food desserts?</label>
                  <input value={false} type='checkbox' checked={isDessert} onChange={(e) => setIsDessert(e.target.checked)}/>
                </div>
              </div>
              <div className="loginBtn">
                <button aria-label="on Click" className="loginBtns" /* onClick={onSubmitFood} */ disabled={!allowSubmit()} type="submit">Submit food</button>
              </div>
            </fieldset>
          </form>
          <form>
            <fieldset>
              <div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Dessert</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    {foodList.map((foo) => (
                    <tbody>
                      <tr>
                        <td>{foo.title}</td>
                        <td>{foo.releaseDate}</td>
                        <td>{foo.isDessert? "Yes" : "No"}</td>
                        <td>{foo.price}</td>
                      </tr>
                    </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </fieldset>
          </form>
          <div>
              {foodList.map((foo) => (
                <form key={foo.id}>
                  <fieldset>
                    <div className="storeList">
                      <div className="storeList1">
                        <h4 className="titleList" style={{color: foo.isDessert ? "red" : "green"}}>Title: {foo.title}</h4>
                        <h4>Release Date: {foo.releaseDate}</h4>
                        <h4 className="tpriceList">Price: ${foo.price}</h4>
                        <button className="listBtns" onClick={(e) => deleteFood(foo.id, e)}>Delete</button>
                      </div>
                      <div className="storeList2">
                        <label htmlFor="updateFood">Enter updated name: </label>
                        <input placeholder='update food title....' type='tex' onChange={(e) => setUpdateTitleName(e.target.value)}/>
                        <button className="listBtns" onClick={(e) => updateFood(foo.id, e)}>Update Title</button>
                      </div>
                      <div className="storeList2">
                        <label htmlFor="updateFood">Enter updated price: </label>
                        <input placeholder='update food price....' type='number' onChange={(e) => setUpdateFoodPrice(Number(e.target.value))}/>
                        <button className="listBtns" onClick={(e) => updatePrice(foo.id, e)}>Update Price</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              ))}
          </div>
          <div>
            <form>
              <fieldset>
                <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
                <button onClick={uploadFile}>Upload File</button>
              </fieldset>
            </form>
          </div>
        </div>
          ) : (
            <h2 className="alert">Please login first!</h2>
          )}
      </div>
    </>
  )
}

export default Store;