import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import React from "react"
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import { Dialog } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from "react-virtuoso"
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
export const Inspect = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {id} = useParams()
    const {userId} = useContext(AuthContext)
    const [selectedId,setSelectedId] = useState('No')
    const [row,setRow] = useState('No')
    const [inspectInfo,setInspect] = useState([])
    const [variant,setVariant] = useState()
    const [persons,setPersons] = useState()
    const [proced,setProced] = useState(1)
    const [note,setNote] = useState(1)
    const [victim,setVictim] = useState(false)
    const [expert,setExpert] = useState(false)
    const [witness,setWitness] = useState(false)
    const handleOpen = () => {
        const modalElement = document.getElementById("create");
        modalElement.showModal();
    };
    const handleClose = () => {
        const modalElement = document.getElementById("create");
        modalElement.close();
    };
    const handleOpenEditPerson = () =>{
        const modalElement = document.getElementById("edit");
        const proc_pos={
            "Потерпевший":1,
            "Эксперт":2,
            "Специалист":3,
            "Понятой":4,
            "Защитник":5,
            "Подозреваемый":6
        }
        const pet ={
            "Нет":1,
            "Да":2
        }
        setValue("fk_procedural_position_person_edit",proc_pos[row.fk_procedural_position])
        setValue("first_name_person_edit",row.first_name)
        setValue("middle_name_person_edit",row.middle_name)
        setValue("last_name_person_edit",row.last_name)
        setValue("residence_person_edit",row.residence)
        setValue("notes_person_edit",row.notes)
        setValue("passport_serial_person_edit",row.passport_serial)
        setValue("passport_number_person_edit",row.passport_number)
        setValue("petition_person_edit",pet[row.petition])
        modalElement.showModal();
    }
    const handleCloseEditPerson = () => {
        const modalElement = document.getElementById("edit");
        setSelectedId('No')
        setRow('No')
        modalElement.close();
    };
    const getInspect = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/inspect/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setInspect([result])
            await getPersons()
            setValue("date_inspect",result.date_inspect)
            setValue("begin_inspect",result.begin_inspect)
            setValue("end_inspect",result.end_inspect)
            setValue("message_inspect",result.message_inspect)
            setValue("from_message_inspect",result.from_message_inspect)
            setValue("inspect_exam",result.inspect_exam)
            setValue("place_of_inspect",result.place_of_inspect)
            setValue("technical_means",result.technical_means)
            setValue("conditions",result.conditions)
            setValue("establish",result.establish)
            setValue("photography",result.photography)
            setValue("sized_items",result.sized_items)
            setValue("items_for_inspect",result.items_for_inspect)
            setValue("familiarization",result.familiarization)
            setVariant(1.5)
        }
        else
            setVariant(1)
        
    }
    const getAnotherInspect = async() =>{
        const response = await fetch(`http://localhost:8000/algorithm/inspect/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setInspect([result])
            setValue("date_inspect",result.date_inspect)
            setValue("begin_inspect",result.begin_inspect)
            setValue("end_inspect",result.end_inspect)
            setValue("message_inspect",result.message_inspect)
            setValue("from_message_inspect",result.from_message_inspect)
            setValue("place_of_inspect",result.place_of_inspect)
            setValue("inspect_exam",result.inspect_exam)
            setValue("technical_means",result.technical_means)
            setValue("conditions",result.conditions)
            setValue("establish",result.establish)
            setValue("photography",result.photography)
            setValue("sized_items",result.sized_items)
            setValue("items_for_inspect",result.items_for_inspect)
            setValue("familiarization",result.familiarization)
            setVariant(2)
        }
    }
    const checkPerson = (resppers) => {
        if(resppers != undefined)
        {
            setVictim(false)
            setExpert(false)
            setWitness(false)
            let count = 0
            for(let i=0;i<resppers.length;i++)
            {
                if(resppers[i].fk_procedural_position=='Потерпевший')
                {
                    setVictim(true)
                }
                else if(resppers[i].fk_procedural_position=='Эксперт'||resppers[i].fk_procedural_position=='Специалист')
                    setExpert(true)
                else if(resppers[i].fk_procedural_position=='Понятой')
                    count = count+1
            }
            if (count == 2)
                setWitness(true)
        }
    }
    const getPersons = async () => { 
        const response = await fetch(`http://localhost:8000/algorithm/person_involved_inspect/${id}`)
        const result = await response.json()
        if (response.ok)
        {    
            setPersons(result)
            checkPerson(result)
        }
        else
        {
            setPersons([])
        }
    }
    useEffect(() => {
        getInspect()
    }, [])
    const submitInspect = async (d) => {
        d.user_id=userId
        d.case_id=id
        let response = await fetch(`http://localhost:8000/algorithm/inspect`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getInspect()
    }
    const editPerson = async (d) =>{
        if (d.fk_procedural_position_person_edit == 1)
            {
                if(victim && (row.fk_procedural_position!='Потерпевший'))
                    return showUpdateMessage("Потерпевший уже добавлен",false)
            }
        if ((d.fk_procedural_position_person_edit == 2 || d.fk_procedural_position_person_edit == 3) && expert &&(row.fk_procedural_position!='Эксперт'&&row.fk_procedural_position!='Специалист'))
            return showUpdateMessage("Эксперт уже добавлен",false)
        if (d.fk_procedural_position_person_edit == 4 && witness && row.fk_procedural_position!='Понятой')
            return showUpdateMessage("Понятые уже добавлены",false)
        const respbody = {
            "first_name":d.first_name_person_edit,
            "middle_name":d.middle_name_person_edit,
            "last_name":d.last_name_person_edit,
            "residence":d.residence_person_edit,
            "passport_serial":d.passport_serial_person_edit,
            "passport_number":d.passport_number_person_edit
        }
        let response = await fetch(`http://localhost:8000/algorithm/person_involved/edit/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(respbody)
        })
        if (response.ok)
        {
            const net = {
                "notes":d.notes_person_edit,
                "petition":d.petition_person_edit,
                "fk_procedural_position":d.fk_procedural_position_person_edit
            }
            let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_inspect/${inspectInfo[0].id_inspect}/${selectedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(net)
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            getPersons()
        }
        else
        {
            let result = await response.json()
            showUpdateMessage(result.message,response.ok)
        }
    }
    const deletePerson = async () =>{
        let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_inspect/${inspectInfo[0].id_inspect}/${selectedId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            selectRow(row)
            setSelectedId('No')
            setRow('No')
            getPersons()
    }
    const createPerson = async (d) =>{
        if (d.fk_procedural_position == 1)
        {
            if(victim)
                return showUpdateMessage("Потерпевший уже добавлен",false)
            let resp = await fetch(`http://localhost:8000/algorithm/individual_involved_info/${id}`)
            let reslt = await resp.json()
            d.first_name = reslt.first_name
            d.middle_name = reslt.middle_name
            d.last_name = reslt.last_name
            d.residence=reslt.residence
            d.passport_serial=reslt.passport_serial
            d.passport_number=reslt.passport_number
        }
        if ((d.fk_procedural_position == 2 || d.fk_procedural_position == 3)&&expert)
            return showUpdateMessage("Эксперт уже добавлен",false)
        if (d.fk_procedural_position == 4 && witness)
            return showUpdateMessage("Понятые уже добавлены",false)
        const respbody = {
            "first_name":d.first_name,
            "middle_name":d.middle_name,
            "last_name":d.last_name,
            "residence":d.residence,
            "passport_serial":d.passport_serial,
            "passport_number":d.passport_number
        }
        let response = await fetch(`http://localhost:8000/algorithm/person_involved/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(respbody)
        })
        let result = await response.json()
        if (response.ok)
        {
            const net = {
                "idPerson":result,
                "idInspect":inspectInfo[0].id_inspect,
                "notes":d.notes,
                "petition":d.petition,
                "fk_procedural_position":d.fk_procedural_position
            }
            let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_inspect/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(net)
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            getPersons()
        }
        else
            showUpdateMessage(result.message,response.ok)
    }
    const editInspect = async (d) =>{
        let response = await fetch(`http://localhost:8000/algorithm/inspect/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getAnotherInspect()
    }
    const downloadDocument = async () =>{
        let response = await fetch(`http://localhost:8000/algorithm/documents/inspect/${id}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = "Протокол осмотра места происшествия.docx";
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
        
    const inspectItem = inspectInfo.map((inspect) => {
        return ( 
            <React.Fragment key={inspect.id_inspect}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Протокол осмотра места происшествия
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(3)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата осмотра</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.date_inspect.slice(-2)}.{inspect.date_inspect.slice(-5,-3)}.{inspect.date_inspect.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Начало осмотра</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.begin_inspect}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Окончание осмотра</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.end_inspect}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">От кого получено сообщение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.from_message_inspect}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">О чем именно сообщение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.message_inspect}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место осмотра</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.place_of_inspect}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Что осматривали</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.inspect_exam}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Использованные технические средства</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.technical_means}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Условия осмотра</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.conditions}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Осмотром установлено</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.establish}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">В ходе осмотра проводилась</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.photography}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Изъятые предметы</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.sized_items}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">К протоколу прилагаются</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{inspect.items_for_inspect}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Ознакомление с протоколом</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>Путем {inspect.familiarization}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    })
    const columns = [
        {
          width: 220,
          headerName: 'Процессуальное положение',
          field: 'fk_procedural_position',
        },
        {
          width: 150,
          headerName: 'Фамилия',
          field: 'first_name',
        },
        {
          width: 150,
          headerName: 'Имя',
          field: 'middle_name',
        },
        {
          width: 150,
          headerName: 'Отчество',
          field: 'last_name',
        },
        {
            width: 150,
            headerName: 'Серия паспорта',
            field: 'passport_serial',
        },
        {
            width: 150,
            headerName: 'Номер паспорта',
            field: 'passport_number',
        },
        {
          width: 300,
          headerName: 'Место жительства',
          field: 'residence',
        },
        {
            width: 300,
            headerName: 'Замечания',
            field: 'notes',
        },
        {
            width: 200,
            headerName: 'Протокол зачитан по его просьбе',
            field: 'petition',
        }

    ];
    function fixedHeaderContent() {
        return (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                variant="head"
                style={{ width: column.width}}
                sx={{
                  backgroundColor: 'wheat', border:2,textAlign:'center'
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        );
    }
    function rowContent(_index, row) {
        return (
          <React.Fragment>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{border:1,textAlign:"center",backgroundColor:selectedId==row.id_persons_involved?'#a0a0a0':'white'}} onClick={()=>{selectRow(row)}}>
                {row[column.field]}
              </TableCell>
            ))}
          </React.Fragment>
        );
    }
    const selectRow = (row) =>{
        if (row.id_persons_involved != selectedId)
        {
          setSelectedId(row.id_persons_involved)
          setRow(row)
        }
        else
        {
          setSelectedId('No')
          setRow('No')
        }
      }
    if(variant==0)
        return (
            <div>
                <h2>Загрузка...</h2>
            </div>
        )
    else if (variant==1)
        return (
            <Content submit={handleSubmit(submitInspect)}>
                <h2>Составление протокола осмотра места происшествия</h2>
                <div className="maindiv">
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label >Дата осмотра</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_inspect')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Начало осмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('begin_inspect')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Окончание осмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('end_inspect')}/>
                    </div><br/>
                    <div className='formdiv'>
                        <label>От кого получено сообщение</label>
                        <textarea className="textarea" {...register("from_message_inspect")} placeholder="От кого получено сообщение"></textarea>
                    </div>

                    <div className='formdiv'>
                        <label>О чем именно сообщение</label>
                        <textarea className="textarea" {...register("message_inspect")} placeholder="О чем именно полученное сообщение"></textarea>
                    </div>

                    <div className='formdiv'>
                        <label>Место осмотра</label>
                        <textarea className="textarea" {...register("place_of_inspect")} placeholder="Место осмотра"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Что осматривали</label>
                        <textarea className="textarea" {...register("inspect_exam")} placeholder="Что осматривали"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Использованные технические средства</label>
                        <textarea className="textarea" {...register("technical_means")} placeholder="Какие технические средства применялись и кем именно"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Условия осмотра</label>
                        <textarea className="textarea" {...register("conditions")} placeholder="Температура воздуха, погода, освещенность"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Осмотром установлено</label>
                        <textarea className="textarea" {...register("establish")} placeholder="Что именно установлено осмотром"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>В ходе осмотра проводилась</label>
                        <textarea className="textarea" {...register("photography")} placeholder="Фотосъемка, видео-, аудиозапись и т.п.)."></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Изъятые предметы</label>
                        <textarea className="textarea" {...register("sized_items")} placeholder="Перечень изъятых предметов"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>К протоколу прилагаются</label>
                        <textarea className="textarea" {...register("items_for_inspect")} placeholder="Фотографические негативы и снимки, киноленты и т.д."></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Ознакомление с протоколом</label><br/>
                        <select {...register("familiarization",{required:true})} className="select">
                              <option value="личного прочтения">Личное прочтение</option>
                              <option value="оглашения протокола следователем">Оглашение следователем</option>
                        </select>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
            </Content>
        )
    else if (variant == 1.5)
        return(
            <div className='form'>
                <h2>Лица, учавствующие в осмотре места происшествия</h2>
                <div>
                <Paper sx={{ height: 400, width: { xl: '70%',lg: '90%',md: '90%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                    <TableVirtuoso
                      data={persons}
                      fixedHeaderContent={fixedHeaderContent}
                      itemContent={rowContent} 
                    />
                </Paper>
                </div>
                <Button variant="contained" color='success' size='large' sx={{marginTop:1,marginRight:1}} type='button' onClick={handleOpen}>Добавить</Button>
                <Button variant="contained" color= 'secondary'size='large' sx={{marginTop:1,marginRight:1}} disabled={selectedId=='No'?true:false} type='button' onClick={handleOpenEditPerson}>Изменить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:1,marginRight:1}} disabled={selectedId=='No'?true:false} type='button' onClick={()=>deletePerson()}>Удалить</Button>
                <dialog id='create' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Добавление нового лица</h2>
                    <Content classname={'no'} submit={handleSubmit(createPerson)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <label>Процессуальное положение</label><br/>
                            <select {...register("fk_procedural_position",{required:true})} className="select" onChange={()=>{const select = document.querySelector("select[name=fk_procedural_position]");const selectedValue = select.value;setProced(selectedValue)}}>
                              <option value={1}>Потерпевший</option>
                              <option value={2}>Эксперт</option>
                              <option value={3}>Специалист</option>
                              <option value={4}>Понятой</option>
                              <option value={5}>Защитник</option>
                              <option value={6}>Подозреваемый</option>
                            </select>
                            <div className="formdiv" style={{display:proced==1?'none':'block'}}>
                                <label>Фамилия</label>
                                <TextField required={proced==1?false:true} sx={{display:'block'}} type="text" {...register("first_name")}/>
                            </div>
                            <div className="formdiv" style={{display:proced==1?'none':'block'}}>
                                <label>Имя</label>
                                <TextField required={proced==1?false:true} sx={{display:'block'}} type="text" {...register("middle_name")}/>
                            </div>
                            <div className="formdiv" style={{display:proced==1?'none':'block'}}>
                                <label>Отчество</label>
                                <TextField sx={{display:'block'}} type="text" {...register("last_name")}/>
                            </div>
                            <div className="formdiv" style={{display:proced==1?'none':'block'}}>
                                <label>Серия паспорта</label>
                                <TextField required={proced==1?false:true} sx={{display:'block'}} type="text" {...register("passport_serial")}/>
                            </div>
                            <div className="formdiv" style={{display:proced==1?'none':'block'}}>
                                <label>Номер паспорта</label>
                                <TextField required={proced==1?false:true} sx={{display:'block'}} type="text" {...register("passport_number")}/>
                            </div>
                            <div className="formdiv" style={{display:proced==1?'none':'block'}}>
                                <label>Место жительства</label>
                                <TextField sx={{display:'block'}} type="text" {...register("residence")} required={proced==4?true:false}/>
                            </div>
                            <div className="formdiv">
                                <label>Замечания к протоколу</label><br/>
                                <select name="checker" required className="select" onChange={()=>{const select = document.querySelector("select[name=checker]");const selectedValue = select.value;setNote(selectedValue);setValue("notes","")}}>
                                    <option value={1}>Отсутсвуют</option>
                                    <option value={2}>Имеются</option>
                                </select>
                            </div>
                            <div className="formdiv" style={{display:note==1?"none":"block"}}>
                                <label>Какие замечания</label>
                                <textarea className="textarea" required={note==1?false:true} {...register("notes")} placeholder="Замечания к протоколу"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Протокол зачитан по его просьбе</label><br/>
                                <select {...register("petition",{required:true})} className="select">
                                    <option value={1}>Нет</option>
                                    <option value={2}>Да</option>
                                </select>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Добавить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleClose();setProced(1);setNote(1);setValue("notes","");setValue("petition",1)}}type='reset'>Отмена</Button>
                        </div> 
                    </Content>
                </dialog>
                <dialog id='edit' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение данных</h2>
                    <Content classname={'no'} submit={handleSubmit(editPerson)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <label>Процессуальное положение</label><br/>
                            <select {...register("fk_procedural_position_person_edit",{required:true})} className="select">
                              <option value={1}>Потерпевший</option>
                              <option value={2}>Эксперт</option>
                              <option value={3}>Специалист</option>
                              <option value={4}>Понятой</option>
                              <option value={5}>Защитник</option>
                              <option value={6}>Подозреваемый</option>
                            </select>
                            <div className="formdiv">
                                <label>Фамилия</label>
                                <TextField required={proced==1?false:true} sx={{display:'block'}} type="text" {...register("first_name_person_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Имя</label>
                                <TextField required={proced==1?false:true} sx={{display:'block'}} type="text" {...register("middle_name_person_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отчество</label>
                                <TextField sx={{display:'block'}} type="text" {...register("last_name_person_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Серия паспорта</label>
                                <TextField sx={{display:'block'}} type="text" {...register("passport_serial_person_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Номер паспорта</label>
                                <TextField sx={{display:'block'}} type="text" {...register("passport_number_person_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место жительства</label>
                                <TextField sx={{display:'block'}} type="text" {...register("residence_person_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Замечания</label>
                                <textarea className="textarea" {...register("notes_person_edit")} placeholder="Замечания к протоколу"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Протокол зачитан по его просьбе</label><br/>
                                <select {...register("petition_person_edit",{required:true})} className="select">
                                    <option value={1}>Нет</option>
                                    <option value={2}>Да</option>
                                </select>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditPerson();setValue("notes","");setValue("petition",1)}}type='reset'>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
                <Button variant="contained" size='large' sx={{display:'block',marginLeft:'auto',marginRight:'auto',marginTop:5}} type='button' disabled={victim?expert?witness?false:true:true:true} onClick={()=>setVariant(2)}>Продолжить</Button>
            </div>
        )
    else if (variant==2)
        return (
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        {inspectItem}
                    </Table>
                </TableContainer> 
                <Button variant="contained" size='large' type='button' onClick={downloadDocument}>Сформировать документ</Button>
                <Button variant="contained" color='error' size='large' sx={{marginLeft:1}} onClick={()=>setVariant(1.5)} type='button'>Назад</Button>
            </div>
        )
    else if (variant==3)
        return (
            <Content submit={handleSubmit(editInspect)}>
                <h2>Составление протокола осмотра места происшествия</h2>
                <div className="maindiv">
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label >Дата осмотра</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_inspect')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Начало осмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('begin_inspect')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Окончание осмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('end_inspect')}/>
                    </div><br/>
                    <div className='formdiv'>
                        <label>От кого получено сообщение</label>
                        <textarea className="textarea" {...register("from_message_inspect")} placeholder="От кого получено сообщение"></textarea>
                    </div>

                    <div className='formdiv'>
                        <label>О чем именно сообщение</label>
                        <textarea className="textarea" {...register("message_inspect")} placeholder="О чем именно полученное сообщение"></textarea>
                    </div>

                    <div className='formdiv'>
                        <label>Место осмотра</label>
                        <textarea className="textarea" {...register("place_of_inspect")} placeholder="Место осмотра"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Что осматривали</label>
                        <textarea className="textarea" {...register("inspect_exam")} placeholder="Что осматривали"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Использованные технические средства</label>
                        <textarea className="textarea" {...register("technical_means")} placeholder="Какие технические средства применялись и кем именно"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Условия осмотра</label>
                        <textarea className="textarea" {...register("conditions")} placeholder="Температура воздуха, погода, освещенность"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Осмотром установлено</label>
                        <textarea className="textarea" {...register("establish")} placeholder="Что именно установлено осмотром"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>В ходе осмотра проводилась</label>
                        <textarea className="textarea" {...register("photography")} placeholder="Фотосъемка, видео-, аудиозапись и т.п.)."></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Изъятые предметы</label>
                        <textarea className="textarea" {...register("sized_items")} placeholder="Перечень изъятых предметов"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>К протоколу прилагаются</label>
                        <textarea className="textarea" {...register("items_for_inspect")} placeholder="Фотографические негативы и снимки, киноленты и т.д."></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Ознакомление с протоколом</label><br/>
                        <select {...register("familiarization",{required:true})} className="select">
                              <option value="личного прочтения">Личное прочтение</option>
                              <option value="оглашения протокола следователем">Оглашение следователем</option>
                        </select>
                    </div>

                </div>
                <Button variant="contained" color='success' size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(2)} type='button'>Отменить</Button>
            </Content>
        )
}