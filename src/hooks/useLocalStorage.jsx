import React, {useState,useEffect} from 'react'

export const useLocalStorage = (key,defdata) =>{
    const [state,setState] = useState(()=>{
        const localData = localStorage.getItem(key);
        return localData||defdata
    })
    useEffect(() => {
        localStorage.setItem(key,state);
        
    },[key,state])
    return [state,setState]
}