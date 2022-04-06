import Main from './Main';
import React from 'react';
import Detail from './Detail';
import {Route} from 'react-router-dom'
import {db} from './firebase'
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import {createDict, loadDictFB} from './redux/modules/dict'
import Update from './Update';


function App() {

  const dispatch = useDispatch()

  React.useEffect(async()=>{

      dispatch(loadDictFB())


      
      //삭제
      // const docRef = doc(db, "sparta-week2", "Sd0oyOzJyh8SXkT0notR")
      // deleteDoc(docRef);


      //수정
      // const docRef = doc(db, "sparta-week2", "gDHgDDXVdjZeSdBVwYcg")
      // updateDoc(docRef, {completed: true})


      //추가
      // addDoc(collection(db, "sparta-week2"), {text: 'new', completed : 'false'})
      
      //불러오기
      // const query = await getDocs(collection(db, "sparta-week2"))
      // console.log(query);
      // query.forEach((doc)=>{
      //   console.log(doc.id, doc.data());
      // });
      
  }, []);
  
  return (
    <div className="App">
      <Route path='/' exact component={Main} />
      <Route path='/Detail' component={Detail} />
      <Route path='/Update' component={Update}/>
    </div>
  );
}

export default App;
