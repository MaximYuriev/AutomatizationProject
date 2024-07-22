import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { AuthContext } from '../context/authcontext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import React from "react"
export const Criminal = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [variant,setVariant] = useState(0)
    const [knowPerson,setKnowPerson] = useState(1)
    const getMethod = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/declaration_criminal_case/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setMethod([result])
            setVariant(2)
            setValue("number_cases",result.number_cases)
            setValue("time_declaration",result.time_declaration)
            setValue("date_declaration",result.date_declaration)
            setValue("criminal",result.criminal)
            setValue("when_criminal",result.when_criminal)
            setValue("where_criminal",result.where_criminal)
            setValue("from_criminal",result.from_criminal)
            setValue("reason_declaration",result.reason_declaration)
            setValue("item_part_article",result.item_part_article)
            setValue("know_person",result.know_person)
            setValue("firstname",result.firstname)
            setValue("middlename",result.middlename)
            setValue("lastname",result.lastname)
            setValue("name_procurator",result.name_procurator)
            setValue("date_procurator",result.date_procurator)
            setValue("time_procurator",result.time_procurator)
            setValue("date_victim",result.date_victim)
            setValue("date_criminal_person",result.date_criminal_person)
            setKnowPerson(result.know_person)
        }
        else
            setVariant(1)
    }
    const submitMethod = async (d) => {
        d.user_id=userId
        d.case_id=id
        if (d.date_criminal_person == '')
            d.date_criminal_person = '1970-01-01'
        let response = await fetch(`http://localhost:8000/algorithm/declaration_criminal_case`, {
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
        if (d.date_criminal_person == '')
            d.date_criminal_person = '1970-01-01'
        let response = await fetch(`http://localhost:8000/algorithm/declaration_criminal_case/${id}`, {
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
            <React.Fragment key={method.id_declaration_criminal_case}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Постановление о возбуждении уголовного дела
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(3)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Номер дела</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.number_cases}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата и время постановления</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_declaration.slice(-2)}.{method.date_declaration.slice(-5,-3)}.{method.date_declaration.slice(0,4)} {method.time_declaration}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Обоснование для возбуждения дела</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.reason_declaration}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Пункт, часть, статья УК РФ</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.item_part_article}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Есть ли подозреваемый</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.know_person==1?'Нет':'Да'}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:method.know_person==1?'none':'table-row'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">ФИО подозреваемого</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.firstname} {method.middlename} {method.lastname}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Название органа прокуратуры</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.name_procurator}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата и время отправки в прокуратуру</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_procurator.slice(-2)}.{method.date_procurator.slice(-5,-3)}.{method.date_procurator.slice(0,4)} {method.time_procurator}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата предоставления потерпевшему</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_victim.slice(-2)}.{method.date_victim.slice(-5,-3)}.{method.date_victim.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:method.know_person==1?'none':'table-row'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата предоставления подозреваемому</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_criminal_person.slice(-2)}.{method.date_criminal_person.slice(-5,-3)}.{method.date_criminal_person.slice(0,4)}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    })
    const downloadDocument = async () =>{
        let response = await fetch(`http://localhost:8000/algorithm/documents/declaration_criminal/${id}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `Постановление о возбуждении уголовного дела.docx`;
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
    if(variant==0)
        return (
            <Content>
                <h2>Загрузка...</h2>
            </Content>
        )
    else if (variant == 1)
    return (
        <Content submit={handleSubmit(submitMethod)}>
            <h2>Постановление о возбуждении уголовного дела</h2>
            <div className='maindiv'>
                <div className='formdiv'>
                    <label>Номер дела</label>
                    <TextField required type="text" sx={{display:'block'}} placeholder='Номер дела' {...register('number_cases')}/>
                </div>
                <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                    <label>Дата постановления</label>
                    <TextField required type="date" sx={{display:'block'}} {...register('date_declaration')}/>
                </div>
                <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                    <label>Время</label>
                    <TextField required type="time" sx={{display:'block'}} {...register('time_declaration')}/>
                </div>
                <div className='formdiv'>
                    <label>Обоснование</label>
                    <textarea className="textarea" required placeholder='Основание для возбуждения дела'{...register('reason_declaration')}/>
                </div>
                <div className='formdiv'>
                    <label>Пункт,часть,статья</label>
                    <textarea className="textarea" required placeholder='Пункт,часть,статья УК РФ'{...register('item_part_article')}/>
                </div>
                <div className='formdiv'>
                    <label>Есть ли подозреваемый</label><br/>
                    <select {...register("know_person",{required:true})} className="select" onChange={()=>{const select = document.querySelector("select[name=know_person]");const selectedValue = select.value;setKnowPerson(selectedValue);setValue("firstname","");setValue("middlename","");setValue("lastname","");setValue("date_criminal_person","")}}>
                        <option value={1}>Нет</option>
                        <option value={2}>Да</option>
                    </select>
                </div>
                <div className='formdiv' style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                    <label>Фамилия подозреваемого</label>
                    <TextField required={knowPerson==1?false:true} type="text" sx={{display:'block'}} placeholder='Фамилия' {...register('firstname')}/>
                </div>
                <div className='formdiv' style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                    <label>Имя подозреваемого</label>
                    <TextField required={knowPerson==1?false:true} type="text" sx={{display:'block'}} placeholder='Имя' {...register('middlename')}/>
                </div>
                <div className='formdiv' style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                    <label>Отчество подозреваемого</label>
                    <TextField required={knowPerson==1?false:true} type="text" sx={{display:'block'}} placeholder='Отчество' {...register('lastname')}/>
                </div>
                <div className='formdiv' style={{display:"block"}}>
                    <label>Название органа прокуратуры</label>
                    <TextField required type="text" sx={{display:'block'}} placeholder='Название прокуратуры' {...register('name_procurator')}/>
                </div>
                <div className='formdiv' style={{display:"inline-block"}}>
                    <label >Дата отправки в прокуратуру</label>
                    <TextField required type="date" sx={{display:'block'}} {...register('date_procurator')}/>
                </div>
                <div className='formdiv' style={{display:"inline-block"}}>
                    <label>Время</label>
                    <TextField required type="time" sx={{display:'block'}} {...register('time_procurator')}/>
                </div>
                <div className='formdiv' style={{display:"block"}}>
                    <label>Дата предоставления потерпевшему</label>
                    <TextField required type="date" sx={{display:'block'}} {...register('date_victim')}/>
                </div>
                <div className='formdiv'style={{display:knowPerson==1?"none":"block"}}>
                    <label>Дата предоставления подозреваемому</label>
                    <TextField required={knowPerson==1?false:true} type="date" sx={{display:'block'}} {...register('date_criminal_person')}/>
                </div>
            </div>
            <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
        </Content>
    )
    else if(variant==2)
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
                <h2>Постановление о возбуждении уголовного дела</h2>
                <div className='maindiv'>
                    <div className='formdiv'>
                        <label>Номер дела</label>
                        <TextField required type="text" sx={{display:'block'}} placeholder='Номер дела' {...register('number_cases')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label >Дата постановления</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_declaration')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Время</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('time_declaration')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Обоснование</label>
                        <textarea className="textarea" required placeholder='Основание для возбуждения дела'{...register('reason_declaration')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Пункт,часть,статья</label>
                        <textarea className="textarea" required placeholder='Пункт,часть,статья УК РФ'{...register('item_part_article')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Есть ли подозреваемый</label><br/>
                        <select {...register("know_person",{required:true})} className="select" onChange={()=>{const select = document.querySelector("select[name=know_person]");const selectedValue = select.value;setKnowPerson(selectedValue);setValue("firstname","");setValue("middlename","");setValue("lastname","");setValue("date_criminal_person","")}}>
                            <option value={1}>Нет</option>
                            <option value={2}>Да</option>
                        </select>
                    </div>
                    <div className='formdiv' style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                        <label>Фамилия подозреваемого</label>
                        <TextField required={knowPerson==1?false:true} type="text" sx={{display:'block'}} placeholder='Фамилия' {...register('firstname')}/>
                    </div>
                    <div className='formdiv' style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                        <label>Имя подозреваемого</label>
                        <TextField required={knowPerson==1?false:true} type="text" sx={{display:'block'}} placeholder='Имя' {...register('middlename')}/>
                    </div>
                    <div className='formdiv' style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                        <label>Отчество подозреваемого</label>
                        <TextField required={knowPerson==1?false:true} type="text" sx={{display:'block'}} placeholder='Отчество' {...register('lastname')}/>
                    </div>
                    <div className='formdiv' style={{display:"block"}}>
                        <label>Название органа прокуратуры</label>
                        <TextField required type="text" sx={{display:'block'}} placeholder='Название прокуратуры' {...register('name_procurator')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block"}}>
                        <label >Дата отправки в прокуратуру</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_procurator')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block"}}>
                        <label>Время</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('time_procurator')}/>
                    </div>
                    <div className='formdiv' style={{display:"block"}}>
                        <label>Дата предоставления потерпевшему</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_victim')}/>
                    </div>
                    <div className='formdiv'style={{display:knowPerson==1?"none":"block"}}>
                        <label>Дата предоставления подозреваемому</label>
                        <TextField required={knowPerson==1?false:true} type="date" sx={{display:'block'}} {...register('date_criminal_person')}/>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(2)} type='button'>Отменить</Button>
            </Content>
        )
}