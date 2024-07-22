import Content from "../components/content"
import Header from "../components/header"
import Menu from "../components/menu"
import { Button, ButtonGroup, Dialog, DialogTitle, Hidden, TextField } from "@mui/material"
import { ProfileItems } from "../components/menuitems"
import { AdminProfileItems } from "../components/menuitems"
import { BossProfileItems } from "../components/menuitems"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/authcontext"
import React from "react"
import { TableVirtuoso } from "react-virtuoso"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useForm } from "react-hook-form";
import showUpdateMessage from "../utils/showUpdateMessage"
import {yupResolver} from "@hookform/resolvers/yup"
import { createCaseSchema } from "../utils/validator"
const Cases = () => {
    const {userRole,userId} = useContext(AuthContext)
    const [selectedId,setSelectedId] = useState('No')
    const [algorithm,setAlgorithm] = useState('No')
    const [algorithms, setAlgorithms] = useState()
    const [selectedAlgorithm,setSelectedAlgorithm] = useState('No')
    const [cases,setCases] = useState()
    const [open,setOpen] = useState(false)
    const [openChange,setOpenChange] = useState(false)
    const [individualId,setIndividualId] = useState('No')
    const [notInTheSystem,setNotInTheSystem] = useState('No')
    const [start,setStart] = useState('2024-01-01')
    const [end,setEnd] = useState()
    const [filter,setFilter] = useState(false)
    const getCases = async() =>{
        const response = await fetch(`http://localhost:8000/api/user/${userId}/cases`)
        const result = await response.json()
        setCases(result)
    }
    const getAlgorithm = async () => {
      const response = await fetch(`http://localhost:8000/api/user_algorithms/${userId}`)
      const result = await response.json()
      if (response.ok)
      {
          setAlgorithms(result)
      }
  }
    useEffect(() => {
        getCases()
        getAlgorithm()
        setEnd(thisDate)
        setStart(thisDate)
        setValue('filter_start_date',thisDate)
        setValue('filter_end_date',thisDate)
    }, [])
    const clickChangeOpen = () => {
      setOpenChange(true);
    }
    const clickChangeClose = () => {
      setOpenChange(false);
      setSelectedAlgorithm('No')
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedAlgorithm('No')
    };
    const checkPassportData = async (d) =>
    {
      const passport={
       "passport_serial":d.passport_serial_1,
       "passport_number":d.passport_number_1
      }
      let response = await fetch("http://localhost:8000/api/individual_prt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passport)
      })
      let result = await response.json()
      if (response.ok)
        {
          setIndividualId(result)
          setNotInTheSystem('No')
        }
      else 
        {
          showUpdateMessage(result.message,response.ok)
          setIndividualId('No')
          setNotInTheSystem('Yes')
          setValue('passport_serial',d.passport_serial_1)
          setValue('passport_number',d.passport_number_1)
        }

    }
    const newIndividual = async (d) =>
    {
      let response = await fetch("http://localhost:8000/api/create_individual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d)
      })
      let result = await response.json()
      if (response.ok)
        {
          setIndividualId(result)
          setNotInTheSystem('No')
        }
      else 
        {
          showUpdateMessage(result.message,response.ok)
        }
    }
    const newCase = async (d) =>
    {
      const newStatement = {
        "statement_date":d.statement_date,
        "explanation_text":d.explanation_text,
        "fk_individuals_id":individualId,
        "number_statement":d.number_statement
      }
      let response = await fetch("http://localhost:8000/api/create_statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStatement)
      })
      let result = await response.json()
      if (response.ok)
      {
        const newCase = {
          "FK_statement_id":result,
          "fk_user_id":userId,
          "fk_algoritm_id":selectedAlgorithm,
        }
        let newresponse = await fetch("http://localhost:8000/api/case", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCase)
        })
        let newresult = await newresponse.json()
        if (newresponse.ok)
          {
            window.location.reload()
          }

        else
          showUpdateMessage(newresult.message,newresponse.ok)
      }
      else
      {
        showUpdateMessage(result.message,response.ok)
        setIndividualId('No')
      }
    }
    const editAlgorithm = async () =>{
      const editAlg = {
        "algorithm_id":selectedAlgorithm
      }
      let response = await fetch(`http://localhost:8000/api/case_edit_alg/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editAlg)
      })
      let result = await response.json()
      if (response.ok)
        window.location.reload()
      else
        showUpdateMessage(result.message,response.ok)
    }
    const {register, handleSubmit,setValue,formState:{errors}} = useForm({mode:"onChange",resolver:yupResolver(createCaseSchema)})
    const columns = [
        {
          width: 110,
          headerName: 'Номер дела',
          field: 'number_cases',
        },
        {
          width: 110,
          headerName: 'Дата создания',
          field: 'StatementDate',
        },
        {
          width: 150,
          headerName: 'ФИО следователя',
          field: 'UserFio',
        },
        {
          width: 150,
          headerName: 'ФИО заявителя',
          field: 'IndividualFio',

        },
        {
          width: 300,
          headerName: 'Текст заявления',
          field: 'StatementText',
        },
        {
          width: 300,
          headerName: 'Название алгоритма',
          field: 'NameAlgoritm',
        },
        {
            width: 132,
            headerName: 'Статус дела',
            field: 'Status',
        },
    ];
    const algorithmColumns = [

      {
        width: '25%',
        headerName: 'Название алгоритма',
        field: 'algorithm_name',
      },
      {
        width: '75%',
        headerName: 'Шаги по алгоритму',
        field: 'description',
      },
    ];
    function fixedHeaderContentAlgorithms(){
      return (
        <TableRow>
          {algorithmColumns.map((column) => (
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
    function rowContetAlgorithms(_index, row) {
      return (
        <React.Fragment>
          {algorithmColumns.map((column) => (
            <TableCell key={column.field} sx={{border:1,textAlign:"center",backgroundColor:selectedAlgorithm===row.id?'#a0a0a0':'white'}} onClick={()=>{selectAlgorithm(row)}}>
              {column.field=='description'?row[column.field].map((description)=>{return(<React.Fragment key={description}>{description}<br/></React.Fragment>)}):row[column.field]}
            </TableCell>
          ))}
        </React.Fragment>
      );
    }
    function rowContent(_index, row) {
      return (
        <React.Fragment>
          {columns.map((column) => (
            <TableCell key={column.field} sx={{border:1,textAlign:"center",backgroundColor:selectedId===row.id?'#a0a0a0':'white'}} onClick={()=>{selectRow(row)}}>
              {column.field=='StatementDate'?row[column.field].slice(-2)+'.'+row[column.field].slice(-5,-3)+'.'+row[column.field].slice(0,4):row[column.field]}
            </TableCell>
          ))}
        </React.Fragment>
      );
    }
    const selectAlgorithm=(row)=>{
        if (row.id != selectedAlgorithm)
        {
          setSelectedAlgorithm(row.id)
        }
        else
        {
          setSelectedAlgorithm('No')
        }
    }
    const selectRow = (row) =>{
      if (row.id != selectedId)
      {
        setSelectedId(row.id)
        setAlgorithm(row.IdAlgoritm)
      }
      else
      {
        setSelectedId('No')
        setAlgorithm('No')
      }
    }
    const changeStartDate = event =>{
      setStart(event.target.value)
    }
    const changeEndDate = event =>{
      setEnd(event.target.value)
    }
    const Filting = async () =>{
      const filterCases = {
        "id": userId,
        "startDate": start,
        "endDate": end
      }
      let response = await fetch("http://localhost:8000/api/user/cases/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterCases)
      })
      const result = await response.json()
      setCases(result)
      setFilter(true)
    }
    const NonFilting = ()=>{
      getCases()
      setFilter(false)
    }
    const date = new Date()
    const thisDate = date.getFullYear()+'-'+(date.getMonth()+1<10?'0':'')+(date.getMonth()+1)+'-'+(date.getDate()<10?'0':'')+date.getDate()
    if (cases == undefined)
      return(
        <>
          <Header text={"Профиль"}></Header>
          <Menu items={userRole==='2'?ProfileItems:userRole==='1'?AdminProfileItems:BossProfileItems}></Menu>
          <h2>Загрузка</h2>
        </>
    )
    else 
    return (
        <>
            <Header text={"Профиль"}></Header>
            <Menu items={userRole==='2'?ProfileItems:userRole==='1'?AdminProfileItems:BossProfileItems}></Menu>
            <Content>
                <div className="maindiv">
                    <div>
                      <h3 style={{marginBottom:3}}>Фильтрация по дате</h3>
                      <h3 style={{display:'inline-block'}}>C</h3> <input type='date' style={{display:'inline-block',marginLeft:'auto',marginRight:'auto',fontSize:'20px'}} {...register("filter_start_date")} min='2024-01-01' max={end} onChange={changeStartDate} disabled={filter?true:false}/>
                      <h3 style={{display:'inline-block',marginLeft:3}}>по</h3> <input type='date' style={{display:'inline-block',marginLeft:'auto',marginRight:'auto',fontSize:'20px'}} {...register("filter_end_date")} min={start} max={thisDate} onChange={changeEndDate} disabled={filter?true:false}/>
                      <Button variant="contained" color='warning' size='small' sx={{display:'inline-block',marginBottom:'5px', marginLeft:1}} type='button' onClick={Filting} disabled={filter?true:false}>Отфильтровать</Button>
                      <Button variant="contained" color='info' size='small' sx={{display:'inline-block',marginBottom:'5px', marginLeft:1}} type='button' onClick={NonFilting} disabled={filter?false:true}>Очистить</Button>
                    </div>
                    <Paper sx={{ height: 400, width: { xl: '70%',lg: '90%',md: '90%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                    <TableVirtuoso
                      data={cases}
                      fixedHeaderContent={fixedHeaderContent}
                      itemContent={rowContent} 
                    />
                    </Paper>
                </div>
                <Button variant="contained" color='success' size='large' sx={{marginTop:5,marginRight:1,display:userRole==2?'inline-block':'none'}} type='button' onClick={handleClickOpen}>Добавить дело</Button>
                <Button variant="contained" size='large' sx={{marginTop:5,marginRight:1}} type='submit' disabled={selectedId=='No'?true:false} href={`case/${selectedId}/main`}>Рассмотреть дело</Button>
                <Button variant="contained" color='secondary' size='large' sx={{marginTop:5,marginRight:1,display:userRole==2?'inline-block':'none'}} type='button' disabled={selectedId=='No'?true:false} onClick={clickChangeOpen}>Изменить алгоритм</Button>
            </Content>
            <Dialog open={open} fullScreen>
              <AppBar position="fixed">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    Создание дела
                  </Typography>
                  <IconButton size="large" color="inherit" aria-label="menu" onClick={handleClose}>
                        <CloseIcon/>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <div className="maindiv">
              <Content submit={handleSubmit(checkPassportData)}>
                <h3>Проверка наличия заявителя в системе</h3>
                <div className="casediv">
                  <label>Серия паспорта</label>
                  <TextField required placeholder="Серия паспорта" {...register("passport_serial_1")} sx={{display:'block'}}></TextField>
                  <p className="validator">{errors.passport_serial_1?.message}</p>
                </div>
                <div className="casediv">
                  <label>Номер паспорта</label>
                  <TextField required placeholder="Номер паспорта" sx={{display:'block'}} {...register("passport_number_1")}></TextField>
                  <p className="validator">{errors.passport_number_1?.message}</p>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:3,marginBottom:1}} type='submit'>Проверить</Button>
              </Content>
              <Content classname={notInTheSystem=='No'?'nodisplay':'yesdisplay newform'} submit={handleSubmit(newIndividual)}>
                <h3>Добавить заявителя в систему</h3>
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
                  <label>Пол</label><br/>
                  <select {...register("sex",{required:true})} className="select">
                    <option value="Муж">Мужской</option>
                    <option value="Жен">Женский</option>
                  </select>
                </div>
                <div className="formdiv">
                  <label>Дата рождения</label>
                  <TextField sx={{display:'block'}} required type="date" {...register("datebirthday")}/>
                </div>
                <div className="formdiv">
                  <label>Телефон</label>
                  <TextField sx={{display:'block'}} required type="text" {...register("phone")}/>
                </div>
                <div className="formdiv">
                  <label>Серия паспорта</label>
                  <TextField sx={{display:'block'}} required type="text" {...register("passport_serial")}/>
                </div>
                <div className="formdiv">
                  <label>Номер паспорта</label>
                  <TextField sx={{display:'block'}} required type="text" {...register("passport_number")}/>
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
                <Button variant="contained" size='large' sx={{marginTop:3,marginBottom:1}} type='submit'>Добавить заявителя</Button>
              </Content>
              <Content classname={individualId=='No'?'nodisplay':'yesdisplay newform'} submit={handleSubmit(newCase)}>
                <h3>Составление заявления</h3>
                <div className="casediv">
                  <label>Номер заявления</label>
                  <input required type="text" {...register("number_statement")} style={{display:'block',marginLeft:'auto',marginRight:'auto',fontSize:'20px'}}/>
                </div>
                <div className="casediv">
                  <label>Дата</label>
                  <input required type="date" {...register("statement_date")} style={{display:'block',marginLeft:'auto',marginRight:'auto',fontSize:'20px'}} max={thisDate} min='2024-01-01'/>
                </div>
                <div className="casediv">
                  <label>Основная информация</label>
                  <textarea className="textarea" required {...register("explanation_text")} placeholder="Основная информация"></textarea>
                </div>
                <div className="casediv">
                  <label>Выбрать алгоритм</label><br/>
                  <Paper sx={{ height: 400, width: { xl: '50%',lg: '50%',md: '75%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit',marginTop:1}}>
                    <TableVirtuoso
                      data={algorithms}
                      fixedHeaderContent={fixedHeaderContentAlgorithms}
                      itemContent={rowContetAlgorithms} 
                    />
                    </Paper>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:3,marginBottom:1}} type='submit' disabled={selectedAlgorithm=='No'?true:false}>Создать дело</Button>
              </Content>
              </div>
            </Dialog>
            <Dialog open={openChange} fullScreen>
              <AppBar position="fixed">
                <Toolbar>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                    Изменение алгоритма
                  </Typography>
                  <IconButton size="large" color="inherit" aria-label="menu" onClick={clickChangeClose}>
                        <CloseIcon/>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Content>
                <div className="maindiv">
                  <Paper sx={{ height: 400, width: { xl: '50%',lg: '50%',md: '75%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit',marginTop:1}}>
                      <TableVirtuoso
                        data={algorithms}
                        fixedHeaderContent={fixedHeaderContentAlgorithms}
                        itemContent={rowContetAlgorithms} 
                      />
                  </Paper>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:3,marginBottom:1}} type='button' disabled={selectedAlgorithm=='No'?true:false} onClick={()=>editAlgorithm()}>Изменить алгоритм</Button>
              </Content>
            </Dialog>
        </>
    )
}

export default Cases