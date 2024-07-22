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
import ErrorIcon from '@mui/icons-material/Error';
export const Victim = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [methodInfo,setMethod] = useState([])
    const [criminal,setCriminal] = useState()
    const [variant,setVariant] = useState(0)
    const [knowPerson,setKnowPerson] = useState(1)
    const [victim,setVictim] = useState(undefined)
    const [passport,setPassport] = useState(undefined)
    const handleOpenEditVictim = () =>{
        const modalElement = document.getElementById("editVictim");
        modalElement.showModal();
    }
    const handleCloseEditVictim = () => {
        const modalElement = document.getElementById("editVictim");
        modalElement.close();
    };
    const handleOpenEditPassport = () =>{
        const modalElement = document.getElementById("editPassport");
        modalElement.showModal();
    }
    const handleCloseEditPassport = () => {
        const modalElement = document.getElementById("editPassport");
        modalElement.close();
    };
    const getMethod = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/declaration_victim/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            getVictim(result.fk_individuals_id)
            setMethod([result])
            setVariant(2)
            setValue("date_declaration",result.date_declaration)
            setValue("rationale",result.rationale)
            setValue("type_of_harm",result.type_of_harm)
        }
        else
            setVariant(1)
    }
    const submitMethod = async (d) => {
        var id_individual
        if (d.know_person == 1)
        {   
            let getIndividualResponse = await fetch(`http://localhost:8000/api/individual/case/${id}`)
            let individual_id = await getIndividualResponse.json()
            id_individual = individual_id
        }
        else
        {
            const addNewIndividual = {
                "firstname":d.firstname,
                "middlename":d.middlename,
                "lastname":d.lastname,
                "sex":d.sex,
                "datebirthday":d.datebirthday,
                "phone":d.phone,
                "passport_serial":d.passport_serial,
                "passport_number":d.passport_number,
                "issued_by_whom":d.issued_by_whom,
                "passport_date_of_issue":d.passport_date_of_issue,
                "place_of_birth":d.place_of_birth,
                "place_of_residence":d.place_of_residence,
            }
            let response = await fetch("http://localhost:8000/api/create_individual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addNewIndividual)
            })
            let result = await response.json()
            if (!response.ok)
            {
              showUpdateMessage(result.message,response.ok)
            }
            else
                id_individual = result
        }
        d.user_id=userId
        d.case_id=id
        console.log(id_individual)
        const addDeclarationVictim = {
            "user_id":userId,
            "case_id":id,
            "rationale":d.rationale,
            "type_of_harm":d.type_of_harm,
            "date_declaration":d.date_declaration,
            "fk_individuals_id":id_individual
        }
        let response = await fetch(`http://localhost:8000/algorithm/declaration_victim`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addDeclarationVictim)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getMethod()
        
    }
    const editMethod = async (d) =>{
        const editer ={
            "date_declaration":d.date_declaration,
            "rationale":d.rationale,
            "type_of_harm":d.type_of_harm,
            "fk_individuals_id":victim.individuals_id
        }
        let response = await fetch(`http://localhost:8000/algorithm/declaration_victim/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editer)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getMethod()
    }
    const downloadDocument = async () =>{
        let response = await fetch(`http://localhost:8000/algorithm/documents/declaration_victim/${id}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `Постановление о признании потерпевшим.docx`;
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
    }
    function setAllNull()
    {
        setValue("firstname","")
        setValue("middlename","")
        setValue("lastname","")
        setValue("sex","")
        setValue("datebirthday","")
        setValue("phone","")
        setValue("passport_serial","")
        setValue("passport_number","")
        setValue("issued_by_whom","")
        setValue("passport_date_of_issue","")
        setValue("place_of_birth","")
        setValue("place_of_residence","")
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
    const getVictim = async(id_individual)=>{
        const response = await fetch(`http://localhost:8000/api/individual/id_individual/${id_individual}`)
        const result = await response.json()
        if (response.ok)
        {
            setVictim(result)
            getPassportVictim(result.FK_passports_id)
            setValue("firstname",result.first_name)
            setValue("middlename",result.middle_name)
            setValue("lastname",result.last_name)
            setValue("phone",result.phone)
            setValue("resident",result.resident)
            setValue("education",result.education)
            setValue("family_status",result.family_status)
            setValue("place_work",result.place_work)
            setValue("military",result.military)
            setValue("criminal",result.criminal)
            setValue("other",result.other)
        }
    }
    const getPassportVictim = async(id_passport)=>{
        const response = await fetch(`http://localhost:8000/api/passport/id_passport/${id_passport}`)
        const result = await response.json()
        if (response.ok)
        {
            setPassport(result)
            setValue("passport_serial",result.passport_serial)
            setValue("passport_number",result.passport_number)
            setValue("issued_by_whom",result.issued_by_whom)
            setValue("place_of_birth",result.place_of_birth)
            setValue("datebirthday",result.birthdate)
            setValue("passport_date_of_issue",result.passport_date_of_issue)
            setValue("sex",result.sex)
            setValue("place_of_residence",result.place_of_residence)
        }
    }
    const editVictim = async (d) =>{
        let response = await fetch(`http://localhost:8000/api/individual_edit/${victim.individuals_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {    
            getMethod()
            handleCloseEditVictim()
        }
    }
    const editPassport = async (d) =>{
        let response = await fetch(`http://localhost:8000/api/passport_edit/${victim.individuals_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {    
            getMethod()
            handleCloseEditPassport()
        }
    }
    useEffect(() => {
        getMethod()
        getCriminal()
    }, [])
    const VictimInfo = ()=>{
        if (victim != undefined)
        {
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
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.first_name} {victim.middle_name} {victim.last_name}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Номер телефона</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.phone}</b></TableCell>
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
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место работы/учебы</TableCell>
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
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Иные данные</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{victim.other}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>
            )
        }
    }
    const PassportInfo = ()=>{
        if(passport != undefined)
            return(
                <React.Fragment>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                                <Toolbar>
                                    <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                        Паспортные данные потерпевшего
                                    </Typography>
                                    <IconButton size="small" onClick={()=>handleOpenEditPassport()}>
                                        <EditIcon/>
                                    </IconButton>
                                </Toolbar>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Серия и номер паспорта</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.passport_serial} {passport.passport_number}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Пол</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.sex}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата рождения</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.birthdate.slice(-2)}.{passport.birthdate.slice(-5,-3)}.{passport.birthdate.slice(0,4)}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место рождения</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.place_of_birth}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Кем выдан</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.issued_by_whom}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата выдачи</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.passport_date_of_issue.slice(-2)}.{passport.passport_date_of_issue.slice(-5,-3)}.{passport.passport_date_of_issue.slice(0,4)}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место жительства</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passport.place_of_residence}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </React.Fragment>
        )
    }
    const methodItem = methodInfo.map((method) => {
        return ( 
            <React.Fragment key={method.id_declaration_victim}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Постановление о признании потерпевшим
                                </Typography>
                                <IconButton size="small" onClick={()=>setVariant(3)}>
                                    <EditIcon/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата постановления</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.date_declaration.slice(-2)}.{method.date_declaration.slice(-5,-3)}.{method.date_declaration.slice(0,4)}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Обоснование</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.rationale}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Тип причиненного вреда</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{method.type_of_harm}</b></TableCell>
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
    return (
        <Content submit={handleSubmit(submitMethod)}>
            <h2>Постановление о признании потерпевшим</h2>
            <div className='maindiv'>
                <div className='formdiv'>
                    <label>Сделать заявителя потерпевшим?</label><br/>
                    <select {...register("know_person",{required:true})} className="select" onChange={()=>{const select = document.querySelector("select[name=know_person]");const selectedValue = select.value;setKnowPerson(selectedValue);setAllNull()}}>
                        <option value={1}>Да</option>
                        <option value={2}>Нет</option>
                    </select>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Фамилия</label>
                  <TextField required={knowPerson==1?false:true} sx={{display:'block'}} type="text" {...register("firstname")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Имя</label>
                  <TextField required={knowPerson==1?false:true} sx={{display:'block'}} type="text" {...register("middlename")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Отчество</label>
                  <TextField required={knowPerson==1?false:true}  sx={{display:'block'}} type="text" {...register("lastname")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Пол</label><br/>
                  <select {...register("sex")} className="select" required={knowPerson==1?false:true}  >
                    <option value="Муж">Мужской</option>
                    <option value="Жен">Женский</option>
                  </select>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Дата рождения</label>
                  <TextField  sx={{display:'block'}} required={knowPerson==1?false:true}  type="date" {...register("datebirthday")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Телефон</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="text" {...register("phone")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Серия паспорта</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="text" {...register("passport_serial")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Номер паспорта</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="text" {...register("passport_number")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Кем выдан</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="text" {...register("issued_by_whom")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Дата выдачи</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="date" {...register("passport_date_of_issue")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Место рождения</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="text" {...register("place_of_birth")}/>
                </div>
                <div className="formdiv" style={{display:knowPerson==1?"none":"block",paddingRight:"10px"}}>
                  <label>Место жительства</label>
                  <TextField sx={{display:'block'}} required={knowPerson==1?false:true}  type="text" {...register("place_of_residence")}/>
                </div>
                <div className='formdiv'>
                    <label>Дата постановления</label>
                    <TextField required type="date" sx={{display:'block'}} {...register('date_declaration')}/>
                </div>
                <div className='formdiv'>
                    <label>Обоснование</label>
                    <textarea required className="textarea" placeholder='Обоснование признания лица потерпевшим' {...register('rationale')}/>
                </div>
                <div className='formdiv'>
                    <label>Какой вред причинен</label>
                    <textarea className="textarea" required placeholder='Физический, имущественный и (или) моральный вред'{...register('type_of_harm')}/>
                </div>
            </div>
            <Button variant="contained" size='large' sx={{marginTop:5}} type='submit' disabled={criminal==undefined?true:false}>Сохранить</Button>
            <IconButton size='small' color='error' sx={{marginTop:5,display:criminal==undefined?'inline-block':'none'}} onClick={()=>showUpdateMessage('Постановление о возбуждении уголовного дела не найдено',false)}><ErrorIcon/></IconButton>
        </Content>
    )
    else if(variant==2)
        return(
            <div className='form'>
                <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                    <Table>
                        <VictimInfo/>
                        <PassportInfo/>
                        {methodItem}
                    </Table>
                </TableContainer>
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
                                <label>Номер телефона</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("phone")} placeholder="Дата рождения"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Гражданство</label>
                                <textarea className="textarea" {...register("resident")} placeholder="Гражданство"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Образование</label>
                                <textarea className="textarea" {...register("education")} placeholder="Образование"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Семейное положение</label>
                                <textarea className="textarea" {...register("family_status")} placeholder="Семейное положение"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Место работы или учебы, телефон</label>
                                <textarea className="textarea" {...register("place_work")} placeholder="Место работы или учебы, телефон"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Отношение к воинской обязанности</label>
                                <textarea className="textarea" {...register("military")} placeholder="Отношение к воинской обязанности"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Наличие судимости</label>
                                <textarea className="textarea" {...register("criminal")} placeholder="Наличие судимости"></textarea>
                            </div>
                            <div className='formdiv'>
                                <label>Иные данные</label>
                                <textarea className="textarea" {...register("other")} placeholder="Иные данные"></textarea>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditVictim()}}>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
                <dialog id='editPassport' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение паспортных данных</h2>
                    <Content classname={'no'} submit={handleSubmit(editPassport)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className="formdiv">
                                <label>Серия паспорта</label>
                                <TextField sx={{display:'block'}} required type="text" {...register("passport_serial")}/>
                            </div>
                            <div className="formdiv">
                                <label>Номер паспорта</label>
                                <TextField sx={{display:'block'}} required type="text" {...register("passport_number")}/>
                            </div>
                            <div className="formdiv">
                                <label>Пол</label><br/>
                                <select {...register("sex")} className="select" required>
                                  <option value="Муж">Мужской</option>
                                  <option value="Жен">Женский</option>
                                </select>
                            </div>
                            <div className="formdiv">
                                <label>Дата рождения</label>
                                <TextField  sx={{display:'block'}} required type="date" {...register("datebirthday")}/>
                            </div>
                            <div className="formdiv">
                                <label>Кем выдан</label>
                                <TextField sx={{display:'block'}} required type="text" {...register("issued_by_whom")}/>
                            </div>
                            <div className="formdiv">
                                <label>Дата выдачи</label>
                                <TextField sx={{display:'block'}} required type="date" {...register("passport_date_of_issue")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место рождения</label>
                                <TextField sx={{display:'block'}} required type="text" {...register("place_of_birth")}/>
                            </div>
                            <div className="formdiv">
                                <label>Место жительства</label>
                                <TextField sx={{display:'block'}} required type="text" {...register("place_of_residence")}/>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditPassport()}}>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
                <Button variant="contained" size='large' type='button' onClick={()=>downloadDocument()}>Сформировать документ</Button>
            </div>
        )
    else if (variant==3)
        return(
            <Content submit={handleSubmit(editMethod)}>
                <h2>Постановление о признании потерпевшим</h2>
                <div className='maindiv'>
                    <div className='formdiv'>
                        <label>Дата постановления</label>
                        <TextField required type="date" sx={{display:'block'}} {...register('date_declaration')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Обоснование</label>
                        <textarea required className="textarea" placeholder='Обоснование признания лица потерпевшим' {...register('rationale')}/>
                    </div>
                    <div className='formdiv'>
                        <label>Какой вред причинен</label>
                        <textarea className="textarea" required placeholder='Физический, имущественный и (или) моральный вред'{...register('type_of_harm')}/>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} onClick={()=>setVariant(2)} type='button'>Отменить</Button>
            </Content>
        )
}