import Content from "../components/content"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/authcontext"
import { IconButton, Table, TableBody, TableContainer, TableHead } from "@mui/material"
import React from "react"
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import showUpdateMessage from "../utils/showUpdateMessage";
const StatementPage = () => {
    const {id} = useParams()
    const [statement,setStatement] = useState()
    const [individual,setIndividual] = useState()
    const [passport,setPassport] = useState()
    const {register, handleSubmit,setValue} = useForm()
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
    const handleOpenEditStatement = () =>{
        const modalElement = document.getElementById("editStatement");
        modalElement.showModal();
    }
    const handleCloseEditStatement = () => {
        const modalElement = document.getElementById("editStatement");
        modalElement.close();
    };
    const getStatement = async() =>{
        const response = await fetch(`http://localhost:8000/api/statement/${id}`)
        const result = await response.json()
        if(response.ok)
        {
            setStatement(result)
            setValue("statement_date",result.statement_date)
            setValue("explanation_text",result.explanation_text)
            setValue("number_statement",result.number_statement)
        }
    }
    const getIndividual = async() =>{
        const response = await fetch(`http://localhost:8000/api/get_individual/case/${id}`)
        const result = await response.json()
        if(response.ok)
        {
            setIndividual(result)
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
            getPassport(result.FK_passports_id)
        }
    }
    const getPassport = async(id_passport)=>{
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
    const editIndividual = async (d) =>{
        let response = await fetch(`http://localhost:8000/api/individual_edit/${individual.individuals_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {   
            getIndividual()
            handleCloseEditVictim()
        }
    }
    const editPassport = async (d) =>{
        let response = await fetch(`http://localhost:8000/api/passport_edit/${individual.individuals_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
        {    
            getIndividual()
            handleCloseEditPassport()
        }
    }
    const editStatement = async (d) =>{
        let response = await fetch(`http://localhost:8000/api/statement_edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        
        if (response.ok)
        {    
            getStatement()
            handleCloseEditStatement()
            showUpdateMessage(result.message,response.ok)
        }
    }
    useEffect(() => {
        getStatement()
        getIndividual()
    }, [])
    const StatementInfo = ()=>{
        if(statement != undefined)
            return(
                <React.Fragment>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                                <Toolbar>
                                    <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                        Информация о заявлении
                                    </Typography>
                                    <IconButton size="small" onClick={()=>handleOpenEditStatement()}>
                                        <EditIcon/>
                                    </IconButton>
                                </Toolbar>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Номер заявления</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{statement.number_statement}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата заявления</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{statement.statement_date.slice(-2)}.{statement.statement_date.slice(-5,-3)}.{statement.statement_date.slice(0,4)}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Основная информация</TableCell>
                            <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{statement.explanation_text}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </React.Fragment>
        )
    }
    const IndividualInfo = ()=>{
        if (individual != undefined)
        {
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
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">ФИО заявителя</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.first_name} {individual.middle_name} {individual.last_name}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Номер телефона</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.phone}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Гражданство</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.resident}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Образование</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.education}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Семейное положение</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.family_status}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место работы/учебы</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.place_work}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Отношение к воинской обязанности</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.military}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Наличие судимости</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.criminal}</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Иные данные</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.other}</b></TableCell>
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
                                        Паспортные данные заявителя
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
    return (
        <div className="form">
            <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                <Table>
                    <IndividualInfo/>
                    <PassportInfo/>
                    <StatementInfo/>
                </Table>
            </TableContainer>
            <dialog id='editVictim' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение данных о потерпевшем</h2>
                    <Content classname={'no'} submit={handleSubmit(editIndividual)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className='formdiv'>
                                <label>Фамилия</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("firstname")} placeholder="Фамилия"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Имя</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("middlename")} placeholder="Имя"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Отчество</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("lastname")} placeholder="Отчество"></TextField>
                            </div>
                            <div className='formdiv'>
                                <label>Номер телефона</label>
                                <TextField type='text' required sx={{display:'block'}} {...register("phone")} placeholder="Номер телефона"></TextField>
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
            <dialog id='editStatement' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение паспортных данных</h2>
                    <Content classname={'no'} submit={handleSubmit(editStatement)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className="formdiv">
                                <label>Номер заявления</label>
                                <TextField sx={{display:'block'}} required type="text" {...register("number_statement")}/>
                            </div>
                            <div className="formdiv">
                                <label>Дата заявления</label>
                                <TextField sx={{display:'block'}} required type="date" {...register("statement_date")}/>
                            </div>
                            <div className="formdiv">
                                <label>Текст заявления</label>
                                <textarea required className="textarea" {...register("explanation_text")} placeholder="Текст заявления"></textarea>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEditStatement()}}>Закрыть</Button>
                        </div> 
                    </Content>
            </dialog>
        </div>
    )
}

export default StatementPage