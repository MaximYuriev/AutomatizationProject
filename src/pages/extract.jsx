import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dialog } from '@mui/material';
import { AuthContext } from '../context/authcontext';
import { useContext } from 'react';
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import React from "react"
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export const Extract = () => {
    const {register, handleSubmit} = useForm()
    const {id} = useParams()
    const {userId} = useContext(AuthContext)
    const [moneyOrders,setMoneyOrders] = useState()
    const [detailings,setDetailings] = useState()
    const [screenshots,setScreenshots] = useState()
    const handleOpen = () => {
        const modalElement = document.getElementById("create");
        modalElement.showModal();
    };
    const handleClose = () => {
        const modalElement = document.getElementById("create");
        modalElement.close();
    };
    const uploadDocuments = async (d) =>{
        const formData = new FormData()
        for(let file of d.copyes_passport){
            formData.append('copyes_passport',file)
        }
        const type = d.doc_type
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/upload_${type}`, {
            method: "POST",
            body: formData
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            if (type == 'money_orders')
                getMoneyOrders()
            else if (type=='detailing')
                getDetailings()
            else
                getScreenshots()
        }
    }
    const getMoneyOrders = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/extract/${id}/get_money_orders`)
        const result = await response.json()
        if (response.ok)
        {
            setMoneyOrders(result)
        }
        else
            setMoneyOrders(undefined)
    }
    const getDetailings = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/extract/${id}/get_detailing`)
        const result = await response.json()
        if (response.ok)
        {
            setDetailings(result)
        }
        else
            setDetailings(undefined)
    }
    const getScreenshots = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/extract/${id}/get_screenshot`)
        const result = await response.json()
        if (response.ok)
        {
            setScreenshots(result)
        }
        else
            setScreenshots(undefined)
    }
    const downloadDetailing = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/detailing_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const deleteDetailing = async(filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/detailing_delete/${filename}`, {
            method: "DELETE",
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if(response.ok)
            getDetailings()
    }
    const downloadMoneyOrders = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/money_orders_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const deleteMoneyOrders = async(filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/money_orders_delete/${filename}`, {
            method: "DELETE",
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if(response.ok)
            getMoneyOrders()
    }
    const downloadScreenshots = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/screenshot_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const deleteScreenshots = async(filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/screenshot_delete/${filename}`, {
            method: "DELETE",
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if(response.ok)
            getScreenshots()
    }
    useEffect(() => {
        getMoneyOrders()
        getDetailings()
        getScreenshots()
    }, [])
    var moneyOrd = 0
    if (moneyOrders!=undefined)
        var moneyOrd = moneyOrders.map((moneyOrder) => {
            return ( 
                <b key={moneyOrder}>
                    {moneyOrder}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadMoneyOrders(moneyOrder)}><DownloadIcon/></IconButton>
                    <IconButton size='small' color='error' tabIndex={-1} onClick={()=>deleteMoneyOrders(moneyOrder)}><DeleteForeverIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    var detailingItem = 0
    if (detailings!=undefined)
        var detailingItem = detailings.map((detailing) => {
            return ( 
                <b key={detailing}>
                    {detailing}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadDetailing(detailing)}><DownloadIcon/></IconButton>
                    <IconButton size='small' color='error' tabIndex={-1} onClick={()=>deleteDetailing(detailing)}><DeleteForeverIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    var screenshotItem = 0
    if (screenshots!=undefined)
        var screenshotItem = screenshots.map((screenshot) => {
            return ( 
                <b key={screenshot}>
                    {screenshot}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadScreenshots(screenshot)}><DownloadIcon/></IconButton>
                    <IconButton size='small' color='error' tabIndex={-1} onClick={()=>deleteScreenshots(screenshot)}><DeleteForeverIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const ExtractItem = () =>{
        return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Выемка документов, подтверждающих факт совершения хищения
                                </Typography>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Платежные поручения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{moneyOrd==0?'Данные не найдены':moneyOrd}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Детализация соединений по номеру</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{detailingItem==0?'Данные не найдены':detailingItem}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Скриншоты экрана с перепиской</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{screenshotItem==0?'Данные не найдены':screenshotItem}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    }
    return (
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        <ExtractItem/>
                    </Table>
                </TableContainer> 
                <Button variant="contained" size='large' color='secondary' type='button' tabIndex={-1} startIcon={<CloudUploadIcon/>} onClick={()=>handleOpen()}>Загрузить файл</Button>
                <dialog id='create' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Загрузка файла</h2>
                    <Content classname={'no'} submit={handleSubmit(uploadDocuments)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className="formdiv">
                                <label>Тип документа</label><br/>
                                <select {...register("doc_type",{required:true})} className="select">
                                    <option value="money_orders">Платежные поручения</option>
                                    <option value="detailing">Детализация соединений</option>
                                    <option value="screenshot">Скриншоты экрана</option>
                                </select>
                            </div>
                            <div className="formdiv">
                                <label>Файл</label>
                                <TextField required sx={{display:'block'}} type="file" {...register("copyes_passport")} inputProps={{multiple:true}}/>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Загрузить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>handleClose()} type='reset'>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
            </div>
        )

}