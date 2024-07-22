import Content from "../components/content"
import Header from "../components/header"
import Menu from "../components/menu"
import { BossProfileItems, ProfileItems } from "../components/menuitems"
import { AdminProfileItems } from "../components/menuitems"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/authcontext"
import React from "react"
import { Box } from '@mui/system'
import { Divider } from "@mui/material"
import profile_image from '../img/profile2.png'
const Profile = () => {
    const {userRole,userId} = useContext(AuthContext)
    const [userInfo,setUserInfo] = useState([])
    const getUser = async () => {
        const response = await fetch(`http://localhost:8000/api/user/${userId}`)
        const user = await response.json()
        setUserInfo([user])
    }
    useEffect(() => {
        getUser()
        
    }, [])
    
    const userItem = userInfo.map((user) => {
        return ( 
            <React.Fragment key={user.email}>
                    <div style={{display:'block',borderBottom:'solid #808080'}}>
                        <b style={{fontSize:"28px"}}>{user.firstname} {user.middlename} {user.lastname}</b>
                    </div>
                    <img src={profile_image} width='25%' style={{marginTop:'5px',display:'inline-block', float:'left'}}/>
                    <div style={{display:"inline-block",marginTop:'5%',paddingLeft:'2%',fontSize:'22px'}}>
                        <b>Пол: {user.sex}</b><br/>
                        <b>Дата рождения: {user.datebirthday.slice(-2)}.{user.datebirthday.slice(-5,-3)}.{user.datebirthday.slice(0,4)}</b><br/>
                        <b>Почта: {user.email}</b><br/>
                        <b>Телефон: +7{user.phone}</b>
                    </div>
            </React.Fragment>
        )
    })
    
    if (userRole==2)
    return (
        <>
            <Header text={"Профиль"}></Header>
            <Menu items={ProfileItems}></Menu>
            <Content>
                <div className="maindiv">
                    <Box sx={{display:'inline-block',marginLeft:'1%',textAlign:"left",verticalAlign:"middle"}}>
                       {userItem} 
                    </Box>
                </div>
            </Content>
        </>
    )
    else if (userRole == 1)
    return (
        <>
            <Header text={"Профиль"}></Header>
            <Menu items={AdminProfileItems}></Menu>
            <Content>
                <div className="maindiv">
                    <Box sx={{display:'inline-block',marginLeft:'1%',textAlign:"left",verticalAlign:"middle"}}>
                       {userItem} 
                    </Box>
                </div>
            </Content>
        </>
    )
    else if (userRole == 4)
    return (
        <>
            <Header text={"Профиль"}></Header>
            <Menu items={BossProfileItems}></Menu>
            <Content>
                <div className="maindiv">
                    <Box sx={{display:'inline-block',marginLeft:'1%',textAlign:"left",verticalAlign:"middle"}}>
                       {userItem} 
                    </Box>
                </div>
            </Content>
        </>
    )
}

export default Profile