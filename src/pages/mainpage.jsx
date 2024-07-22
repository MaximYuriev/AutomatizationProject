import Content from "../components/content"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/authcontext"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Table, TableBody, TableContainer, TableHead } from "@mui/material"
import React from "react"
import { Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
const MainCasePage = () => {
    const {id} = useParams()
    const [cases,setCases] = useState()
    const [individual,setIndividual] = useState()
    const [expertise,setExpertise] = useState()
    const [set,setSet] = useState()
    const [track,setTrack] = useState()
    const [openMain,setOpenMain] = useState(true)
    const [openIndividual,setOpenIndividual] = useState(true)
    const [openExpertise,setOpenExpertise] = useState(true)
    const [openSet,setOpenSet] = useState(true)
    const [openTrack,setOpenTrack] = useState(true)
    const [openDoc,setOpenDoc] = useState(true)
    const [openQuest,setOpenQuest] = useState(true)
    const [openRequest,setOpenRequest] = useState(true)
    const [openProgDocs,setOpenProgDocs] =useState(true)
    const {userId} = useContext(AuthContext)
    const [passports,setPassports] = useState()
    const [incomes,setIncomes] = useState()
    const [detailings,setDetailings] = useState()
    const [moneyOrders,setMoneyOrders] = useState()
    const [detailings_2,setDetailings_2] = useState()
    const [screenshots,setScreenshots] = useState()
    const [request,setRequest] = useState()
    const [documents,setDocuments] = useState()
    const [quest,setQuest] = useState()
    const changeOpenMain = (openBlock,setOpenBlock) =>{
        openBlock?setOpenBlock(false):setOpenBlock(true)
    }

    const getCases = async() =>{
        const response = await fetch(`http://localhost:8000/api/case_all_info/${id}`)
        const result = await response.json()
        setCases(result)
    }
    const getIndividual = async() =>{
        const response = await fetch(`http://localhost:8000/api/get_individual/${id}`)
        const result = await response.json()
        setIndividual(result)
    }
    const getExpertise = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/expertise/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setExpertise(result)
        }
    }
    const getSet = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/set/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setSet(result)
        }
    }
    const getTrack = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/track/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setTrack(result)
        }
    }
    const getPassports = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/get_passport`)
        const result = await response.json()
        if (response.ok)
        {
            setPassports(result)
        }
        else
            setPassports(undefined)
    }
    const getIncomes = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/get_income`)
        const result = await response.json()
        if (response.ok)
        {
            setIncomes(result)
        }
        else
            setIncomes(undefined)
    }
    const getDetailings = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/get_detailing`)
        const result = await response.json()
        if (response.ok)
        {
            setDetailings(result)
        }
        else
            setDetailings(undefined)
    }
    const getMoneyOrders = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/extract/${id}/get_money_orders`)
        const result = await response.json()
        if (response.ok)
        {
            setMoneyOrders(result)
        }
        else
            setMoneyOrders(undefined)
    }
    const getDetailings_2 = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/extract/${id}/get_detailing`)
        const result = await response.json()
        if (response.ok)
        {
            setDetailings_2(result)
        }
        else
        setDetailings_2(undefined)
    }
    const getScreenshots = async () => {
        const response = await fetch(`http://localhost:8000/algorithm/extract/${id}/get_screenshot`)
        const result = await response.json()
        if (response.ok)
        {
            setScreenshots(result)
        }
        else
            setScreenshots(undefined)
    }
    const getRequestFiles = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/documents/get_all_requests/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setRequest(result)
        }
    }
    const getDocsFiles = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/documents/get_all_docs/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setDocuments(result)
        }
    }
    const getQuestFiles = async () =>{
        const response = await fetch(`http://localhost:8000/algorithm/documents/get_all_quest/${id}`)
        const result = await response.json()
        if (response.ok)
        {
            setQuest(result)
        }
    }
    useEffect(() => {
        getCases()
        getIndividual()
        getExpertise()
        getSet()
        getTrack()
        getPassports()
        getIncomes()
        getDetailings()
        getMoneyOrders()
        getDetailings_2()
        getScreenshots()
        getRequestFiles()
        getDocsFiles()
        getQuestFiles()
    }, [])
    var detailingItem = 0
    if (detailings!=undefined)
        var detailingItem = detailings.map((detailing) => {
            return ( 
                <b key={detailing}>
                    {detailing}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadDetailing(detailing)}><DownloadIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const downloadDetailing = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/detailing_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    var incomeItem = 0
    if (incomes!=undefined)
        var incomeItem = incomes.map((income) => {
            return ( 
                <b key={income}>
                    {income}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadIncome(income)}><DownloadIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const downloadIncome = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/income_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    var passportItem = 0
    if (passports!=undefined)
        var passportItem = passports.map((passport) => {
            return ( 
                <b key={passport}>
                    {passport}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadPassport(passport)}><DownloadIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const downloadPassport = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/reclaim/${id}/passport_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    var moneyOrd = 0
    if (moneyOrders!=undefined)
        var moneyOrd = moneyOrders.map((moneyOrder) => {
            return ( 
                <b key={moneyOrder}>
                    {moneyOrder}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadMoneyOrders(moneyOrder)}><DownloadIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const downloadMoneyOrders = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/money_orders_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    var detailingItem_2 = 0
    if (detailings_2!=undefined)
        var detailingItem_2 = detailings_2.map((detailing_2) => {
            return ( 
                <b key={detailing_2}>
                    {detailing_2}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadDetailing_2(detailing_2)}><DownloadIcon/></IconButton>
                    <br/>
                </b>
            )
        })
    const downloadDetailing_2 = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/detailing_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    var screenshotItem = 0
    if (screenshots!=undefined)
        var screenshotItem = screenshots.map((screenshot) => {
            return ( 
                <b key={screenshot}>
                    {screenshot}
                    <IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadScreenshots(screenshot)}><DownloadIcon/></IconButton>
                    <br/>
                </b>
            )
        })
        
    const downloadScreenshots = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/extract/${id}/screenshot_download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const downloadDocuments = async (filename)=>{
        let response = await fetch(`http://localhost:8000/algorithm/documents/${id}/download/${filename}`)
        const result = await response.blob()
        if (response.ok)
        {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(result);
            a.download = `${filename}`;
            a.click();
        }
    }
    const InfoCases = () => {
        if(cases!=undefined)
        {
        return(
            <TableBody>
                <TableRow>
                    <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                        <Toolbar>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                Основная информация о деле 
                            </Typography>
                            <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openMain,setOpenMain)}>
                                <ArrowDownwardIcon sx={{display:openMain?'table-row':'none'}}/>
                                <ArrowUpwardOutlinedIcon sx={{display:openMain?'none':'table-row'}}/>
                            </IconButton>
                        </Toolbar>
                    </TableCell>
                </TableRow>
                <TableRow sx={{display:openMain?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Номер дела</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.number_cases}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openMain?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата создания</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.StatementDate.slice(-2)}.{cases.StatementDate.slice(-5,-3)}.{cases.StatementDate.slice(0,4)}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openMain?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Следователь</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.UserFio}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openMain?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Текст заявления</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.StatementText}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openMain?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Название алгоритма</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.NameAlgoritm}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openMain?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Статус</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.Status}</b></TableCell>
                </TableRow>
            </TableBody>
        )}
        else 
        return(
            <TableBody>
                <TableRow>
                    <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                        <h3>Загрузка...</h3>
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }
    const InfoIndividual = () => {
        if(individual!=undefined && cases!=undefined)
        {
        return(
            <TableBody>
                <TableRow>
                    <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                        <Toolbar>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                Информация о заявителе
                            </Typography>
                            <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openIndividual,setOpenIndividual)}>
                                <ArrowDownwardIcon sx={{display:openIndividual?'table-row':'none'}}/>
                                <ArrowUpwardOutlinedIcon sx={{display:openIndividual?'none':'table-row'}}/>
                            </IconButton>
                        </Toolbar>
                    </TableCell>
                </TableRow>
                <TableRow sx={{display:openIndividual?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Заявитель</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{cases.IndividualFio}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openIndividual?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Серия и номер паспорта</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.passport_serial}&nbsp;{individual.passport_number}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openIndividual?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Дата рождения</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.datebirthday.slice(-2)}.{individual.datebirthday.slice(-5,-3)}.{individual.datebirthday.slice(0,4)}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openIndividual?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Пол</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.sex}</b></TableCell>
                </TableRow>
                <TableRow sx={{display:openIndividual?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Место жительства</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{individual.place_of_residence}</b></TableCell>
                </TableRow>
                
                <TableRow sx={{display:openIndividual?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Контактный телефон</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>8{individual.phone}</b></TableCell>
                </TableRow>
            </TableBody>
        )}
    }
    const InfoExperitse = () =>{
        if(expertise!=undefined)
            {
            return(
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Экспертизы
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openExpertise,setOpenExpertise)}>
                                    <ArrowDownwardIcon sx={{display:openExpertise?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openExpertise?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{display:openExpertise?'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Аппаратно-компьютерная</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{expertise.app_comp}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openExpertise?'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Программно-компьютерная</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{expertise.prog_comp}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openExpertise?'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Информационно-компьютерная</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{expertise.inf_comp}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openExpertise?'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Компьютерно-сетевая</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{expertise.comp_net}</b></TableCell>
                    </TableRow>
                </TableBody>
            )}
    }
    const InfoSet = () =>{
        if(set!=undefined)
            {
            return(
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Средство совершения преступления
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openSet,setOpenSet)}>
                                    <ArrowDownwardIcon sx={{display:openSet?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openSet?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{display:openSet?'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Средство совершения преступления</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{set.criminal}</b></TableCell>
                    </TableRow>
                </TableBody>
            )}
    }
    const InfoTrack = () =>{
        if (track != undefined)
        {
            const trackItem = track.map((trck)=>{
                return(
                    <TableRow key={trck.id_track} sx={{display:openTrack?'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">
                            {trck.type_track}
                        </TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                            {trck.info_track}
                        </TableCell>
                    </TableRow>
                )
            })
            return(
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Цифровые следы
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openTrack,setOpenTrack)}>
                                    <ArrowDownwardIcon sx={{display:openTrack?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openTrack?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    {trackItem}
                </TableBody>
            )
        }
    }
    const InfoDocuments = ()=>{
        if(cases != undefined)
        return(
        <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Приложенные документы
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openDoc,setOpenDoc)}>
                                    <ArrowDownwardIcon sx={{display:openDoc?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openDoc?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{display:openDoc?passportItem==0?'none':'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Копия паспорта</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{passportItem==0?'Данные не найдены':passportItem}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openDoc?incomeItem==0?'none':'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Справки о доходах потерпевшего и его семьи</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{incomeItem==0?'Данные не найдены':incomeItem}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openDoc?detailingItem==0?'none':'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Детализация телефонных разговоров</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{detailingItem==0?'Данные не найдены':detailingItem}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openDoc?moneyOrd==0?'none':'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Платежные поручения</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{moneyOrd==0?'Данные не найдены':moneyOrd}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openDoc?detailingItem_2==0?'none':'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Детализация соединений по номеру</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{detailingItem_2==0?'Данные не найдены':detailingItem_2}</b></TableCell>
                    </TableRow>
                    <TableRow sx={{display:openDoc?screenshotItem==0?'none':'table-row':'none'}}>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">Скриншоты экрана с перепиской</TableCell>
                        <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{screenshotItem==0?'Данные не найдены':screenshotItem}</b></TableCell>
                    </TableRow>
                </TableBody>
            </React.Fragment>)
    }
    const InfoRequest = ()=>{
        if (request != undefined)
        {
            var requestItem = request.map((reqst)=>{
            return(
                <TableRow key={reqst} sx={{display:openRequest?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">{reqst.slice(0,-5)}</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{reqst}<IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadDocuments(reqst)}><DownloadIcon/></IconButton></b></TableCell>
                </TableRow>
            )
            })
            return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Сформированные запросы
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openRequest,setOpenRequest)}>
                                    <ArrowDownwardIcon sx={{display:openRequest?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openRequest?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    {requestItem}
                </TableBody>
            </React.Fragment>
            )
        }
    }
    const InfoProgDocs = ()=>{
        if (documents != undefined)
        {
            var documentsItem = documents.map((document)=>{
            return(
                <TableRow key={document} sx={{display:openProgDocs?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">{document.slice(0,-5)}</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{document}<IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadDocuments(document)}><DownloadIcon/></IconButton></b></TableCell>
                </TableRow>
            )
            })
            return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Сформированные документы
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openProgDocs,setOpenProgDocs)}>
                                    <ArrowDownwardIcon sx={{display:openProgDocs?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openProgDocs?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    {documentsItem}
                </TableBody>
            </React.Fragment>
            )
        }
    }
    const InfoQuest = ()=>{
        if (quest != undefined)
        {
            var questItem = quest.map((qst)=>{
            return(
                <TableRow key={qst} sx={{display:openQuest?'table-row':'none'}}>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'30%'}} size="small">{qst.slice(0,-5)=='Допрос потерпевшего'?'Допрос потерпевшего':qst.slice(0,16)=='Допрос свидетеля'?'Допрос свидетеля':'Допрос подозреваемого'}</TableCell>
                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small"><b>{qst}<IconButton size='small' color='success' tabIndex={-1} onClick={()=>downloadDocuments(qst)}><DownloadIcon/></IconButton></b></TableCell>
                </TableRow>
            )
            })
            return(
            <React.Fragment>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
                                    Протоколы допросов
                                </Typography>
                                <IconButton size="large" color="inherit" onClick={()=>changeOpenMain(openQuest,setOpenQuest)}>
                                    <ArrowDownwardIcon sx={{display:openQuest?'table-row':'none'}}/>
                                    <ArrowUpwardOutlinedIcon sx={{display:openQuest?'none':'table-row'}}/>
                                </IconButton>
                            </Toolbar>
                        </TableCell>
                    </TableRow>
                    {questItem}
                </TableBody>
            </React.Fragment>
            )
        }
    }
    return (
        <Content>
            <div className="maindiv">
            <TableContainer sx={{width: { xl: '50%',lg: '50%',md: '50%',sm: '100%', xs: '100%' },marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}>
                <Table>
                    <InfoCases/>
                    <InfoIndividual/>
                    <InfoDocuments/>
                    <InfoProgDocs/>
                    <InfoQuest/>
                    <InfoRequest/>
                    <InfoTrack/>
                    <InfoSet/>
                    <InfoExperitse/>
                </Table>
            </TableContainer>
            </div>
        </Content>
    )
}

export default MainCasePage