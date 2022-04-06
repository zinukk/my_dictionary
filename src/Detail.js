import React, { useRef } from 'react';
import './App.css'
import {useHistory} from 'react-router-dom'
import {createDict, loadDict, loadDictFB, addDictFB} from "./redux/modules/dict"
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';



const Detail = (props) => {

const dispatch= useDispatch();

const wordRef= useRef(null)
const soundRef= useRef(null)
const meanRef= useRef(null)
const examRef= useRef(null)
const transRef= useRef(null)


const addDictData = () =>{
    const wordData = wordRef.current.value
    const soundData = soundRef.current.value
    const meanData = meanRef.current.value
    const examData = examRef.current.value
    const transData = transRef.current.value

    dispatch(addDictFB({word : wordData, sound : soundData, mean : meanData, exam : examData, trans : transData, isCompleted : false}))
    
}

const history = useHistory();

function goBack(){
    history.push(`/`)
}


    return (
        <>
        <nav className='logo_box'>
            <h1 className='title'>
                중국어 단어장
            </h1>
        </nav>
        <div className='formbox'>
            <p>
                단어
            </p>
            <input ref={wordRef} />
            <p>
                병음
            </p>
            <input ref={soundRef} />
            <p>
                의미
            </p>
            <input ref={meanRef} />
            <p>
                예문
            </p>
            <input ref={examRef} />
            <p>
                해석
            </p>
            <input ref={transRef}/>
            <button onClick={()=>{addDictData(); goBack();}}>저장하기</button>
        </div>
        </>
    )
}
   
   export default Detail