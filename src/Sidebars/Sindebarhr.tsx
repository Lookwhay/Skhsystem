import React from 'react';
import { HomeFilled, SettingFilled } from '@ant-design/icons';

function Sindebarhr() {
  return (
    <nav className="sidebar sidebar-offcanvas admin-sidebar" id="sidebar">
      <ul className="nav">
        <li className="nav-item active">
          <a className="nav-link" href="/HR">
            {/* <i className="icon-grid menu-icon" /> */}
            <HomeFilled className="mr-2" style={{ color: "#FFFFFF" }} />
            <span className="menu-title">หน้าหลัก</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <SettingFilled className="mr-2" style={{ color: "#FFFFFF" }} />
            <span className="menu-title">ข้อมูลพื้นฐาน</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><a className="nav-link" href="#">หน่วยงาน</a></li>
              <li className="nav-item"><a className="nav-link" href="#">บุคลากร</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ตำแหน่งงาน</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ประเภทเวร</a></li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
            <i className="icon-columns menu-icon" />
            <span className="menu-title">งานบุคลากร</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="form-elements">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><a className="nav-link" href="#">ลงเวลาปฏิบัติงาน</a></li>
              <li className="nav-item"><a className="nav-link" href="#">การลา</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ระบบเงินเดือน</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ระบบประเมินผลงาน</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ระบบฝึกอบรม</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ค่าตอบแทน</a></li>
              <li className="nav-item"><a className="nav-link" href="#">ระบบพ้นสภาพพนักงาน</a></li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
            <i className="icon-bar-graph menu-icon" />
            <span className="menu-title">งานเอกสาร</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="charts">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><a className="nav-link" href="#">ChartJs</a></li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
            <i className="icon-grid-2 menu-icon" />
            <span className="menu-title">ระบบรายงาน</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="tables">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><a className="nav-link" href="#">Basic table</a></li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
            <i className="icon-contract menu-icon" />
            <span className="menu-title">ระบบสิทธิ์และความปลอดภัยข้อมูล</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="icons">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><a className="nav-link" href="#">Mdi icons</a></li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <i className="icon-head menu-icon" />
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><a className="nav-link" href="pages/samples/login.html">Login</a></li>
              <li className="nav-item"><a className="nav-link" href="pages/samples/register.html">Register</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Sindebarhr
