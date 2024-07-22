import Button from '@mui/material/Button';
import Content from '../components/content';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import showUpdateMessage from '../utils/showUpdateMessage';
import { ButtonGroup, Dialog, DialogTitle, Hidden, TextField } from "@mui/material"
export const Request = () => {
    const {id} = useParams()
    const [openBank,setOpenBank] = useState(false)
    const [openMobile,setOpenMobile] = useState(false)
    const [openDomain, setOpenDomain] = useState(false)
    const [method,setMethod] = useState()
    const handleOpenBank = () =>{
        setOpenBank(true)
    }
    const handleCloseBank = () =>{
        setOpenBank(false)
    }
    const handleOpenMobile = () =>{
        setOpenMobile(true)
    }
    const handleCloseMobile = () =>{
        setOpenMobile(false)
    }
    const handleOpenDomain = () =>{
        setOpenDomain(true)
    }
    const handleCloseDomain = () =>{
        setOpenDomain(false)
    }
    const submitBankRequest = async (d) => {
        d.money = method==undefined?d.money:"0"
        let response = await fetch(`http://localhost:8000/algorithm/request/bank/download/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        
        if (response.ok)
        {
            const result = await response.blob()
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = "Запрос в банк.docx";
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
        else 
        {   
            var res = await response.json()
            showUpdateMessage(res.message,response.ok)
        }
    }
    const submitMobileRequest = async (d) => {
        d.money = method==undefined?d.money:"0"
        let response = await fetch(`http://localhost:8000/algorithm/request/mobile_operator/download/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        if (response.ok)
        {
            const result = await response.blob()
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = "Запрос мобильным операторам.docx";
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
        else 
        {   
            var res = await response.json()
            showUpdateMessage(res.message,response.ok)
        }
    }
    const submitDomainRequest = async (d) => {
        d.money = method==undefined?d.money:"0"
        let response = await fetch(`http://localhost:8000/algorithm/request/domain/download/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d)
        })
        if (response.ok)
        {
            const result = await response.blob()
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = "Запрос оператору доменного имени.docx";
            a.click();
            showUpdateMessage("Документ сформирован!",true)
        }
        else 
        {   
            var res = await response.json()
            showUpdateMessage(res.message,response.ok)
        }
    }
    const getMethod = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/declaration_criminal_case/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setMethod(result)
        }
        else
            setMethod(undefined)
    }
    useEffect(() => {
        getMethod()
    }, [])
    const {register, handleSubmit} = useForm()
    return (
            <div className='form'>
                <h2>Направление запросов</h2>
                <Button className="btn" variant="contained" size='large' type='submit' sx={{marginTop:5, display:'block', marginLeft:'auto', marginRight:'auto', width:300}} onClick={handleOpenMobile}>Запрос оператору связи</Button>
                <Button className="btn" variant="contained" size='large' type='submit' sx={{marginTop:5, display:'block', marginLeft:'auto', marginRight:'auto', width:300}} onClick={handleOpenDomain}>Запрос регистратору доменного имени</Button>
                <Button className="btn" variant="contained" size='large' type='submit' sx={{marginTop:5, display:'block', marginLeft:'auto', marginRight:'auto', width:300}} onClick={handleOpenBank}>Запрос в банки и кредитные организации</Button>
                <Button className="btn" variant="contained" size='large' type='submit' disabled sx={{marginTop:5, display:'block', marginLeft:'auto', marginRight:'auto', width:300}}>Проверка информации по базам ИЦ и ГИАЦ</Button>
                <Dialog open={openBank} onClose={handleCloseBank}>
                    <h2 style={{margin:'10px'}}>Запрос в банки и кредитные организации</h2>
                    <Content classname={'dialog'} submit={handleSubmit(submitBankRequest)}>
                        <div className='maindiv' style={{marginTop:'25px'}}>
                            <div className='formdiv'>
                                <label>Название банка</label>
                                <TextField required type="text" sx={{display:'block'}} {...register('bank')} placeholder='АО «Альфа Банк»'/>
                            </div>
                            <div className='formdiv' style={{display:method==undefined?'block':'none'}}>
                                <label>Сколько похищенно средств?</label>
                                <TextField required={method==undefined?true:false} type="text" sx={{display:'block'}} {...register('money')} placeholder='1140 руб., 45 коп.'/>
                            </div>
                        </div>
                        <Button variant="contained" size='large' sx={{marginTop:5,marginBottom:2}} type='submit'>Сформировать запрос</Button>
                        <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1,marginBottom:2}} onClick={handleCloseBank} type='button'>Отменить</Button>
                    </Content>
                </Dialog>
                <Dialog open={openMobile} onClose={handleCloseMobile}>
                    <h2 style={{margin:'10px',textAlign:'center'}}>Запрос оператору связи</h2>
                    <Content classname={'dialog'} submit={handleSubmit(submitMobileRequest)}>
                        <div className='maindiv' style={{marginTop:'25px'}}>
                            <div className='formdiv'>
                                <label>Сотовый оператор</label>
                                <TextField required type="text" sx={{display:'block'}} {...register('name_org')} placeholder='ПАО МТС'/>
                            </div>
                            <div className='formdiv' style={{display:method==undefined?'block':'none'}}>
                                <label>Сколько похищенно средств?</label>
                                <TextField required={method==undefined?true:false} type="text" sx={{display:'block'}} {...register('money')} placeholder='1140 руб., 45 коп.'/>
                            </div>
                            <div className='formdiv'>
                                <label>Звонивший номер</label>
                                <TextField required type="text" sx={{display:'block'}} {...register('phone')} placeholder='8-499-769-34-13'/>
                            </div>
                            <div className='formdiv'>
                                <label>Дата и время звонка</label><br/>
                                <TextField required type="date" sx={{display:'inline-block',marginRight:1}} {...register('date_incidient')}/>
                                <TextField required type="time" sx={{display:'inline-block'}} {...register('time')} placeholder='АО «Альфа Банк»'/><br/>
                            </div>
                            <div className='formdiv'>
                                <label>Длительность звонка</label>
                                <TextField required type="text" sx={{display:'block'}} {...register('duration')} placeholder='11 минут 24 секунды'/>
                            </div>
                        </div>
                        <Button variant="contained" size='large' sx={{marginTop:5,marginBottom:2,marginLeft:2}} type='submit'>Сформировать запрос</Button>
                        <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1,marginBottom:2,marginRight:2}} onClick={handleCloseMobile} type='button'>Отменить</Button>
                    </Content>
                </Dialog>
                <Dialog open={openDomain} onClose={handleCloseDomain}>
                    <h2 style={{margin:'10px',textAlign:'center'}}>Запрос регистратору доменного имени</h2>
                    <Content classname={'dialog'} submit={handleSubmit(submitDomainRequest)}>
                        <div className='maindiv' style={{marginTop:'25px'}}>
                            <div className='formdiv'>
                                <label>Название организации</label>
                                <TextField required type="text" sx={{display:'block'}} {...register('org_name')} placeholder='ООО Организация'/>
                            </div>
                            <div className='formdiv'>
                                <label>Фамилия руководителя</label><br/>
                                <TextField required type="text" sx={{display:'block',marginRight:1}} placeholder='Фамилия'{...register('first_name')}/>
                            </div>
                            <div className='formdiv'>
                                <label>Имя руководителя</label><br/>
                                <TextField required type="text" sx={{display:'block',marginRight:1}} placeholder='Имя'{...register('middle_name')}/>
                            </div>
                            <div className='formdiv'>
                                <label>Отчество руководителя</label><br/>
                                <TextField required type="text" sx={{display:'block',marginRight:1}} placeholder='Отчество'{...register('last_name')}/>
                            </div>
                            <div className='formdiv'>
                                <label>Доменное имя</label>
                                <TextField required type="text" sx={{display:'block'}} {...register('domain_name')} placeholder='google.com'/>
                            </div>
                            <div className='formdiv'>
                                <label>Адрес организации</label>
                                <textarea className="textarea" {...register("adress")} placeholder="пр-д Березовой Рощи, дом 12, этаж 2 комната 4, г. Москва, 125252"></textarea>
                            </div>
                            <div className='formdiv' style={{display:method==undefined?'block':'none'}}>
                                <label>Сколько похищенно средств?</label>
                                <TextField required={method==undefined?true:false} type="text" sx={{display:'block'}} {...register('money')} placeholder='1140 руб., 45 коп.'/>
                            </div>
                        </div>
                        <Button variant="contained" size='large' sx={{marginTop:5,marginBottom:2,marginLeft:2}} type='submit'>Сформировать запрос</Button>
                        <Button variant="contained" color='error' size='large' sx={{marginTop:5,marginLeft:1,marginBottom:2,marginRight:2}} onClick={handleCloseDomain} type='button'>Отменить</Button>
                    </Content>
                </Dialog>
            </div>
        )
}