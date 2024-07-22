import Content from "../components/content"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import showUpdateMessage from "../utils/showUpdateMessage";
import { AdminProfileItems } from "../components/menuitems";
import Menu from "../components/menu";
import Header from "../components/header";
const Department = () => {
    const handleSignUp = async (d) => {
        let response = await fetch("http://localhost:8000/api/department", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d)
        })
        let result = await response.json()
        showUpdateMessage(result.message,response.ok)
    }
    const {register,control, handleSubmit} = useForm()
    return (
        <>
            <Header text={"Создание отдела"}></Header>
            <Menu items={AdminProfileItems}></Menu>
            <Content submit={handleSubmit(handleSignUp)}>
                <div className="maindiv">
                    <div className="formdiv">
                        <label>Название отдела</label>
                        <TextField required sx={{display:'block'}} type="text" {...register("name_department")}/>
                    </div>
                    <div className="formdiv">
                        <label>Город</label>
                        <TextField sx={{display:'block'}} type="text" {...register("city")}/>
                    </div>
                    <div className="formdiv">
                        <label>Улица</label>
                        <TextField required sx={{display:'block'}} type="text" {...register("street")}/>
                    </div>
                    <div className="formdiv">
                        <label>Номер дома</label>
                        <TextField required sx={{display:'block'}} type="text" {...register("house_number")}/>
                    </div>
                    <div className="formdiv">
                        <label>Почтовый индекс</label>
                        <TextField required sx={{display:'block'}} type="text" {...register("postal_code")}/>
                    </div>
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit' >Создать новый отдел</Button>
            </Content>
        </>
    )
}

export default Department