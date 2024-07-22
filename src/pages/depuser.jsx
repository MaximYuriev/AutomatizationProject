import Content from "../components/content"
import Header from "../components/header"
import Menu from "../components/menu"
import { BossProfileItems } from "../components/menuitems"
import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { AuthContext } from "../context/authcontext"
import React from "react"
import { TableVirtuoso } from "react-virtuoso"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
const DepartmentUsers = () => {
    const [users,setUsers] = useState([""])
    const {userId} = useContext(AuthContext)
    const getUsers = async() =>{
        const response = await fetch(`http://localhost:8000/api/departments/users/${userId}`)
        const result = await response.json()
        setUsers(result)
    }
    useEffect(() => {
        getUsers()
    }, [])
    const columns = [
        {
          width: 150,
          headerName: 'Роль сотрудника',
          field: 'users_role',
        },
        {
            width: 150,
            headerName: 'Звание',
            field: 'ranks',
        },
        {
          width: 150,
          headerName: 'Должность',
          field: 'appointment',
        },
        {
          width: 150,
          headerName: 'ФИО сотрудника',
          field: 'userFIO',
        },
        {
          width: 150,
          headerName: 'Паспортные данные',
          field: 'passport',
        },
        {
          width: 150,
          headerName: 'Количество дел',
          field: 'count_cases',

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
              <TableCell key={column.field} sx={{border:1,textAlign:"center"}}>
                {row[column.field]}
              </TableCell>
            ))}
          </React.Fragment>
        );
     }
    return (
        <>
            <Header text={"Профиль"}></Header>
            <Menu items={BossProfileItems}></Menu>
            <Content>
                <Paper sx={{ height: 400, width: { xl: '50%',lg: '50%',md: '70%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                    <TableVirtuoso
                      data={users}
                      fixedHeaderContent={fixedHeaderContent}
                      itemContent={rowContent} 
                    />
                    </Paper>
            </Content>
        </>
    )
}

export default DepartmentUsers