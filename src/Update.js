import React from 'react';
import { useRef } from 'react';
import './App.css'
import {useHistory} from 'react-router-dom'
import {createDict, loadDict, loadDictFB, addDictFB, updateDic, updateDicFB} from "./redux/modules/dict"
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from "react-router";

const Update = (props) => {
    
    const location = useLocation();
    const propsdata = location.state.data
    console.log(propsdata);

    
    const dispatch= useDispatch();

    const wordRef= useRef(null)
    const soundRef= useRef(null)
    const meanRef= useRef(null)
    const examRef= useRef(null)
    const transRef= useRef(null)


const updic = () =>{
    const wordData = wordRef.current.value
    const soundData = soundRef.current.value
    const meanData = meanRef.current.value
    const examData = examRef.current.value
    const transData = transRef.current.value

    dispatch(updateDicFB(propsdata.id, {word : wordData, sound: soundData, mean:meanData, exam:examData, trans:transData, isCompleted:false}))
}

const history = useHistory();


    function goBack(){
        history.push(`/`)
    }


    return (
        <>
            <nav className='logo_box'>
                <h1 className='title'>
                    영어 단어장
                </h1>
            </nav>
            <div className='formbox'>
            <p>
                단어
            </p>
            <input ref={wordRef} defaultValue={propsdata.word} />
            <p>
                병음
            </p>
            <input ref={soundRef} defaultValue={propsdata.sound}/>
            <p>
                의미
            </p>
            <input ref={meanRef} defaultValue={propsdata.mean}/>
            <p>
                예문
            </p>
            <input ref={examRef} defaultValue={propsdata.exam}/>
            <p>
                해석
            </p>
            <input ref={transRef} defaultValue={propsdata.trans} />
            <button onClick={()=>{ updic(); goBack();}}>수정하기</button>
        </div>           
        </>

    );
};

export default Update;