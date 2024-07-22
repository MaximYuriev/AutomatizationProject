import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { AuthContext } from '../context/authcontext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from "react"
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from "react-virtuoso"
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import ErrorIcon from '@mui/icons-material/Error';
export const Suspect = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [variant,setVariant] = useState(0)
    const [witnes,setWitnes] = useState()
    const [selectedId,setSelectedId] = useState('No')
    const [row,setRow] = useState('No')
    const [lawyer,setLawyer] = useState(true)
    const [persons,setPersons] = useState()
    const [note,setNote] = useState(1)
    const navigate = useNavigate()
    const [criminal,setCriminal] = useState()
    const handleOpen = () => {
        const modalElement = document.getElementById("create");
        modalElement.showModal();
    };
    const handleClose = () => {
        const modalElement = document.getElementById("create");
        modalElement.close();
    };
    const handleOpenEdit = () => {
        const modalElement = document.getElementById("edit");
        setValue("firstname_2",row.firstname)
        setValue("middlename_2",row.middlename)
        setValue("lastname_2",row.lastname)
        setValue("datebrithday_2",row.datebrithday)
        setValue("bitrh_residence_2",row.bitrh_residence)
        setValue("place_of_recidense_2",row.place_of_recidense)
        setValue("resident_2",row.resident)
        setValue("education_2",row.education)
        setValue("family_status_2",row.family_status)
        setValue("place_work_2",row.place_work)
        setValue("military_2",row.military)
        setValue("criminal_2",row.criminal)
        setValue("passport_serial_2",row.passport_serial)
        setValue("passport_number_2",row.passport_number)
        setValue("other_2",row.other)
        setValue("notes_2",row.notes)
        setValue("petition_2",row.petition)
        modalElement.showModal();
    };
    const handleCloseEdit = () => {
        const modalElement = document.getElementById("edit");
        setSelectedId('No')
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
    const editLawyer = async (d) =>{
        const respbody = {
            "first_name":d.first_name_lawyer_edit,
            "middle_name":d.middle_name_lawyer_edit,
            "last_name":d.last_name_lawyer_edit,
            "residence":d.residence_lawyer_edit,
            "passport_serial":d.passport_serial_lawyer_edit,
            "passport_number":d.passport_number_lawyer_edit
            
        }
        let response = await fetch(`http://localhost:8000/algorithm/person_involved/${selectedId}`, {
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
    }
    const getWitnes = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/quest_person/${id}/6`)
        const result = await response.json()
        setWitnes(result)
        setVariant(1)
    }
    const editWitnes = async (d) =>{
        const editWitnes_info = {
            "firstname":d.firstname_2,
            "middlename":d.middlename_2,
            "lastname":d.lastname_2,
            "datebrithday":d.datebrithday_2,
            "bitrh_residence":d.bitrh_residence_2,
            "place_of_recidense":d.place_of_recidense_2,
            "resident":d.resident_2,
            "education":d.education_2,
            "family_status":d.family_status_2,
            "place_work":d.place_work_2,
            "military":d.military_2,
            "criminal":d.criminal_2,
            "passport_serial":d.passport_serial_2,
            "passport_number":d.passport_number_2,
            "other":d.other_2,
            "notes":d.notes_2,
            "petition":d.petition_2
        }
        const response = await fetch(`http://localhost:8000/algorithm/quest_person/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editWitnes_info)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            getWitnes()
            handleCloseEdit()
        }
    }
    const createWitnes = async (d) => {
        d.fk_procedural_position=6
        d.fk_active_case_id=id
        let response = await fetch(`http://localhost:8000/algorithm/quest_person`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            getWitnes()
        }
    }
    const getPersons = async()=> { 
        var response = await fetch(`http://localhost:8000/algorithm/person_involved_quest/${selectedId}`)
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
        else
        {
            setLawyer(true)
            setPersons(undefined) 
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
    const getMethod = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/quest/${selectedId}`)
        const result = await response.json()
        if (response.ok)
        {
            setMethod([result])
            getPersons()
            setVariant(3)
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
            setValue("end_quest",)
            setValue("quest_place","")
            setValue("technical_means","")
            setValue("establish",)
            setValue("photography","")
            setValue("playing","Воспроизводились")
            setValue("familiarization","личного прочтения")
        }
    }
    const submitMethod = async (d) => {
        d.user_id=userId
        d.case_id=id
        d.quest_person=selectedId
        let response = await fetch(`http://localhost:8000/algorithm/quest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {
            getMethod()
        }
    }
    const editMethod = async (d) =>{
        let response = await fetch(`http://localhost:8000/algorithm/quest/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getMethod()
    }
    const deleteWitnes = async (d) =>{
        const response = await fetch(`http://localhost:8000/algorithm/quest_person/${selectedId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        let result = await response.json()
        if (response.ok)
        {
            getWitnes()
            setSelectedId('No')
            setRow('No')
        }
        showUpdateMessage(result.message,response.ok)
    }
    const downloadDocument = async () =>{
        let response = await fetch(`http://localhost:8000/algorithm/documents/quest/${selectedId}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `Протокол допроса подозреваемого.docx`;
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
    const getCriminal = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/declaration_criminal_case/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setCriminal(result)
        }
        else
            setCriminal(undefined)
    }
    useEffect(() => {
        getWitnes()
        getCriminal()
    }, [])
    const columns = [
        {
          width: 150,
          headerName: 'Фамилия',
          field: 'firstname',
        },
        {
          width: 150,
          headerName: 'Имя',
          field: 'middlename',
        },
        {
          width: 150,
          headerName: 'Отчество',
          field: 'lastname',
        },
        {
          width: 150,
          headerName: 'Дата рождения',
          field: 'datebrithday',
        },
        {
          width: 300,
          headerName: 'Место рождения',
          field: 'bitrh_residence',
        },
        {
            width: 300,
            headerName: 'Место жительства',
            field: 'place_of_recidense',
        },
        {
            width: 200,
            headerName: 'Гражданство',
            field: 'resident',
        },
        {
            width: 200,
            headerName: 'Образование',
            field: 'education',
        },
        {
            width: 200,
            headerName: 'Семейное положение',
            field: 'family_status',
        },
        {
            width: 200,
            headerName: 'Место работы/учебы',
            field: 'place_work',
        },
        {
            width: 200,
            headerName: 'Отношение к военной службе',
            field: 'military',
        },
        {
            width: 200,
            headerName: 'Судимость',
            field: 'criminal',
        },
        {
            width: 200,
            headerName: 'Паспортные данные',
            field: 'passport',
        },
        {
            width: 200,
            headerName: 'Иные данные',
            field: 'other',
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
              <TableCell key={column.field} sx={{border:1,textAlign:"center",backgroundColor:selectedId===row.id_quest_persons?'#a0a0a0':'white'}} onClick={()=>{selectRow(row)}}>
                {column.field==='datebrithday'?row[column.field].slice(-2)+'.'+row[column.field].slice(-5,-3)+'.'+row[column.field].slice(0,4):row[column.field]}
              </TableCell>
            ))}
          </React.Fragment>
        );
    }
    const methodItem = methodInfo.map((method) => {
        return ( 
            <React.Fragment key={method.id_quest}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Допрос подозреваемого
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
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Показания подозреваемого</TableCell>
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
    const WitnesInfo = () =>{
        if (row != 'No')
        return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Информация о подозреваемом
                                </Typography>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">ФИО свидетеля</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.firstname} {row.middlename} {row.lastname}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата рождения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.datebrithday.slice(-2)}.{row.datebrithday.slice(-5,-3)}.{row.datebrithday.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место рождения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.bitrh_residence}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место жительства и(или) регистрации</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.place_of_recidense}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Гражданство</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.resident}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Образование</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.education}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Семейное положение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.family_status}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место работы или учебы</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.place_work}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Отношение к воинской обязанности</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.military}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Наличие судимости</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.criminal}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Паспорт</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.passport}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Иные данные</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.other}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Замечания к протоколу</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.notes}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Протокол зачитан по его просьбе</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{row.petition == 1?"Нет":"Да"}</b></TableCell>
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
    const selectRow = (row) =>{
        if (row.id_quest_persons != selectedId)
        {
          setSelectedId(row.id_quest_persons)
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
            <Content>
                <h2>Загрузка...</h2>
            </Content>
        )
    else if (variant==1)
    return (
            <div className='form'>
                <h2>Подозреваемые</h2>
                <div>
                <Paper sx={{ height: 400, width: { xl: '70%',lg: '90%',md: '90%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                    <TableVirtuoso
                      data={witnes}
                      fixedHeaderContent={fixedHeaderContent}
                      itemContent={rowContent} 
                    />
                </Paper>
                </div>
                <IconButton size='small' color='error' sx={{marginTop:5,display:criminal==undefined?'inline-block':'none'}} onClick={()=>showUpdateMessage('Постановление о возбуждении уголовного дела не найдено',false)}><ErrorIcon/></IconButton>
                <Button variant="contained" color='success' size='large' sx={{marginTop:5}} type='button' onClick={()=>handleOpen()} disabled={criminal==undefined?true:false}>Добавить</Button>
                <Button variant="contained" size='large' sx={{marginTop:5,marginLeft:1}} type='submit' disabled={selectedId=='No'?true:false} onClick={()=>getMethod()}>Выбрать</Button>
                <Button variant="contained" color='secondary' size='large' sx={{marginTop:5,marginLeft:1}} type='submit' disabled={selectedId=='No'?true:false} onClick={()=>handleOpenEdit()}>Изменить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} type='submit' disabled={selectedId=='No'?true:false} onClick={()=>deleteWitnes()}>Удалить</Button>
                <dialog id='create' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Добавление подозреваемого</h2>
                    <Content classname={'no'} submit={handleSubmit(createWitnes)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px',height:'800px'}}>
                            <div className="formdiv">
                                <label>Фамилия</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("firstname")}/>
                            </div>
                            <div className="formdiv">
                                <label>Имя</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("middlename")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отчество</label>
                                <TextField sx={{display:'block'}} type="text" {...register("lastname")}/>
                            </div>
                            <div className="formdiv">
                                <label>День рождения</label>
                                <TextField required sx={{display:'block'}} type="date" {...register("datebrithday")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место рождения</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("bitrh_residence")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место жительства</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("place_of_recidense")}/>
                            </div>
                            <div className="formdiv">
                                <label>Гражданство</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("resident")}/>
                            </div>
                            <div className="formdiv">
                                <label>Образование</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("education")}/>
                            </div>
                            <div className="formdiv">
                                <label>Семейное положение</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("family_status")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место работы\учебы</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("place_work")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отношение к воинской службе</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("military")}/>
                            </div>
                            <div className="formdiv">
                                <label>Судимость</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("criminal")}/>
                            </div>
                            <div className="formdiv">
                                <label>Серия паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_serial")}/>
                            </div>
                            <div className="formdiv">
                                <label>Номер паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_number")}/>
                            </div>
                            <div className="formdiv">
                                <label>Иные данные</label>
                                <TextField sx={{display:'block'}} type="text" {...register("other")}/>
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
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Добавить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleClose()}}type='reset'>Отмена</Button>
                        </div> 
                    </Content>
                </dialog>
                <dialog id='edit' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение данных</h2>
                    <Content classname={'no'} submit={handleSubmit(editWitnes)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px',height:'800px'}}>
                            <div className="formdiv">
                                <label>Фамилия</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("firstname_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Имя</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("middlename_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отчество</label>
                                <TextField sx={{display:'block'}} type="text" {...register("lastname_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>День рождения</label>
                                <TextField required sx={{display:'block'}} type="date" {...register("datebrithday_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место рождения</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("bitrh_residence_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место жительства</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("place_of_recidense_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Гражданство</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("resident_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Образование</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("education_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Семейное положение</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("family_status_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место работы\учебы</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("place_work_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Отношение к воинской службе</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("military_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Судимость</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("criminal_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Серия паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_serial_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Номер паспорта</label>
                                <TextField required sx={{display:'block'}} type="text" {...register("passport_number_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Иные данные</label>
                                <TextField sx={{display:'block'}} type="text" {...register("other_2")}/>
                            </div>
                            <div className="formdiv">
                                <label>Замечания к протоколу</label>
                                <textarea className="textarea" {...register("notes_2")} placeholder="Замечания к протоколу"></textarea>
                            </div>
                            <div className="formdiv">
                                <label>Протокол зачитан по его просьбе</label><br/>
                                <select {...register("petition_2",{required:true})} className="select">
                                    <option value={1}>Нет</option>
                                    <option value={2}>Да</option>
                                </select>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEdit()}}type='reset'>Отмена</Button>
                        </div> 
                    </Content>
                </dialog>
            </div>
        )
    else if(variant==2)
        return(
            <Content submit={handleSubmit(submitMethod)}>
                <h2>Допрос подозреваемого</h2>
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
                        <label>Показания подозреваемого</label>
                        <textarea className="textarea" {...register("establish")} placeholder="Показания подозреваемого"></textarea>
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
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>{setVariant(1);setSelectedId("No")}} type='button'>Вернуться</Button>
            </Content>
        )
    else if (variant==3)
        return(
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        <WitnesInfo/>
                        <LawyerInfo/>
                        {methodItem}
                    </Table>
                </TableContainer>
                <Button variant="contained" size='large' sx={{marginBottom:"20px"}} type='button' onClick={()=>downloadDocument()} disabled={lawyer?true:false}>Сформировать документ</Button>
                <Button variant="contained" color='error' size='large' sx={{marginBottom:"20px",marginLeft:1}} onClick={()=>{setVariant(1);setSelectedId("No");setRow("No")}} type='button'>Вернуться</Button>
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
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit' onClick={()=>handleClose()}>Добавить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>handleClose()} type='reset'>Отмена</Button>
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
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditLawyer();getPersons()}}>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
            </div>
        )
    else if (variant == 4)
        return(
            <Content submit={handleSubmit(editMethod)}>
                <h2>Допрос подозреваемого</h2>
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
                        <label>Показания подозреваемого</label>
                        <textarea className="textarea" {...register("establish")} placeholder="Показания подозреваемого"></textarea>
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
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(3)} type='button'>Назад</Button>
            </Content>
        )
}