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
export const Reclaim = () => {
    const {register, handleSubmit, setValue} = useForm()
    const {id} = useParams()
    const {userId} = useContext(AuthContext)
    const [passports,setPassports] = useState()
    const [incomes,setIncomes] = useState()
    const [detailings,setDetailings] = useState()
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
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/upload_${type}`, {
            method: "POST",
            body: formData
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            if (type == 'passport')
                getPassports()
            else if (type=='income')
                getIncomes()
            else
                getDetailings()
        }
    }
    const getPassports = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/get_passport`)
        const result = await response.json()
        if (response.ok)
        {
            setPassports(result)
        }
        else
            setPassports(undefined)
    }
    const getIncomes = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/get_income`)
        const result = await response.json()
        if (response.ok)
        {
            setIncomes(result)
        }
        else
            setIncomes(undefined)
    }
    const getDetailings = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/get_detailing`)
        const result = await response.json()
        if (response.ok)
        {
            setDetailings(result)
        }
        else
            setDetailings(undefined)
    }
    const downloadPassport = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/passport_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const deletePassport = async(filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/passport_delete/${filename}`, {
            method: "DELETE",
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if(response.ok)
            getPassports()
    }
    
    const downloadIncome = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/income_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const deleteIncome = async(filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/income_delete/${filename}`, {
            method: "DELETE",
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if(response.ok)
            getIncomes()
    }
    const downloadDetailing = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/detailing_download/${filename}`)
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
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/detailing_delete/${filename}`, {
            method: "DELETE",
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if(response.ok)
            getDetailings()
    }
    useEffect(() => {
        getPassports()
        getIncomes()
        getDetailings()
    }, [])
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
    var incomeItem = 0
    if (incomes!=undefined)
        var incomeItem = incomes.map((income) => {
            return ( 
                <b key={income}>
                    {income}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadIncome(income)}><DownloadIcon/></IconButton>
                    <IconButton size='small' color='error' tabIndex={-1} onClick={()=>deleteIncome(income)}><DeleteForeverIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    var passportItem = 0
    if (passports!=undefined)
        var passportItem = passports.map((passport) => {
            return ( 
                <b key={passport}>
                    {passport}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadPassport(passport)}><DownloadIcon/></IconButton>
                    <IconButton size='small' color='error' tabIndex={-1} onClick={()=>deletePassport(passport)}><DeleteForeverIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const ReclaimItem = () =>{
        return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Истребование необходимых документов и приобщение их к делу
                                </Typography>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Копия паспорта</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passportItem==0?'Данные не найдены':passportItem}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Справки о доходах потерпевшего и его семьи</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{incomeItem==0?'Данные не найдены':incomeItem}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Детализация телефонных разговоров</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{detailingItem==0?'Данные не найдены':detailingItem}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    }
        return (
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        <ReclaimItem/>
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
                                    <option value="passport">Копия паспорта</option>
                                    <option value="income">Справки о доходах</option>
                                    <option value="detailing">Детализация разговоров</option>
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
//inputProps={{accept:'image/*'}} - только картинки
