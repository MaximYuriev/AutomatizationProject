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
import Toolbar from '@mui/material/Toolbar';
export const Clarif = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [variant,setVariant] = useState(0)
    const [persons,setPersons] = useState()
    const [lawyer,setLawyer] = useState(true)
    const [iqp,setIqp]=useState()
    const [clarifPerson,setClarifPerson] = useState()
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
        }
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
                "notes":"",
                "petition":1,
                "fk_procedural_position":5
            }
            let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_clarif/${methodInfo[0].id_clarif}/${persons[0].id_persons_involved}`, {
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
        let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_clarif/${methodInfo[0].id_clarif}/${persons[0].id_persons_involved}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            let newresult = await newresponse.json()
            showUpdateMessage(newresult.message,newresponse.ok)
            getPersons()
    }
    const getPerson = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/quest_person/${id}/8`)
        const result = await response.json()
        if (response.ok == false)
        {
            setVariant(2)
        }
        else
        {
            setIqp(result.id_quest_persons)
            setClarifPerson(result)
            getMethod(result.id_quest_persons)
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
            var response = await fetch(`http://localhost:8000/algorithm/person_involved_clarif/${idqp}`)
        else
            var response = await fetch(`http://localhost:8000/algorithm/person_involved_clarif/${iqp}`)
        const result = await response.json()
        if (response.ok)
        {    
            setPersons(result)
            setValue("first_name_lawyer_edit",result[0].first_name)
            setValue("middle_name_lawyer_edit",result[0].middle_name)
            setValue("last_name_lawyer_edit",result[0].last_name)
            setValue("residence_lawyer_edit",result[0].residence)
            setValue("passport_serial_lawyer_edit",result[0].passport_serial)
            setValue("passport_number_lawyer_edit",result[0].passport_number)
            if(result.length > 0)
                setLawyer(false)
        }
        else
        {
            setPersons(undefined)
        }
    }
    const createPerson = async (d) =>{
        d.fk_procedural_position=8
        d.fk_active_case_id=id
        d.notes = ""
        d.petition = 1
        let response = await fetch(`http://localhost:8000/algorithm/quest_person`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            getPerson()
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
                "idInspect":methodInfo[0].id_clarif,
                "notes":"",
                "petition":1,
                "fk_procedural_position":5
            }
            let newresponse = await fetch(`http://localhost:8000/algorithm/person_involved_clarif/`, {
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
    const getMethod = async (idqp) => {
            if(iqp == undefined)
                var response = await fetch(`http://localhost:8000/algorithm/clarif/${idqp}`)
            else
                var response = await fetch(`http://localhost:8000/algorithm/clarif/${iqp}`)
            const result = await response.json()
            if (response.ok)
            {
                setMethod([result])
                setVariant(3)
                getPersons(idqp)
                setValue("date_clarif",result.date_clarif)
                setValue("begin_clarif",result.begin_clarif)
                setValue("end_clarif",result.end_clarif)
                setValue("place_clarif",result.place_clarif)
                setValue("technical_means",result.technical_means)
                setValue("text_clarif",result.text_clarif)
                setValue("read_clarif",result.read_clarif)
                setValue("true_clarif",result.true_clarif)
                setValue("addition_clarif",result.addition_clarif)
                setValue("photography",result.photography)
            }
            else
            {
                setValue("date_clarif","")
                setValue("begin_clarif","")
                setValue("end_clarif","")
                setValue("place_clarif","")
                setValue("technical_means","")
                setValue("text_clarif","")
                setValue("read_clarif","лично следователем")
                setValue("true_clarif",1)
                setValue("addition_clarif","")
                setValue("photography","")
                setVariant(2)
                
            }
    }
    
    const submitMethod = async (d) => {
        const quest_person = {
            "fk_active_case_id":id,
            "fk_procedural_position":8,
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
            const response_q_p = await fetch(`http://localhost:8000/algorithm/quest_person/${id}/8`)
            if (response_q_p.ok)
            {
                const result = await response_q_p.json()
                setIqp(result.id_quest_persons)
                setClarifPerson(result)
                d.user_id=userId
                d.case_id=id
                d.quest_person=result.id_quest_persons
                let response = await fetch(`http://localhost:8000/algorithm/clarif`, {
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
        let response = await fetch(`http://localhost:8000/algorithm/clarif/${iqp}`, {
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
        let response = await fetch(`http://localhost:8000/algorithm/documents/clarif/${iqp}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `Объяснение от потерпевшего.docx`;
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
    useEffect(() => {
        getPerson()
    }, [])
    const methodItem = methodInfo.map((method) => {
        return ( 
            <React.Fragment key={method.id_clarif}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Объяснение от заявителя
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(4)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата объяснения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_clarif.slice(-2)}.{method.date_clarif.slice(-5,-3)}.{method.date_clarif.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Начало объяснения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.begin_clarif}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Окончание объяснения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.end_clarif}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место получения объяснения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.place_clarif}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Использованные технические средства</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.technical_means}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Объяснение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.text_clarif}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Объяснение прочитано</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.read_clarif}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Объяснение записано</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.true_clarif==1?"Правильно":"Не правильно"}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дополнение к объяснению</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.addition_clarif}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">К объяснению прилагаются</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.photography}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
        )
    })
    const VictimInfo = () =>{
        if (clarifPerson != undefined)
        return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Информация о заявителе
                                </Typography>
                                <IconButton size="small" onClick={()=>handleOpenEditVictim()}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">ФИО потерпевшего</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.firstname} {clarifPerson.middlename} {clarifPerson.lastname}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата рождения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.datebrithday.slice(-2)}.{clarifPerson.datebrithday.slice(-5,-3)}.{clarifPerson.datebrithday.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место рождения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.bitrh_residence}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место жительства и(или) регистрации</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.place_of_recidense}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Гражданство</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.resident}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Образование</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.education}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Семейное положение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.family_status}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место работы или учебы</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.place_work}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Отношение к воинской обязанности</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.military}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Наличие судимости</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.criminal}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Паспорт</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.passport_serial} {clarifPerson.passport_number}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Иные данные</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{clarifPerson.other}</b></TableCell>
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
                <h2>Получение объяснения</h2>
                <div className="maindiv">
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label>Дата объяснения</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_clarif')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Начало объяснения</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('begin_clarif')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Окончание объяснения</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('end_clarif')}/>
                    </div><br/>
                    <div className='formdiv'>
                        <label>Место получения объяснения</label>
                        <textarea required className="textarea" {...register("place_clarif")} placeholder="Место получения объяснения"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Использованные технические средства</label>
                        <textarea required className="textarea" {...register("technical_means")} placeholder="Какие технические средства применялись и кем именно"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Объяснение</label>
                        <textarea required className="textarea" {...register("text_clarif")} placeholder="Объяснение"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Объяснение прочитано</label><br/>
                        <select {...register("read_clarif",{required:true})} className="select">
                              <option value="лично следователем">Следователем</option>
                              <option value="по просьбе заявителя">Заявителем</option>
                        </select>
                    </div>
                    <div className='formdiv'>
                        <label>Объяснение записано правильно</label><br/>
                        <select {...register("true_clarif",{required:true})} className="select">
                              <option value={1}>Да</option>
                              <option value={2}>Нет</option>
                        </select>
                    </div>
                    <div className='formdiv'>
                        <label>Дополнение к объяснению</label>
                        <textarea className="textarea" {...register("addition_clarif")} placeholder="Дополнение к объяснению"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>К объяснению прилагаются</label>
                        <textarea required className="textarea" {...register("photography")} placeholder="Фотоснимки и т.д."></textarea>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
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
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit' onClick={()=>handleCloseEditVictim()}>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditVictim()}}>Отмена</Button>
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
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit' onClick={()=>{handleCloseEditLawyer()}}>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditLawyer()}}>Отмена</Button>
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
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit' onClick={()=>handleClose()}>Добавить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>handleClose()} type='reset'>Отмена</Button>
                        </div> 
                    </Content>
                </dialog>
            </div>
        )
    else if (variant == 4)
        return(
            <Content submit={handleSubmit(editMethod)}>
                <h2>Получение объяснения</h2>
                <div className="maindiv">
                    <div className='formdiv' style={{display:"inline-block",paddingRight:"10px"}}>
                        <label>Дата объяснения</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_clarif')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Начало объяснения</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('begin_clarif')}/>
                    </div>
                    <div className='formdiv' style={{display:"inline-block",paddingLeft:"10px"}}>
                        <label>Окончание объяснения</label>
                        <TextField required type="time" sx={{display:'block'}} {...register('end_clarif')}/>
                    </div><br/>
                    <div className='formdiv'>
                        <label>Место получения объяснения</label>
                        <textarea required className="textarea" {...register("place_clarif")} placeholder="Место получения объяснения"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Использованные технические средства</label>
                        <textarea required className="textarea" {...register("technical_means")} placeholder="Какие технические средства применялись и кем именно"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Объяснение</label>
                        <textarea required className="textarea" {...register("text_clarif")} placeholder="Объяснение"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>Объяснение прочитано</label><br/>
                        <select {...register("read_clarif",{required:true})} className="select">
                              <option value="лично следователем">Следователем</option>
                              <option value="по просьбе заявителя">Заявителем</option>
                        </select>
                    </div>
                    <div className='formdiv'>
                        <label>Объяснение записано правильно</label><br/>
                        <select {...register("true_clarif",{required:true})} className="select">
                              <option value={1}>Да</option>
                              <option value={2}>Нет</option>
                        </select>
                    </div>
                    <div className='formdiv'>
                        <label>Дополнение к объяснению</label>
                        <textarea className="textarea" {...register("addition_clarif")} placeholder="Дополнение к объяснению"></textarea>
                    </div>
                    <div className='formdiv'>
                        <label>К объяснению прилагаются</label>
                        <textarea required className="textarea" {...register("photography")} placeholder="Фотоснимки и т.д."></textarea>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(3)} type='button'>Назад</Button>
            </Content>
        )
}