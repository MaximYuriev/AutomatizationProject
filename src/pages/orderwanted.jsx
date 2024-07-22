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
export const Order = () =>{
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [variant,setVariant] = useState(0)
    const getMethod = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/order_wanted/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setMethod([result])
            setVariant(2)
            setValue("check_criminal",result.check_criminal)
            setValue("text_order_wanted",result.text_order_wanted)
            setValue("name_orders",result.name_orders)
        }
        else
            setVariant(1)
    }
    const submitMethod = async (d) => {
        d.user_id=userId
        d.case_id=id
        let response = await fetch(`http://localhost:8000/algorithm/order_wanted`, {
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
        let response = await fetch(`http://localhost:8000/algorithm/order_wanted/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getMethod()
    }
    const downloadDocument = async () =>{
        let response = await fetch(`http://localhost:8000/algorithm/documents/order_wanted/${id}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `Поручение о проведении оперативно-розыскных мероприятий.docx`;
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
    useEffect(() => {
        getMethod()
    }, [])
    const methodItem = methodInfo.map((method) => {
        return ( 
            <React.Fragment key={method.id_order_wanted}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Поручение о проведении оперативно-розыскных мероприятий
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(3)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Поручение предназначено</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>Начальнику {method.name_orders}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Обстоятельства установленные в ходе проверки</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.check_criminal}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Поручение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.text_order_wanted}</b></TableCell>
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
    else if (variant == 1)
        return(
            <Content submit={handleSubmit(submitMethod)}>
                <h2>Поручение о проведении оперативно-розыскных мероприятий</h2>
                <div className='maindiv'>
                    <div className='formdiv'>
                        <label>Кому предназначено поручение</label>
                        <textarea className="textarea" required placeholder='Наименование органа дознания, спе-циальное или воинское звание, фа-милия, инициалы'{...register('name_orders')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Обстоятельства установленные в ходе проверки</label>
                        <textarea className="textarea" required placeholder='Обстоятельства, установленные в ходе проверки сообщения о преступлении и подлежащие выяснению'{...register('check_criminal')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Поручение</label>
                        <textarea className="textarea" required placeholder='Текст поручения'{...register('text_order_wanted')}/>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
            </Content>
        )
    else if (variant==2)
        return(
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        {methodItem}
                    </Table>
                </TableContainer>  
                <Button variant="contained" size='large' type='button' onClick={()=>downloadDocument()}>Сформировать документ</Button>
            </div>
        )
        else if (variant==3)
            return(
                <Content submit={handleSubmit(editMethod)}>
                    <h2>Поручение о проведении оперативно-розыскных мероприятий</h2>
                    <div className='maindiv'>
                        <div className='formdiv'>
                            <label>Кому предназначено поручение</label>
                            <textarea className="textarea" required placeholder='Наименование органа дознания, спе-циальное или воинское звание, фа-милия, инициалы'{...register('name_orders')}/>
                        </div>
                        <div className='formdiv'>
                            <label>Обстоятельства установленные в ходе проверки</label>
                            <textarea className="textarea" required placeholder='Обстоятельства, установленные в ходе проверки сообщения о преступлении и подлежащие выяснению'{...register('check_criminal')}/>
                        </div>
                        <div className='formdiv'>
                            <label>Поручение</label>
                            <textarea className="textarea" required placeholder='Текст поручения'{...register('text_order_wanted')}/>
                        </div>
                    </div>
                    <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                    <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(2)} type='button'>Отменить</Button>
                </Content>
            )
}