import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { AuthContext } from '../context/authcontext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import React from "react"
export const Set = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [variant,setVariant] = useState(0)
    const getMethod = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/set/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setMethod([result])
            setVariant(2)
            setValue("criminal",result.criminal)
        }
        else
            setVariant(1)
    }
    const submitMethod = async (d) => {
        d.user_id=userId
        d.case_id=id
        let response = await fetch(`http://localhost:8000/algorithm/set`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getMethod()
    }
    const editMethod = async (d) =>{
        let response = await fetch(`http://localhost:8000/algorithm/set/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getMethod()
    }
    useEffect(() => {
        getMethod()
    }, [])
    const methodItem = methodInfo.map((method) => {
        return ( 
            <React.Fragment key={method.id_criminal}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Установление средства совершения преступления
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(3)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Средство совершения преступления</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.criminal}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    })
    if(variant==0)
        return (
            <Content>
                <h2>Загрузка...</h2>
            </Content>
        )
    else if (variant==1)
        return (
            <Content submit={handleSubmit(submitMethod)}>
                <h2>Установление средства совершения преступления</h2>
                <div className='maindiv'>
                    <div className="formdiv">
                        <label style={{marginRight:5}}>Мобильный телефон</label>
                        <input type="radio" className="radio" required {...register("criminal")}  value='Мобильный телефон'/>
                    </div>
                    <div className="formdiv">
                        <label style={{marginRight:5}}>SIP-телефония</label>
                        <input type="radio" className="radio" required {...register("criminal")}  value='SIP-телефония'/>
                    </div>
                    <div className="formdiv">
                        <label style={{marginRight:5}}>Компьютерные средства</label>
                        <input type="radio" className="radio" required {...register("criminal")} value='Компьютерные средства'/>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
            </Content>
        )
    else if (variant==2)
        return (
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        {methodItem}
                    </Table>
                </TableContainer> 
            </div>
        )
    else if (variant==3)
        return(
            <Content submit={handleSubmit(editMethod)}>
                <h2>Установление средства совершения преступления</h2>
                <div className='maindiv'>
                    <div className="formdiv">
                        <label style={{marginRight:5}}>Мобильный телефон</label>
                        <input type="radio" className="radio" required {...register("criminal")}  value='Мобильный телефон'/>
                    </div>
                    <div className="formdiv">
                        <label style={{marginRight:5}}>SIP-телефония</label>
                        <input type="radio" className="radio" required {...register("criminal")}  value='SIP-телефония'/>
                    </div>
                    <div className="formdiv">
                        <label style={{marginRight:5}}>Компьютерные средства</label>
                        <input type="radio" className="radio" required {...register("criminal")} value='Компьютерные средства'/>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(2)} type='button'>Отменить</Button>
            </Content>
        )
}