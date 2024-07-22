import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import showUpdateMessage from '../utils/showUpdateMessage';
import { AuthContext } from '../context/authcontext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from "react"
import { TableBody, TableCell,TableRow,Table,TableContainer, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from "react-virtuoso"
export const Track = () => {
    const {register, handleSubmit,setValue} = useForm()
    const {userId} = useContext(AuthContext)
    const {id} = useParams()
    const [trackInfo,setTrack] = useState([])
    const [variant,setVariant] = useState(0)
    const [anothTrack,setAnothTrack] = useState()
    const [selectedId,setSelectedId] = useState('No')
    const [selectedRow,setSelectedRow] = useState('No')
    const handleOpen = () => {
        const modalElement = document.getElementById("create");
        modalElement.showModal();
    };
    const handleClose = () => {
        const modalElement = document.getElementById("create");
        modalElement.close();
    };
    const handleOpenEdit = () =>{
        const modalElement = document.getElementById("edit");
        setValue("info_track_edit",selectedRow.info_track)
        setValue("type_track_edit",selectedRow.type_track)
        const select = document.querySelector("select[name=type_track_edit]")
        const selectedValue = select.value
        setAnothTrack(selectedValue)
        if (selectedValue == "")
            {
                setAnothTrack("Другой след")
                setValue("type_track_edit","Другой след")
                setValue("another_track_name_edit",selectedRow.type_track)
            }
        modalElement.showModal();
    }
    const handleCloseEdit = () => {
        const modalElement = document.getElementById("edit");
        modalElement.close();
    };
    const getTrack = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/track/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setTrack(result)
        }
        else
            setTrack([])
    }
    const submitTrack = async (d) => {
        d.user_id=userId
        d.case_id=id
        if (d.type_track == "Другой след")
            d.type_track = d.another_track_name
        let response = await fetch(`http://localhost:8000/algorithm/track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getTrack()
    }
    const editTrack = async (d) =>{
        const respbody = {
            "type_track":d.type_track_edit=="Другой след"?d.another_track_name_edit:d.type_track_edit,
            "info_track":d.info_track_edit
        }
        let response = await fetch(`http://localhost:8000/algorithm/track/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(respbody)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getTrack()
    }
    const deleteTrack = async(d)=>{
        let response = await fetch(`http://localhost:8000/algorithm/track/${selectedId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            getTrack()
    }
    useEffect(() => {
        getTrack()
    }, [])
    const columns = [
        {
          width: "30",
          headerName: 'Тип следа',
          field: 'type_track',
        },
        {
          width: 500,
          headerName: 'Описание следа',
          field: 'info_track',
        },
    ];
    function fixedHeaderContent() {
        return (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                variant="head"
                sx={{
                  backgroundColor: 'wheat', border:2,textAlign:'center',width:column.headerName=='Тип следа'?200:800,fontSize:"20px"
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
              <TableCell key={column.field} sx={{border:1,fontSize:"20px",textAlign:'left',backgroundColor:selectedId===row.id_track?'#a0a0a0':'white'}} onClick={()=>{selectRow(row)}}>
                {row[column.field]}
              </TableCell>
            ))}
          </React.Fragment>
        );
    }
    const selectRow = (row) =>{
        if (row.id_track != selectedId)
        {
          setSelectedId(row.id_track)
          setSelectedRow(row)
        }
        else
        {
          setSelectedId('No')
          setSelectedRow('No')
        }
      }
    return (
            <div className='form'>
                <h2>Цифровые следы</h2>
                <div>
                    <Paper sx={{ height: 400, width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                        <TableVirtuoso
                          data={trackInfo}
                          fixedHeaderContent={fixedHeaderContent}
                          itemContent={rowContent} 
                        />
                    </Paper>
                </div>
                <dialog id='create' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Добавление цифрового следа</h2>
                    <Content classname={'no'} submit={handleSubmit(submitTrack)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className='formdiv'>
                                <label>Тип следа</label><br/>
                                <select {...register("type_track",{required:true})} className="select" onChange={()=>{const select = document.querySelector("select[name=type_track]");const selectedValue = select.value;setAnothTrack(selectedValue)}}>
                                    <option value="Файл">Файл</option>
                                    <option value="Сетевой адрес">Сетевой адрес</option>
                                    <option value="Доменное имя">Доменное имя</option>
                                    <option value="Электронное сообщение">Электронное сообщение</option>
                                    <option value="Электронное денежное средство">Электронное денежное средство</option>
                                    <option value="Цифровая валюта">Цифровая валюта</option>
                                    <option value="Электронная подпись">Электронная подпись</option>
                                    <option value="Электронный документ">Электронный документ</option>
                                    <option value="Электронный журнал">Электронный журнал</option>
                                    <option value="База данных">База данных</option>
                                    <option value="Программа для ЭВМ">Программа для ЭВМ</option>
                                    <option value="Вредоносная компьютерная программа">Вредоносная компьютерная программа</option>
                                    <option value="Сайт">Сайт</option>
                                    <option value="Страница сайта">Страница сайта</option>
                                    <option value="Другой след">Другой след</option>
                                </select>
                            </div>
                            <div className='formdiv' style={{display:anothTrack=="Другой след"?'block':'none'}}>
                                <label>Название следа</label>
                                <TextField required={anothTrack == "Другой след"?true:false} type="text" sx={{display:'block'}} {...register('another_track_name')}/>
                            </div>
                            <div className="formdiv">
                                <label>Информация</label>
                                <textarea required className="textarea" {...register("info_track")} placeholder="Информация"></textarea>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Добавить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleClose();setAnothTrack("жж")}}type='reset'>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
                <dialog id='edit' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto'}}>
                    <h2 style={{textAlign:'center',width:"400px"}}>Изменение цифрового следа</h2>
                    <Content classname={'no'} submit={handleSubmit(editTrack)}>
                        <div className='maindiv' style={{textAlign:'center',marginTop:'10px'}}>
                            <div className='formdiv'>
                                <label>Тип следа</label><br/>
                                <select {...register("type_track_edit",{required:true})} className="select" onChange={()=>{const select = document.querySelector("select[name=type_track_edit]");const selectedValue = select.value;setAnothTrack(selectedValue)}}>
                                    <option value="Файл">Файл</option>
                                    <option value="Сетевой адрес">Сетевой адрес</option>
                                    <option value="Доменное имя">Доменное имя</option>
                                    <option value="Электронное сообщение">Электронное сообщение</option>
                                    <option value="Электронное денежное средство">Электронное денежное средство</option>
                                    <option value="Цифровая валюта">Цифровая валюта</option>
                                    <option value="Электронная подпись">Электронная подпись</option>
                                    <option value="Электронный документ">Электронный документ</option>
                                    <option value="Электронный журнал">Электронный журнал</option>
                                    <option value="База данных">База данных</option>
                                    <option value="Программа для ЭВМ">Программа для ЭВМ</option>
                                    <option value="Вредоносная компьютерная программа">Вредоносная компьютерная программа</option>
                                    <option value="Сайт">Сайт</option>
                                    <option value="Страница сайта">Страница сайта</option>
                                    <option value="Другой след">Другой след</option>
                                </select>
                            </div>
                            <div className='formdiv' style={{display:anothTrack=="Другой след"?'block':'none'}}>
                                <label>Название следа</label>
                                <TextField required={anothTrack == "Другой след"?true:false} type="text" sx={{display:'block'}} {...register('another_track_name_edit')}/>
                            </div>
                            <div className="formdiv">
                                <label>Информация</label>
                                <textarea required className="textarea" {...register("info_track_edit")} placeholder="Информация"></textarea>
                            </div>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit'>Изменить</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseEdit();setAnothTrack("жж");setSelectedRow('No');setSelectedId('No')}}type='reset'>Закрыть</Button>
                        </div> 
                    </Content>
                </dialog>
                <Button variant="contained" color='success' size='large' sx={{marginTop:5}} type='button' onClick={()=>handleOpen()}>Добавить</Button>
                <Button variant="contained" color='secondary'  size='large' sx={{marginTop:5,marginLeft:1}} type='button' disabled={selectedId=='No'?true:false} onClick={()=>handleOpenEdit()}>Изменить</Button>
                <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1}} type='button' disabled={selectedId=='No'?true:false} onClick={()=>{deleteTrack();setSelectedRow('No');setSelectedId('No')}}>Удалить</Button>
            </div>
    )
}