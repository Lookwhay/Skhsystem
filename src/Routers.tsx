import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* Layouts */
import Adminlayout from '../src/Layouts/Layoutadmin';
import LayoutHR from './Layouts/LayoutHR';
import LayoutUser from './Layouts/LayoutUser';
/* Pages */
import Homeadmin from '../src/Pages/Homes/Homeadmin';
import Homehr from './Pages/Homes/Homehr';
import Homeuser from './Pages/Homes/Homeuser';
import Login from './Pages/Login/Frmlogin';

/* Admin */
import Offices from './Pages/Offices/Frmoffice';
import Personal from './Pages/Personals/Frmpersonal';

/* HR */
import Aattendancedefault from './Pages/Timeattendance/Frmaattendancedefault';
import Aattendancescan from './Pages/Timeattendance/Frmaattendancescan';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<Adminlayout />}>
          <Route index element={<Homeadmin />} />
          <Route path="Offices" element={<Offices />} />
          <Route path="Personal/:id" element={<Personal />} />
        </Route>

        <Route path="/hr" element={<LayoutHR />}>
          <Route index element={<Homehr />} />
          <Route path="Aattendancedefault/:id" element={<Aattendancedefault />} />
          <Route path="Aattendancescan/:id" element={<Aattendancescan />} />
        </Route>

        <Route path="/user" element={<LayoutUser />}>
          <Route index element={<Homeuser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;