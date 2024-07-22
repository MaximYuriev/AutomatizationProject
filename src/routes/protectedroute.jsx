import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext)
    if(isAuthenticated==="false"){
        return <Navigate to="/auth" replace/>
    }
    return children
}
export const ProtectedMainPageRoute = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext)
    if(isAuthenticated==="false"){
        return <Navigate to="/auth" replace/>
    }
    return <Navigate to="/profile" replace/>
}
export const ProtectedAdminRoute = ({children}) => {
    const {userRole} = useContext(AuthContext)
    
    if (userRole==="1"){
        return children
    }
    return <Navigate to="/profile" replace/>
}
export const ProtectedSledRoute = ({children}) => {
    const { userRole } = useContext(AuthContext)
    if(userRole != 2){
        return <Navigate to={`/cases`} replace/>
    }
    return children
}
export const ProtectedNachRoute = ({children}) => {
    const { userRole } = useContext(AuthContext)
    if(userRole != 4){
        return <Navigate to={`/profile`} replace/>
    }
    return children
}
export const ProtectedLoginRoute = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext)
    if(isAuthenticated==="true"){
        return <Navigate to="/" replace/>
    }
    return children
}