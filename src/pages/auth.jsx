import Content from "../components/content"
import AuthHeader from "../components/headerauth"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useForm } from "react-hook-form";
import showLoginMessage from "../utils/showLoginMessage";
const Auth = () => {
    const {toggleAuth } = useContext(AuthContext)
    const {register, handleSubmit} = useForm()
    const handleSignIn = async (d) => {
        const logInUser = {
          "name":d.name,
          "password":d.password,
        }
        let response = await fetch("http://localhost:8000/api/users/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logInUser)
        })
        let result = await response.json()
        if (response.ok)
        {
            toggleAuth(result.id,result.FK_user_roles_id)
        }
        else
        {
            showLoginMessage(result.message)
        }
    }
    return (
        <>
            <AuthHeader text={"Авторизация"}></AuthHeader>
            <Content submit={handleSubmit(handleSignIn)}>
                <div className="maindiv">
                    <div className="formdiv">
                        <label className="labelAuth">Логин</label>
                        <TextField required type="text" sx={{display:'block'}} {...register("name")}/>
                    </div>
                    <div className="formdiv">
                        <label className="labelAuth">Пароль</label>
                        <TextField required type="password" sx={{display:'block'}} {...register("password")}/>
                    </div>  
                </div>
                <Button variant="contained" size='large' sx={{marginTop:5}} type='submit'>Войти</Button>
            </Content>
        </>
    )
}

export default Auth