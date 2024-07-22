import { Navigate, useNavigate, useParams,useLocation} from "react-router-dom"
import Content from "../components/content"
import Header from "../components/header"
import Menu from "../components/menu"
import { useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import { useState } from "react"
import { Outlet } from "react-router-dom"
const Case = () => {
    const {id} = useParams()
    const {userRole,userId} = useContext(AuthContext)
    const [algorithm,setAlgorithm] = useState()
    const [menuItem,setMenuItem] = useState([{id:1,text:'Загрузка'}])
    const algorithmName = useLocation().pathname.slice(7+id.length)
    var algorithmId
    const navigate = useNavigate()
    const getCase = async() =>{
        const response = await fetch(`http://localhost:8000/api/case/${id}`)
        const result = await response.json()
        if (response.ok==false)
            return navigate(`/case/${id}/main`)
        else
        {
            if (result.fk_user_id != userId && (userRole==2||userRole==3))
                return navigate(`/case/${id}/main`)
            algorithmId = result.fk_algoritm_id
            getAlgoritm()
            getMenuItems()
        }
    }
    const getAlgoritm = async() =>{
        const response = await fetch(`http://localhost:8000/api/algoritms/${algorithmId}/${algorithmName}`)
        const result = await response.json()
        if (response.ok==false)
            return navigate(`/case/${id}/main`)
        else
        {
            setAlgorithm(result)
        }
    }
    const getMenuItems = async() =>{
        const response = await fetch(`http://localhost:8000/api/algorithm/menuitems/${id}`)
        const result = await response.json()
        if (response.ok==false)
            return navigate(`/case/${id}/main`)
        else
        {
            setMenuItem(result)
        }
    }
    useEffect(() => {
        getCase()
    }, [])
    if (algorithm == undefined || menuItem == undefined)
        return (
            <>
                <Header text="Загрузка"></Header>
                <div className="form">
                    <h2>Загрузка</h2>
                </div>
            </>
        )
    else
        return (
            <>
                <Header text={algorithm === undefined?"Загрузка":algorithm}/>
                <Menu items={menuItem}  disb={true}></Menu>
                <Outlet/>
            </>
        )
}

export default Case