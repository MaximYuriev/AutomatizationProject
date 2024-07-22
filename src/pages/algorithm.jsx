import Header from "../components/header"
import Menu from "../components/menu"
import Content from "../components/content"
import { Button, ButtonGroup, Dialog, DialogTitle, Hidden, IconButton, TextField } from "@mui/material"
import { ProfileItems } from "../components/menuitems"
import { AdminProfileItems } from "../components/menuitems"
import { BossProfileItems } from "../components/menuitems"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/authcontext"
import { useForm } from "react-hook-form";
import React from "react"
import { Table, TableBody, TableContainer, TableHead, TableRow,TableCell } from "@mui/material"
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from "react-virtuoso"
import showUpdateMessage from "../utils/showUpdateMessage"
const AlgorithmPage = () =>{
    const {userRole,userId} = useContext(AuthContext)
    const [algorithms,setAlgorithms] = useState()
    const {register, handleSubmit,setValue,getValues} = useForm()
    const [counter,setCounter] = useState(0)
    const [selectedId,setSelectedId] = useState('No')
    const handleOpenCreateAlgorithm = () => {
        const modalElement = document.getElementById("create");
        modalElement.showModal();
    };
    const handleCloseCreateAlgorithm = () => {
        const modalElement = document.getElementById("create");
        modalElement.close();
    };
    const getAlgorithm = async () => {
        const response = await fetch(`http://localhost:8000/api/user_algorithms/${userId}`)
        const result = await response.json()
        if (response.ok)
        {
            setAlgorithms(result)
            console.log(result)
        }
    }
    const addAlgorithm = async (d) =>{
        const algorithm = {
            "algoritm_name":d.algoritm_name,
            "fk_user_id":userId,
            "check_case":d.check_case,
            "clarif":d.clarif,
            "d_criminal":d.d_criminal,
            "d_victim":d.d_victim,
            "expertise":d.expertise,
            "inspect":d.inspect,
            "order_wanted":d.order_wanted,
            "quest":d.quest,
            "reclaim":d.reclaim,
            "request":d.request,
            "set_case":d.set_case,
            "suspect":d.suspect,
            "track":d.track,
            "witnes":d.witnes,
            "extract_case":d.extract_case
        }
        let response = await fetch(`http://localhost:8000/api/algoritms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(algorithm)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
        if (response.ok)
            handleCloseCreateAlgorithm()
    }
    const clickCheckBox = (textName,nameCheckBox)=>{
        const valueCheckBox = getValues(nameCheckBox)
        if (valueCheckBox == false)
        {
            setValue(textName,counter+1) 
            setCounter(counter+1)
        }
        else
        {
            const deletedValue = getValues(textName)
            setValue(textName,0)
            setCounter(counter-1)
            var inputs = document.getElementsByTagName("input")
            for (const input of inputs)
            {
                const checkType = input.getAttribute("type")
                if (checkType === 'number' && input.value > deletedValue)
                    setValue(input.name,input.value-1)
            }
        }
    }
    const columns = [
        {
          width: '30%',
          headerName: 'Название алгоритма',
          field: 'algorithm_name',
        },
        {
          width: '70%',
          headerName: 'Описание',
          field: 'description',
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
                {column.field=='description'?row[column.field].map((description)=>{return(<React.Fragment key={description}>{description}<br/></React.Fragment>)}):row[column.field]}
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
    useEffect(() => {
        getAlgorithm()
    }, [])
    return(
        <>
            <Header text="Алгоритмы"></Header>
            <Menu items={userRole==='2'?ProfileItems:userRole==='1'?AdminProfileItems:BossProfileItems}></Menu>
            <div className="form">
                <div>
                <Paper sx={{ height: 400, width: { xl: '70%',lg: '90%',md: '90%',sm: '100%', xs: '100%' }, display:'inline-block',verticalAlign:"middle",whiteSpace:'inherit'}}>
                    <TableVirtuoso
                      data={algorithms}
                      fixedHeaderContent={fixedHeaderContent}
                      itemContent={rowContent} 
                    />
                </Paper>
                </div>
                <Button variant="contained" color='success' size='large' sx={{marginTop:5,marginRight:1}} type='button' onClick={()=>handleOpenCreateAlgorithm()}>Добавить алгоритм</Button>
                <dialog id='create' style={{verticalAlign:'center',margin:'auto',marginLeft:'auto',width: '450px'}}>
                    <Content classname={'maindiv'} submit={handleSubmit(addAlgorithm)}>
                        <h2 style={{textAlign:'center'}}>Добавление алгоритма</h2>
                        <div className="formdiv">
                            <label>Название алгоритма</label>
                            <TextField required type="text" sx={{display:'block'}} {...register('algoritm_name')}/>
                        </div>
                        <TableContainer sx={{width: { xl: '90%',lg: '90%',md: '90%',sm: '90%', xs: '100%' },margin:'auto',marginTop:1}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontSize:'25px',textAlign:'center',border:1,backgroundColor:'wheat'}} colSpan={2} size="small">Шаги</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Протокол осмотра предметов</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('check_case','c_check_case')} {...register("c_check_case")}/>
                                        <input type='number' className='number' min={0} disabled {...register("check_case",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Получение объяснения от заявителя</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('clarif','c_clarif')} {...register("c_clarif")}/>
                                        <input type='number' className='number' min={0} disabled {...register("clarif",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Постановление о возбуждении уголовного дела</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('d_criminal','c_d_criminal')} {...register("c_d_criminal")}/>
                                        <input type='number' className='number' min={0} disabled {...register("d_criminal",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Постановление о признании потерпевшим</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('d_victim','c_d_victim')} {...register("c_d_victim")}/>
                                        <input type='number' className='number' min={0} disabled {...register("d_victim",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Результат экспертиз</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('expertise','c_expertise')} {...register("c_expertise")}/>
                                        <input type='number' className='number' min={0} disabled {...register("expertise",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Выемка документов, подтверждающих хищение</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('extract_case','c_extract_case')} {...register("c_extract_case")}/>
                                        <input type='number' className='number' min={0} disabled {...register("extract_case",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Протокол осмотра места происшествия</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('inspect','c_inspect')} {...register("c_inspect")}/>
                                        <input type='number' className='number' min={0} disabled {...register("inspect",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Направление поручений органам дознания</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('order_wanted','с_order_wanted')} {...register("с_order_wanted")}/>
                                        <input type='number' className='number' min={0} disabled {...register("order_wanted",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Допрос потерпевшего</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('quest','c_quest')} {...register("c_quest")}/>
                                        <input type='number' className='number' min={0} disabled {...register("quest",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Истребование необходимых документов</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('reclaim','с_reclaim')} {...register("с_reclaim")}/>
                                        <input type='number' className='number' min={0} disabled {...register("reclaim",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Направление запросов</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('request','c_request')} {...register("c_request")}/>
                                        <input type='number' className='number' min={0} disabled {...register("request",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Установление средства совершения преступления</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('set_case','c_set_case')} {...register("c_set_case")}/>
                                        <input type='number' className='number' min={0} disabled {...register("set_case",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Допрос подозреваемых</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('suspect','c_suspect')} {...register("c_suspect")}/>
                                        <input type='number' className='number' min={0} disabled {...register("suspect",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Цифровые следы</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('track','с_track')} {...register("с_track")}/>
                                        <input type='number' className='number' min={0} disabled {...register("track",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1,width:'70%'}} size="small">Допрос свидетелей</TableCell>
                                    <TableCell sx={{fontSize:'20px',textAlign:'left',border:1}} size="small">
                                        <input type='checkbox' className='checkcreate' onClick={()=>clickCheckBox('witnes','c_witnes')} {...register("c_witnes")}/>
                                        <input type='number' className='number' min={0} disabled {...register("witnes",{value: 0})}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                            <Button variant="contained" color='success' size='large' sx={{marginTop:2,marginBottom:2}} type='submit' disabled={counter>=3?false:true}>Создать</Button>
                            <Button variant="contained" color='error' size='large' sx={{marginTop:2,marginBottom:2,marginLeft:1}} onClick={()=>{handleCloseCreateAlgorithm()}}>Закрыть</Button>
                    </Content>
                </dialog>
            </div>
        </>
    )
}
export default AlgorithmPage