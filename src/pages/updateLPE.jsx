import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '../components/customtabpanel';
import a11yProps from '../components/properyfortabpanel';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Content from "../components/content"
import Header from "../components/header"
import Menu from "../components/menu"
import { SettingItems } from "../components/menuitems"
import showUpdateMessage from '../utils/showUpdateMessage';
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
export const UpdateLoginPasswordEmail = ()=> {
    const [value, setValue] = React.useState(0);
    const {userId} = useContext(AuthContext)
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const updateLogin = async (d) => {
      if(d.oldLogin==d.newLogin)
        return(showUpdateMessage('Новый логин не должен совпадать со старым',false))
      const updateUserLogin = {
          "old_data":d.oldLogin,
          "new_data":d.newLogin
      }
      let response = await fetch(`http://localhost:8000/api/edit_login/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateUserLogin)
      })
      let result = await response.json()
      showUpdateMessage(result.message,response.ok)
    }
    const updateEmail = async (d) => {
      if(d.oldEmail==d.newEmail)
        return(showUpdateMessage('Новая почта не должна совпадать со старой',false))
      const updateUserEmail = {
          "old_data":d.oldEmail,
          "new_data":d.newEmail
      }
      let response = await fetch(`http://localhost:8000/api/edit_email/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateUserEmail)
      })
      let result = await response.json()
      showUpdateMessage(result.message,response.ok)
    }
    const updatePassword = async (d) => {
      if(d.oldPassword==d.newPassword)
        return(showUpdateMessage('Новый пароль не должен совпадать со старым',false))
      if (d.newPassword != d.repeatNewPassword)
        return(showUpdateMessage("Пароли не совпадают",false))
      const updateUserPassword = {
          "old_password":d.oldPassword,
          "new_password":d.newPassword
      }
      let response = await fetch(`http://localhost:8000/api/edit_password_user/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateUserPassword)
      })
      let result = await response.json()
      showUpdateMessage(result.message,response.ok)
    }
    const {register, handleSubmit} = useForm()
    return (
      <>
        <Header text={"Настройки аккаунта"}></Header>
        <Menu items={SettingItems}></Menu>
        <div className='form'>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Изменить логин" {...a11yProps(0)} />
            <Tab label="Изменить почту" {...a11yProps(1)} />
            <Tab label="Изменить пароль" {...a11yProps(2)} />
          </Tabs>
        </div>
          <Content classname='newform' submit={handleSubmit(updateLogin)}>
            <CustomTabPanel value={value} index={0}>
                <label>Текущий логин</label>
                <input required type='text' placeholder='Введите текущий логин' {...register("oldLogin")} className='input'></input>
                <label className='formdiv'>Новый логин</label>
                <input required type='text' placeholder='Введите новый логин' {...register("newLogin")} className='input'></input>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit' >Сохранить</Button>
            </CustomTabPanel>
          </Content>
          <Content classname='newform' submit={handleSubmit(updateEmail)}>
            <CustomTabPanel value={value} index={1}>
                <label>Текущая почта</label>
                <input required type='email' placeholder='Введите текущую почту' {...register("oldEmail")} className='input'></input>
                <label className='formdiv'>Новая почта</label>
                <input required type='email' placeholder='Введите новую почту' {...register("newEmail")} className='input'></input>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
            </CustomTabPanel>
          </Content>
          <Content classname='newform' submit={handleSubmit(updatePassword)}>
            <CustomTabPanel value={value} index={2}>
                  <label>Текущий пароль</label>
                  <input required type='password' placeholder='Введите текущий пароль' {...register("oldPassword")} className='input'></input>
                  <label className='formdiv'>Новый пароль</label>
                  <input required type='password' placeholder='Введите новый пароль' {...register("newPassword")} className='input'></input>
                  <label className='formdiv'>Повторите новый пароль</label>
                  <input required type='password' placeholder='Повторите ввод' {...register("repeatNewPassword")} className='input'></input>
                  <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Сохранить</Button>
            </CustomTabPanel>
          </Content>
      </>
    );
}