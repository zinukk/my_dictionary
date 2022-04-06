//dict.js
import {db} from "../../firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import { async } from "@firebase/util";

// Actions
const LOAD = 'dict/LOAD';
const CREATE = 'dict/CREATE';
const UPDATE = 'dict/UPDATE';
const DELETE = 'dict/DELETE';
const COMPLETE = 'dict/COMPLETE'
const CHANGE = 'dict/CHANGE'


const initialState = {list: []};

// Reducer
export default function reducer(state = initialState, action = {}) {
switch (action.type) {
    case "dict/LOAD":{
        return {list: action.dict_list}
    }
    case "dict/CREATE":{
        const newData = [action.dictData, ...state.list]
        console.log(newData);
        return {list : newData} ; 
    }
    // case "dict/COMPLETE":{
    //     const newData = {list : [...state.list, action.isCompleted, action._idx]}

    //     return newData
    // }
    case 'dict/DELETE':{
        console.log(state, action);
        const newData = state.list.filter((l, idx) => {
            
            return action.dict_index !== idx
        })
        
        return {list : newData}
    }
    case 'dict/UPDATE':{
        console.log(state.list);
        const newData = state.list.map((cur,idx) =>{
            if(cur.id === action.updatedId){
                return {id:action.updatedId, ...cur, ...action.updatedData}
            }else{
                return cur
            }
        })

        return {list : newData}
    }
    case 'dict/CHANGE':{
        console.log(action.selectedId, action.changedData,state.list);
        const newData = state.list.map((cur,idx) => {
            if(cur.id == action.selectedId){
                return {id: action.selectedId, ...cur, ...action.changedData }
            }else{
                return cur
            }
        })

        return {list : newData}
    }
default: return state;
}
}


// Action Creators
export function loadDict(dict_list) {

return { type: LOAD, dict_list };
}

export function createDict(dictData) {
return { type: CREATE, dictData };
}

export function completeDict(isCompleted, _idx) {
    console.log(isCompleted, _idx);
    return { type: COMPLETE, isCompleted, _idx };
    }

export function deleteDict(dict_index) {
    console.log("지울 단어 인덱스", dict_index);
return { type: DELETE, dict_index };
    }

export function updateDic(updatedId, updatedData){
    return {type:UPDATE, updatedId, updatedData}
}

export function changeDic(selectedId, changedData) {
    return{type:CHANGE, selectedId, changedData}
}

//midelwares
export const loadDictFB = () => {
    return async function(dispatch){
    const dict_data = await getDocs(collection(db, "sparta-week2"));
    console.log(dict_data);

    let dict_list = [];

    dict_data.forEach((b)=>{
        
        dict_list.push({id: b.id, ...b.data()});
    });
    console.log(dict_list);

    dispatch(loadDict(dict_list))
    }
}

export const addDictFB = (dicts) => {
    return async function(dispatch){
       const docRef = await addDoc(collection(db, "sparta-week2"), dicts)
       const _dict = await getDoc(docRef)
       
       const dict = {id: _dict.id, ..._dict.data()}
       console.log((await getDoc(docRef)).data());
   
       console.log(_dict.data());
   
       dispatch(createDict(dict))
    }
   }

export const deleteDictFB = (dict_id) =>{
    return async function (dispatch, getState) {

        const docRef = doc(db, 'sparta-week2', dict_id);
        await deleteDoc(docRef);

        console.log(getState().dict.list);
        const _dict_list = getState().dict.list;
        const dict_index = _dict_list.findIndex((b)=>{
            return b.id === dict_id
        })
        

        dispatch(deleteDict(dict_index))
    }
}

export const updateDicFB = (updatedId, updatedData) =>{
    console.log(updatedData);
    return async function (dispatch) {

        const docRef = doc(db,'sparta-week2', updatedId)
        await updateDoc(docRef, updatedData)
        dispatch(updateDic(updatedId, updatedData))
    }
}

export const changeDicFB = (selectedId, iscomData) =>{
    return async function (dispatch) {
        if(iscomData == false){
        const docRef = doc(db,'sparta-week2', selectedId)
        await updateDoc(docRef, {isCompleted : true})
        dispatch(changeDic(selectedId, {isCompleted : true}))
    }else{
        const docRef = doc(db,'sparta-week2', selectedId)
        await updateDoc(docRef, {isCompleted : false})
        dispatch(changeDic(selectedId, {isCompleted : false}))
    }
  }   
}
