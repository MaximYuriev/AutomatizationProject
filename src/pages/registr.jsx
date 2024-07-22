import Content from "../components/content"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import showRegistrMessage from "../utils/showRegistrMessage";
import { AdminProfileItems } from "../components/menuitems";
import Menu from "../components/menu";
import Header from "../components/header";
import { useState } from "react";
import React from "react"
import { TableVirtuoso } from "react-virtuoso"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
const Registr = () => {
    const [selectedId,setSelectedId] = useState('No')
    const [departments,setDepartments] = useState()
    const handleSignUp = async (d) => {
        d.fk_department_id = selectedId
        let response = await fetch("http://localhost:8000/api/users/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d)
        })
        let result = await response.json()
        showRegistrMessage(result.message,response.ok)
        if (response.ok)
            {
                getDepartments()
            }

    }
    const getDepartments = async() =>{
        const response = await fetch(`http://localhost:8000/api/departments`)
        const result = await response.json()
        setDepartments(result)
    }
    useEffect(() => {
        getDepartments()
    }, [])
    const columns = [
        {
          width: 210,
          headerName: 'Название отдела',
          field: 'NameDepartments',
        },
        {
          width: 250,
          headerName: 'Адрес',
          field: 'Adress',
        },
        {
          width: 210,
          headerName: 'Начальник отдела',
          field: 'NachFIO',
        },
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
              <TableCell key={column.field} sx={{border:1,textAlign:"center",backgroundColor:selectedId===row.id?'#a0a0a0':'white'}} onClick={()=>{selectRow(row)}}>
                {row[column.field]}
              </TableCell>
            ))}
          </React.Fragment>
        );
    }
    const selectRow = (row) =>{
        if (row.id != selectedId)
        {
          setSelectedId(row.id)
        }
        else
        {
          setSelectedId('No')
        }
    }
    const {register,control, handleSubmit} = useForm()
    return (
        <>
            <Header text={"Регистрация"}></Header>
            <Menu items={AdminProfileItems}></Menu>
            <Content submit={handleSubmit(handleSignUp)}>
                <div className="maindiv">
                    <div className="formdiv">
                        <label>Логин</label>
                        <TextField required sx={{display:'block'}} type="text" {...register("name")}/>
                    </div>
                    <div className="formdiv">
                        <label>Электронная почта</label>
                        <TextField sx={{display:'block'}} type="email" {...register("email")}/>
                    </div>
                    <div className="formdiv">
                        <label>Пароль</label>
                        <TextField required sx={{display:'block'}} type="password" {...register("password")}/>
                    </div>
                    <div className="formdiv">
                        <label>Роль</label><br/>
                        <select {...register("role",{required:true})} className="select">
                            <option value={1}>Администратор</option>
                            <option value={2}>Следователь</option>
                            <option value={3}>Оперативный сотрудник</option>
                            <option value={4}>Начальник отдела</option>
                        </select>
                    </div>
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
                        <label>Звание</label>
                        <TextField sx={{display:'block'}} required type="text" {...register("users_rank")}/>
                    </div>
                    <div className="formdiv">
                        <label>Должность</label>
                        <TextField sx={{display:'block'}} required type="text" {...register("appointment")}/>
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
                    <Paper sx={{ height: 400, width: { xl: '40%',lg: '40%',md: '40%',sm: '100%', xs: '100%' }, marginTop:2,display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                    <TableVirtuoso
                      data={departments}
                      fixedHeaderContent={fixedHeaderContent}
                      itemContent={rowContent} 
                    />
                    </Paper>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit' disabled={selectedId=='No'?true:false}>Регистрация</Button>
            </Content>
        </>
    )
}

export default Registr