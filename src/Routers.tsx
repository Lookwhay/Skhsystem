import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* Admin */
import Adminlayout from '../src/Layouts/Layoutadmin';
import Homeadmin from '../src/Pages/Homes/Homeadmin';
import Login from './Pages/Login/Frmlogin';


function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Admin" element={<Adminlayout/>}>
          <Route path="/Admin" element={<Homeadmin/>} />
          <Route path="/Admin/Office" element={''} />
          <Route path="/Admin/Computer" element={''} />
          <Route path='/Admin/Lending' element={''} />
          <Route path='/Admin/Return' element={''} />
          <Route path="/Admin/Reportaproblem" element={''} />
          <Route path="/Admin/Informrepair" element={''} />
          <Route path="/Admin/Workload" element={''} />
          <Route path="/Admin/Jobdescription" element={''} />
        </Route>
        <Route path="/User" element={''}>
          <Route path="/User" element={''} />
          <Route path="/User/Informrepair" element={''} />
          <Route path="/User/Reportaproblem" element={''} />
          <Route path='/User/Lending' element={''} />
          <Route path='/User/Return' element={''} />
        </Route>
        {/* <Route path='/not_found' element={<PathNotFound />} />*/}
       
      </Routes>
    </BrowserRouter >
  )
}

export default Routers
