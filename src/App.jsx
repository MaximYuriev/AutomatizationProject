import './App.css'
import { createContext } from 'react'
import { useState } from 'react'
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import { ProtectedRoute,ProtectedLoginRoute,ProtectedMainPageRoute,ProtectedAdminRoute,ProtectedSledRoute,ProtectedNachRoute} from './routes/protectedroute';
import Profile from './pages/profile';
import { UpdateLoginPasswordEmail } from './pages/updateLPE';
import UpdateProfile from './templates/updatepage';
import Registr from './pages/registr';
import Department from './pages/department';
import Cases from './pages/cases';
import Case from './templates/case';
import { Clarif } from './pages/clarif';
import { Inspect } from './pages/inspect';
import { Track } from './pages/track';
import { Check } from './pages/check';
import { Reclaim } from './pages/reclaim';
import { Request } from './pages/request';
import { Quest } from './pages/quest';
import { Extract } from './pages/extract';
import { Witnes } from './pages/witnes';
import { Set } from './pages/set';
import { Expertise } from './pages/expertise';
import MainCasePage from './pages/mainpage';
import StatementPage from './pages/statement';
import AlgorithmPage from './pages/algorithm';
import { Victim } from './pages/declarationvictim';
import { Criminal } from './pages/declarationcriminal';
import { Order } from './pages/orderwanted';
import { Suspect } from './pages/suspect';
import DepartmentUsers from './pages/depuser';
export const DrawerContext = createContext();
function App() {
  const [open, setOpen] = useState(true)
  const openDrawer = () => {
    setOpen((prev)=>!prev);
  };
  return (
    <SnackbarProvider>
      <DrawerContext.Provider value={{open,openDrawer}}>
        <BrowserRouter>
         <Routes>
            <Route path="*" element={<ProtectedMainPageRoute/>}/>
            <Route path="/" element={<ProtectedMainPageRoute/>}/>
            <Route path="/auth" element={<ProtectedLoginRoute><Auth/></ProtectedLoginRoute>} />
            <Route path="/profile" element= {<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/department_user" element={<ProtectedNachRoute><DepartmentUsers/></ProtectedNachRoute>}/>
            <Route path="/settings">
              <Route index element={<ProtectedMainPageRoute/>}/>
              <Route path="1" element={<ProtectedRoute><UpdateLoginPasswordEmail/></ProtectedRoute>}/>
              <Route path="2" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
              <Route path="3" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
            </Route>
            <Route path="/reg" element={<ProtectedAdminRoute><Registr/></ProtectedAdminRoute>}/>
            <Route path="/algorithm" element={<ProtectedRoute><AlgorithmPage/></ProtectedRoute>}/>
            <Route path="/new_department" element={<ProtectedAdminRoute><Department/></ProtectedAdminRoute>}/>
            <Route path="/cases" element={<ProtectedRoute><Cases/></ProtectedRoute>}/>
            <Route path="/case/:id" element={<ProtectedRoute><Case/></ProtectedRoute>}>
              <Route index element={<Navigate to="main"/>}/>
              <Route path="main" element={<MainCasePage/>}/>
              <Route path="statement" element={<ProtectedSledRoute><StatementPage/></ProtectedSledRoute>}/>
              <Route path="check_case" element={<ProtectedSledRoute><Check/></ProtectedSledRoute>}/>
              <Route path="clarif" element={<ProtectedSledRoute><Clarif/></ProtectedSledRoute>}/>
              <Route path="d_victim" element={<ProtectedSledRoute><Victim/></ProtectedSledRoute>}/>
              <Route path="d_criminal" element={<ProtectedSledRoute><Criminal/></ProtectedSledRoute>}/>
              <Route path="expertise" element={<ProtectedSledRoute><Expertise/></ProtectedSledRoute>}/>
              <Route path="extract_case" element={<ProtectedSledRoute><Extract/></ProtectedSledRoute>}/>
              <Route path="reclaim" element={<ProtectedSledRoute><Reclaim/></ProtectedSledRoute>}/>
              <Route path="inspect" element={<ProtectedSledRoute><Inspect/></ProtectedSledRoute>}/>
              <Route path="order_wanted" element={<ProtectedSledRoute><Order/></ProtectedSledRoute>}/>
              <Route path="quest" element={<ProtectedSledRoute><Quest/></ProtectedSledRoute>}/>
              <Route path="request" element={<ProtectedSledRoute><Request/></ProtectedSledRoute>}/>
              <Route path="set_case" element={<ProtectedSledRoute><Set/></ProtectedSledRoute>}/>
              <Route path="suspect" element={<ProtectedSledRoute><Suspect/></ProtectedSledRoute>}/>
              <Route path="track" element={<ProtectedSledRoute><Track/></ProtectedSledRoute>}/>
              <Route path="witnes" element={<ProtectedSledRoute><Witnes/></ProtectedSledRoute>}/>
            </Route>
         </Routes>
       </BrowserRouter> 
      </DrawerContext.Provider>
    </SnackbarProvider>
  )
}

export default App
              