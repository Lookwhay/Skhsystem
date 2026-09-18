import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Space } from 'antd';
import {
    DollarOutlined,
    UserOutlined,
    CalendarOutlined,
    SettingOutlined,
    ReconciliationOutlined,
    ClockCircleOutlined,
    ScanOutlined
} from '@ant-design/icons';
import StatCardsSection from './StatCardsSection';

function Homehr() {

    const navigate = useNavigate();
    const [timenow, setTimenow] = useState<Date>(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTimenow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const thaiDate = (date: Date) => new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);

    const statsData = [
        {
            id: 1,
            title: 'ลงเวลาปฏิบัติงาน',
            subtitle: 'ลงเวลาเข้างาน',
            icon: <ReconciliationOutlined style={{ fontSize: '24px', color: '#10b981' }} />,
            bgColor: '#e6f4ea',
            onClick: () => setIsAttendanceModalOpen(true)
        },
        {
            id: 2,
            title: 'ลงค่าตอบแทน',
            subtitle: 'ลงข้อมูลค่าตอบแทน / OT',
            icon: <UserOutlined style={{ fontSize: '24px', color: '#06b6d4' }} />,
            bgColor: '#e0f2fe',
            path: '/finance/income'
        },
        {
            id: 3,
            title: 'ตารางกิจกรรม',
            subtitle: '18 March',
            icon: <CalendarOutlined style={{ fontSize: '24px', color: '#ef4444' }} />,
            bgColor: '#fee2e2',
            path: '/finance/income'
        },
        {
            id: 4,
            title: 'Manage notifications',
            subtitle: '7,920',
            icon: <SettingOutlined style={{ fontSize: '24px', color: '#f59e0b' }} />,
            bgColor: '#fef3c7',
            path: '/finance/income'
        },
    ];

    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const handleNormalCheckIn = () => {
        setIsAttendanceModalOpen(false);
        navigate('/HR/Aattendancedefault/1'); // ระบุ Route ตามต้องการ
    };

    const handleFaceScanCheckIn = () => {
        setIsAttendanceModalOpen(false);
        navigate('/HR/Aattendancescan/1'); // ระบุ Route ตามต้องการ
    };

    return (
        <div className="content-wrapper">

            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                            <h3 className="font-weight-bold">งานทรัพยากรบุคคล</h3>
                            <h6 className="font-weight-normal mb-0"> ระบบงานทรัพยากรบุคคล <span className="text-primary">รพ.สกลนคร</span></h6>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="justify-content-end d-flex">
                                <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                                    <button className="btn btn-sm btn-light bg-white" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        {`${thaiDate(timenow)} ${timenow.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} น.`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card tale-bg">
                        <div className="card-people mt-auto">
                            <img src="images/dashboard/people.svg" alt="people" />
                            <div className="weather-info">
                                <div className="d-flex">
                                    <div>
                                        <h2 className="mb-0 font-weight-normal"><i className="icon-sun mr-2" />31<sup>C</sup></h2>
                                    </div>
                                    <div className="ml-2">
                                        <h4 className="location font-weight-normal">วันจันทร์</h4>
                                        <h6 className="font-weight-normal">Monday</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin transparent">
                    <div className="row">
                        <div className="col-md-6 mb-4 stretch-card transparent">
                            <div className="card card-tale">
                                <div className="card-body">
                                    <p className="mb-4">แพทย์</p>
                                    <p className="fs-30 mb-2">250</p>
                                    <p>10.00%</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 stretch-card transparent">
                            <div className="card card-dark-blue">
                                <div className="card-body">
                                    <p className="mb-4">พยาบาล</p>
                                    <p className="fs-30 mb-2">544</p>
                                    <p>22.00%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                            <div className="card card-light-blue">
                                <div className="card-body">
                                    <p className="mb-4">เภสัชกร</p>
                                    <p className="fs-30 mb-2">340</p>
                                    <p>2.00%</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 stretch-card transparent">
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <p className="mb-4">บุคลากร</p>
                                    <p className="fs-30 mb-2">1500</p>
                                    <p>0.22%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col-md-8 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title"> รายการ </p>
                            <p className="font-weight-500">รายการเมนูระบบงานต่างๆ...</p>

                            <div className="mb-4 w-100">
                                <StatCardsSection statsData={statsData} navigate={navigate} />
                            </div>

                            <canvas id="order-chart" />
                        </div>
                    </div>
                </div>

                <div className="col-md-4 stretch-card grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title mb-0">เข้าใช้งาน</p>
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th className="pl-0  pb-2 border-bottom">ประเภท</th>
                                            <th className="border-bottom pb-2">ร้อยละ</th>
                                            <th className="border-bottom pb-2">จำนวน</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="pl-0">ผู้เข้าชมทั้งหมด</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">65</span>(2.15%)</p></td>
                                            <td className="text-muted">65</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">ผู้เข้าชมปีนี้</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">54</span>(3.25%)</p></td>
                                            <td className="text-muted">51</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">ผู้เข้าชมเดือนนี้</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">22</span>(2.22%)</p></td>
                                            <td className="text-muted">32</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">ผู้เข้าชมวันนี้</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">46</span>(3.27%)</p></td>
                                            <td className="text-muted">15</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">บุคลากรทั้งหมด</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>รหัส</th>
                                                    <th>ชื่อ-สกุล</th>
                                                    <th>ชื่อเล่น</th>
                                                    <th>ตำแหน่ง</th>
                                                    <th>ประเภท</th>
                                                    <th>หน่วยงาน</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="เลือกรูปแบบการลงเวลาปฏิบัติงาน"
                open={isAttendanceModalOpen}
                onCancel={() => setIsAttendanceModalOpen(false)}
                footer={null}
                centered
            >
                <div className="py-4 text-center">
                    <p className="text-muted mb-4">โปรดเลือกช่องทางการลงเวลาที่คุณต้องการ</p>
                    <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ClockCircleOutlined />}
                            onClick={handleNormalCheckIn}
                            style={{ height: '50px', borderRadius: '8px' }}
                        >
                            ลงเวลาแบบปกติ
                        </Button>
                        <Button
                            type="primary"
                            danger
                            size="large"
                            icon={<ScanOutlined />}
                            onClick={handleFaceScanCheckIn}
                            style={{ height: '50px', borderRadius: '8px', backgroundColor: '#10b981', borderColor: '#10b981' }}
                        >
                            แบบสแกนใบหน้า
                        </Button>
                    </Space>
                </div>
            </Modal>

        </div>
    )
}

export default Homehr
