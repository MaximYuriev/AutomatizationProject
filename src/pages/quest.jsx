import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { AuthContext } from '../context/authcontext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from "react"
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from "react-virtuoso"
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Toolbar from '@mui/material/Toolbar';
export const Quest = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [variant,setVariant] = useState(0)
    const [persons,setPersons] = useState()
    const [note,setNote] = useState(1)
    const [lawyer,setLawyer] = useState(true)
    const [iqp,setIqp]=useState()
    const [victim,setVictim] = useState()
    const [criminal,setCriminal] = useState()
    const handleOpen = () => {
        const modalElement = document.getElementById("create");
        modalElement.showModal();
    };
    const handleClose = () => {
        const modalElement = document.getElementById("create");
        modalElement.close();
    };
    const handleOpenEditVictim = () =>{
        const modalElement = document.getElementById("editVictim");
        modalElement.showModal();
    }
    const handleCloseEditVictim = () => {
        const modalElement = document.getElementById("editVictim");
        modalElement.close();
    };
    const handleOpenEditLawyer = () =>{
        const modalElement = document.getElementById("editLawyer");
        modalElement.showModal();
    }
    const handleCloseEditLawyer = () => {
        const modalElement = document.getElementById("editLawyer");
        modalElement.close();
    };
    const getPerson = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/quest_person/${id}/1`)
        const result = await response.json()
        if (response.ok == false)
        {
            setVariant(2)
        }
        else
        {
            setIqp(result.id_quest_persons)
            getMethod(result.id_quest_persons)
            setVictim(result)
            setValue("firstname",result.firstname)
            setValue("middlename",result.middlename)
            setValue("lastname",result.lastname)
            setValue("datebrithday",result.datebrithday)
            setValue("bitrh_residence",result.bitrh_residence)
            setValue("place_of_recidense",result.place_of_recidense)
            setValue("resident",result.resident)
            setValue("education",result.education)
            setValue("family_status",result.family_status)
            setValue("place_work",result.place_work)
            setValue("military",result.military)
            setValue("criminal",result.criminal)
            setValue("passport_serial",result.passport_serial)
            setValue("passport_number",result.passport_number)
            setValue("other",result.other)
            setValue("notes",result.notes)
            setValue("petition",result.petition)
        }
    }
    const getPersons = async(idqp)=> { 
        if(iqp == undefined)
            var response = await fetch(`http://localhost:8000/algorithm/person_involved_quest/${idqp}`)
        else
            var response = await fetch(`http://localhost:8000/algorithm/person_involved_quest/${iqp}`)
        const result = await response.json()
        if (response.ok)
        {    
            setPersons(result)
            setValue("first_name_lawyer_edit",result[0].first_name)
            setValue("middle_name_lawyer_edit",result[0].middle_name)
            setValue("last_name_lawyer_edit",result[0].last_name)
            setValue("residence_lawyer_edit",result[0].residence)
            setValue("notes_lawyer_edit",result[0].notes)
            setValue("passport_serial_lawyer_edit",result[0].passport_serial)
            setValue("passport_number_lawyer_edit",result[0].passport_number)
            if (result[0].petition == 'Нет')
                setValue("petition_lawyer_edit",1)
            else
                setValue("petition_lawyer_edit",2)
            if(result.length > 0)
                setLawyer(false)
        }
    }
    const editVictim = async (d) =>{
        let response = await fetch(`http://localhost:8000/algorithm/quest_person/${iqp}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            getPerson()
            handleCloseEditVictim()
        }
    }
    const createPersonInvolved = async (d) =>{
        const respbody = {
            "first_name":d.first_name_create_lawyer,
            "middle_name":d.middle_name_create_lawyer,
            "last_name":d.last_name_create_lawyer,
            "residence":d.residence_create_lawyer,
            "passport_serial":d.passport_serial_create_lawyer,
            "passport_number":d.passport_number_create_lawyer
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
                "idInspect":methodInfo[0].id_quest,
                "notes":d.notes_create_lawyer,
                "petition":d.petition_create_lawyer,
                "fk_procedural_position":5
            }
            let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_quest/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(net)
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            getPersons()
            handleClose()
        }
        else
            showUpdateMessage(result.message,response.ok)
    }
    const editLawyer = async (d) =>{
        const respbody = {
            "first_name":d.first_name_lawyer_edit,
            "middle_name":d.middle_name_lawyer_edit,
            "last_name":d.last_name_lawyer_edit,
            "residence":d.residence_lawyer_edit,
            "passport_serial":d.passport_serial_lawyer_edit,
            "passport_number":d.passport_number_lawyer_edit
        }
        let response = await fetch(`http://localhost:8000/algorithm/person_involved/${iqp}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(respbody)
        })
        if (response.ok)
        {
            const net = {
                "notes":d.notes_lawyer_edit,
                "petition":d.petition_lawyer_edit,
                "fk_procedural_position":5
            }
            let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_quest/${methodInfo[0].id_quest}/${persons[0].id_persons_involved}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(net)
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            getPersons()
            handleCloseEditLawyer()
        }
        else
        {
            let result = await response.json()
            showUpdateMessage(result.message,response.ok)
        }
    }
    const deleteLawyer = async (d) =>{
        let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_quest/${methodInfo[0].id_quest}/${persons[0].id_persons_involved}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            getPersons()
            window.location.reload()
    }
    const getMethod = async (idqp) => {
            if(iqp == undefined)
                var response = await fetch(`http://localhost:8000/algorithm/quest/${idqp}`)
            else
                var response = await fetch(`http://localhost:8000/algorithm/quest/${iqp}`)
            const result = await response.json()
            if (response.ok)
            {
                setMethod([result])
                setVariant(3)
                getPersons(idqp)
                setValue("date_quest",result.date_quest)
                setValue("begin_quest",result.begin_quest)
                setValue("end_quest",result.end_quest)
                setValue("quest_place",result.quest_place)
                setValue("technical_means",result.technical_means)
                setValue("establish",result.establish)
                setValue("photography",result.photography)
                setValue("playing",result.playing)
                setValue("familiarization",result.familiarization)
            }
            else
            {
                setVariant(2)
                setValue("date_quest","")
                setValue("begin_quest","")
                setValue("end_quest","")
                setValue("quest_place","")
                setValue("technical_means","")
                setValue("establish","")
                setValue("photography","")
            }
    }
    const submitMethod = async (d) => {
        const quest_person = {
            "fk_active_case_id":id,
            "fk_procedural_position":1,
            "notes":"",
            "petition":1
        }
        let response_person = await fetch(`http://localhost:8000/algorithm/quest_person/create_victim`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quest_person)
        })
        if (response_person.ok)
        {
            const response_q_p = await fetch(`http://localhost:8000/algorithm/quest_person/${id}/1`)
            if (response_q_p.ok)
            {
                const result = await response_q_p.json()
                setIqp(result.id_quest_persons)
                setVictim(result)
                d.user_id=userId
                d.case_id=id
                d.quest_person=result.id_quest_persons
                let response = await fetch(`http://localhost:8000/algorithm/quest`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(d)
                })
                let result_new = await response.json()
                showUpdateMessage(result_new.message,response.ok)
                if (response.ok)
                    getMethod(result.id_quest_persons)
            }
        }
        
    }

    const editMethod = async (d) =>{
        let response = await fetch(`http://localhost:8000/algorithm/quest/${iqp}`, {
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
        let response = await fetch(`http://localhost:8000/algorithm/documents/quest/${iqp}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `Протокол допроса потерпевшего.docx`;
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
    const getCriminal = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/declaration_victim/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setCriminal(result)
        }
        else
            setCriminal(undefined)
    }
    useEffect(() => {
        getPerson()
        getCriminal()
    }, [])
    const methodItem = methodInfo.map((method) => {
        return ( 
            <React.Fragment key={method.id_quest}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Допрос потерпевшего
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(4)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата допроса</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_quest.slice(-2)}.{method.date_quest.slice(-5,-3)}.{method.date_quest.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Начало допроса</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.begin_quest}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Окончание допроса</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.end_quest}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место допроса</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.quest_place}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Использованные технические средства</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.technical_means}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Показания потерпевшего</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.establish}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">В ходе допроса проводилась</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.photography}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Медиа материалы</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>{method.playing}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Ознакомление с протоколом</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"> <b>Путем {method.familiarization}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    })
    const VictimInfo = () =>{
        if (victim != undefined)
        return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Информация о потерпевшем
                                </Typography>
                                <IconButton size="small" onClick={()=>handleOpenEditVictim()}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">ФИО потерпевшего</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.firstname} {victim.middlename} {victim.lastname}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата рождения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.datebrithday.slice(-2)}.{victim.datebrithday.slice(-5,-3)}.{victim.datebrithday.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место рождения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.bitrh_residence}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место жительства и(или) регистрации</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.place_of_recidense}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Гражданство</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.resident}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Образование</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.education}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Семейное положение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.family_status}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место работы или учебы</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.place_work}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Отношение к воинской обязанности</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.military}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Наличие судимости</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.criminal}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Паспорт</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.passport_serial} {victim.passport_number}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Иные данные</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.other}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Замечания к протоколу</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.notes}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Протокол зачитан по его просьбе</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.petition == 1?"Нет":"Да"}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    }
    const LawyerInfo = () =>{
        if (persons!=undefined){
            return(
                <React.Fragment>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                                <Toolbar>
                                    <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                        Информация об адвокате
                                    </Typography>
                                    <IconButton size="small" onClick={()=>handleOpenEditLawyer()}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton size="small" onClick={()=>deleteLawyer()}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                </Toolbar>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">ФИО адвоката</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{persons[0].first_name} {persons[0].middle_name} {persons[0].last_name}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Паспортные данные</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{persons[0].passport_serial} {persons[0].passport_number}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место жительства</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{persons[0].residence}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Замечания</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{persons[0].notes}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Протокол зачитан по его просьбе</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{persons[0].petition}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </React.Fragment>
        )}
        else
         return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Информация об адвокате
                                </Typography>
                                <IconButton size="small" onClick={()=>handleOpen()}>
                                    <AddIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Нет данных!
                                </Typography>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    }
    if(variant==0)
        return (
            <Content>
                <h2>Загрузка...</h2>
            </Content>
        )
    else if(variant==2)
        return(
            <Content submit={handleSubmit(submitMethod)}>
                <h2>Допрос потерпевшего</h2>
                <div className="maindiv">
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label >Дата допроса</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_quest')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Начало досмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('begin_quest')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Окончание досмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('end_quest')}/>
                    </div><br/>
                    <div className='formdiv'>
                        <label>Место допроса</label>
                        <textarea className="textarea" {...register("quest_place")} placeholder="Место допроса"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Использованные технические средства</label>
                        <textarea className="textarea" {...register("technical_means")} placeholder="Какие технические средства применялись и кем именно"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Показания потерпевшего</label>
                        <textarea className="textarea" {...register("establish")} placeholder="Показания потерпевшего"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>В ходе допроса проводилась</label>
                        <textarea className="textarea" {...register("photography")} placeholder="Фотосъемка, видео-, аудиозапись и т.п.)."></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Медиа материалы воспроизводились?</label><br/>
                        <select {...register("playing",{required:true})} className="select">
                              <option value="Воспроизводились">Воспроизводились</option>
                              <option value="Не воспроизводились">Не воспроизводились</option>
                        </select>
                    </div>
                    <div className='formdiv'>
                        <label>Ознакомление с протоколом</label><br/>
                        <select {...register("familiarization",{required:true})} className="select">
                              <option value="личного прочтения">Личное прочтение</option>
                              <option value="оглашения протокола следователем">Оглашение следователем</option>
                        </select>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit' disabled={criminal==undefined?true:false}>Сохранить</Button>
                <IconButton size='small' color='error' sx={{marginTop:5,display:criminal==undefined?'inline-block':'none'}} onClick={()=>showUpdateMessage('Постановление о признании потерпевшим не найдено',false)}><ErrorIcon/></IconButton>
            </Content>
        )
    else if (variant==3)
        return(
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                <Table>
                    <VictimInfo/>
                    <LawyerInfo/>
                    {methodItem}
                </Table>
                </TableContainer>  
                <Button variant="contained" size='large' sx={{marginBottom:"20px"}} type='button' onClick={()=>downloadDocument()}>Сформировать документ</Button>
                <dialog id='editVictim' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение данных о потерпевшем</h2>
                    <Content classname={'no'} submit={handleSubmit(editVictim)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className='formdiv'>
                                <label>Фамилия</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("firstname")} placeholder="Дата рождения"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Имя</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("middlename")} placeholder="Дата рождения"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Отчество</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("lastname")} placeholder="Дата рождения"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Дата рождения</label>
                                <TextField type='date' required sx={{display:'block'}} {...register("datebrithday")} placeholder="Дата рождения"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Место рождения</label>
                                <textarea className="textarea" required {...register("bitrh_residence")} placeholder="Место рождения"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Место жительства</label>
                                <textarea className="textarea" required {...register("place_of_recidense")} placeholder="Место жительства"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Гражданство</label>
                                <textarea className="textarea" required {...register("resident")} placeholder="Гражданство"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Образование</label>
                                <textarea className="textarea" required {...register("education")} placeholder="Образование"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Семейное положение</label>
                                <textarea className="textarea" required {...register("family_status")} placeholder="Семейное положение"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Место работы или учебы, телефон</label>
                                <textarea className="textarea" required {...register("place_work")} placeholder="Место работы или учебы, телефон"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Отношение к воинской обязанности</label>
                                <textarea className="textarea" required {...register("military")} placeholder="Отношение к воинской обязанности"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Наличие судимости</label>
                                <textarea className="textarea" required {...register("criminal")} placeholder="Наличие судимости"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Серия паспорта</label>
                                <textarea className="textarea" required {...register("passport_serial")} placeholder="Паспорт"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Номер паспорта</label>
                                <textarea className="textarea" required {...register("passport_number")} placeholder="Паспорт"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Иные данные</label>
                                <textarea className="textarea" {...register("other")} placeholder="Иные данные"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Замечания к протоколу</label>
                                <textarea className="textarea" {...register("notes")} placeholder="Замечания к протоколу"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Протокол зачитан по его просьбе</label><br/>
                                <select {...register("petition",{required:true})} className="select">
                                    <option value={1}>Нет</option>
                                    <option value={2}>Да</option>
                                </select>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditVictim()}}>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
                <dialog id='editLawyer' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение данных о потерпевшем</h2>
                    <Content classname={'no'} submit={handleSubmit(editLawyer)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className="formdiv">
                                <label>Фамилия</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("first_name_lawyer_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Имя</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("middle_name_lawyer_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отчество</label>
                                <TextField sx={{display:'block'}} type="text" {...register("last_name_lawyer_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Серия паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_serial_lawyer_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Номер паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_number_lawyer_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место жительства</label>
                                <TextField sx={{display:'block'}} type="text" {...register("residence_lawyer_edit")}/>
                            </div>
                            <div className="formdiv">
                                <label>Замечания к протоколу</label>
                                <textarea className="textarea" {...register("notes_lawyer_edit")} placeholder="Замечания к протоколу"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Протокол зачитан по его просьбе</label><br/>
                                <select {...register("petition_lawyer_edit",{required:true})} className="select">
                                    <option value={1}>Нет</option>
                                    <option value={2}>Да</option>
                                </select>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditLawyer();getPersons()}}>Отмена</Button>
                        </div> 
                    </Content>
                </dialog>
                <dialog id='create' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Добавление адвоката</h2>
                    <Content classname={'no'} submit={handleSubmit(createPersonInvolved)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className="formdiv">
                                <label>Фамилия</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("first_name_create_lawyer")}/>
                            </div>
                            <div className="formdiv">
                                <label>Имя</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("middle_name_create_lawyer")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отчество</label>
                                <TextField sx={{display:'block'}} type="text" {...register("last_name_create_lawyer")}/>
                            </div>
                            <div className="formdiv">
                                <label>Серия паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_serial_create_lawyer")}/>
                            </div>
                            <div className="formdiv">
                                <label>Номер паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_number_create_lawyer")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место жительства</label>
                                <TextField sx={{display:'block'}} type="text" {...register("residence_create_lawyer")}/>
                            </div>
                            <div className="formdiv">
                                <label>Замечания к протоколу</label>
                                <textarea className="textarea" {...register("notes_create_lawyer")} placeholder="Замечания к протоколу"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Протокол зачитан по его просьбе</label><br/>
                                <select {...register("petition_create_lawyer",{required:true})} className="select">
                                    <option value={1}>Нет</option>
                                    <option value={2}>Да</option>
                                </select>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Добавить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>handleClose()} type='reset'>Отмена</Button>
                        </div> 
                    </Content>
                </dialog>
            </div>
        )
    else if (variant == 4)
        return(
            <Content submit={handleSubmit(editMethod)}>
                <h2>Допрос потерпевшего</h2>
                <div className="maindiv">
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label >Дата допроса</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_quest')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Начало досмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('begin_quest')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Окончание досмотра</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('end_quest')}/>
                    </div><br/>
                    <div className='formdiv'>
                        <label>Место допроса</label>
                        <textarea className="textarea" required {...register("quest_place")} placeholder="Место допроса"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Использованные технические средства</label>
                        <textarea className="textarea" required {...register("technical_means")} placeholder="Какие технические средства применялись и кем именно"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Показания потерпевшего</label>
                        <textarea className="textarea" required {...register("establish")} placeholder="Показания потерпевшего"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>В ходе допроса проводилась</label>
                        <textarea className="textarea" required {...register("photography")} placeholder="Фотосъемка, видео-, аудиозапись и т.п.)."></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Медиа материалы воспроизводились?</label><br/>
                        <select {...register("playing",{required:true})} className="select">
                              <option value="Воспроизводились">Воспроизводились</option>
                              <option value="Не воспроизводились">Не воспроизводились</option>
                        </select>
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
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(3)} type='button'>Назад</Button>
            </Content>
        )
}