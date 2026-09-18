import { useMemo, useState, type ReactNode } from 'react'
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Form,
  Input,
  Button,
  Select,
  Tag,
  Avatar,
  Progress,
  Divider,
} from 'antd'
import {
  HomeOutlined,
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  LoginOutlined,
  LogoutOutlined,
  DashboardOutlined,
  MedicineBoxOutlined,
  BellOutlined,
  SearchOutlined,
  BankOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const { Header, Sider, Content, Footer } = Layout
const { Option } = Select

type Role = 'admin' | 'user' | 'hr'

const roleLabels: Record<Role, string> = {
  admin: 'ผู้ดูแลระบบ',
  user: 'ผู้ใช้งาน',
  hr: 'เจ้าหน้าที่ทรัพยากรบุคคล',
}

const sidebarMenus: Record<Role, { key: string; label: string; icon: ReactNode; children?: { key: string; label: string }[] }[]> = {
  admin: [
    { key: 'home', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'staff', label: 'เจ้าหน้าที่', icon: <TeamOutlined /> },
    { key: 'setting', label: 'ตั้งค่าพื้นฐาน', icon: <SettingOutlined />, children: [{ key: 'staff-info', label: 'ข้อมูลเจ้าหน้าที่' }, { key: 'doctor-info', label: 'ข้อมูลแพทย์' }] },
    { key: 'report', label: 'รายงาน', icon: <BarChartOutlined />, children: [{ key: 'report-1', label: 'รายงาน1' }, { key: 'report-2', label: 'รายงาน2' }, { key: 'report-3', label: 'รายงาน3' }] },
    { key: 'login', label: 'Login', icon: <LoginOutlined /> },
  ],
  user: [
    { key: 'home', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: 'overview', label: 'Overview', icon: <HomeOutlined /> },
    { key: 'customers', label: 'Customers', icon: <UserOutlined /> },
    { key: 'settings', label: 'Settings', icon: <SettingOutlined />, children: [{ key: 'staff-info', label: 'ข้อมูลเจ้าหน้าที่' }, { key: 'doctor-info', label: 'ข้อมูลแพทย์' }] },
    { key: 'reports', label: 'รายงาน', icon: <FileTextOutlined />, children: [{ key: 'report-1', label: 'รายงาน1' }, { key: 'report-2', label: 'รายงาน2' }, { key: 'report-3', label: 'รายงาน3' }] },
    { key: 'logout', label: 'Logout', icon: <LogoutOutlined /> },
  ],
  hr: [
    { key: 'home', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'employees', label: 'เจ้าหน้าที่', icon: <TeamOutlined /> },
    { key: 'base-config', label: 'ตั้งค่าพื้นฐาน', icon: <BankOutlined />, children: [{ key: 'staff-info', label: 'ข้อมูลเจ้าหน้าที่' }, { key: 'doctor-info', label: 'ข้อมูลแพทย์' }] },
    { key: 'report', label: 'รายงาน', icon: <BarChartOutlined />, children: [{ key: 'report-1', label: 'รายงาน1' }, { key: 'report-2', label: 'รายงาน2' }, { key: 'report-3', label: 'รายงาน3' }] },
    { key: 'login', label: 'Login', icon: <LoginOutlined /> },
  ],
}

const topMenus: Record<Role, { key: string; label: string }[]> = {
  admin: [
    { key: 'home', label: 'Home' },
    { key: 'overview', label: 'Overview' },
    { key: 'customers', label: 'Customers' },
    { key: 'settings', label: 'Settings' },
  ],
  user: [
    { key: 'home', label: 'Home' },
    { key: 'overview', label: 'Overview' },
    { key: 'customers', label: 'Customers' },
    { key: 'settings', label: 'Settings' },
  ],
  hr: [
    { key: 'home', label: 'Home' },
    { key: 'overview', label: 'Overview' },
    { key: 'customers', label: 'Customers' },
    { key: 'settings', label: 'Settings' },
  ],
}

const dashboardData: Record<Role, { title: string; value: string; prefix: string; trend: string; color: string }[]> = {
  admin: [
    { title: 'จำนวนพนักงาน', value: '1,248', prefix: '👥', trend: '+12.5%', color: '#1572e8' },
    { title: 'ผู้ป่วยวันนี้', value: '428', prefix: '🏥', trend: '+8.2%', color: '#219653' },
    { title: 'นัดหมาย', value: '96', prefix: '📅', trend: '-2.1%', color: '#f7b731' },
    { title: 'รายได้รวม', value: '฿1.2M', prefix: '💰', trend: '+14.7%', color: '#e74c3c' },
  ],
  user: [
    { title: 'งานที่รับผิดชอบ', value: '38', prefix: '✅', trend: '+6.0%', color: '#20c997' },
    { title: 'ข้อความใหม่', value: '13', prefix: '💬', trend: '+3.4%', color: '#6f42c1' },
    { title: 'งานที่ค้าง', value: '7', prefix: '⚠️', trend: '-1.0%', color: '#f59f00' },
    { title: 'ประสิทธิภาพ', value: '92%', prefix: '📈', trend: '+5.8%', color: '#0d6efd' },
  ],
  hr: [
    { title: 'พนักงานทั้งหมด', value: '1,248', prefix: '👨‍💼', trend: '+10.1%', color: '#4c6ef5' },
    { title: 'วันลา', value: '42', prefix: '📋', trend: '+4.3%', color: '#f06595' },
    { title: 'ผู้สมัครใหม่', value: '18', prefix: '📝', trend: '+11.2%', color: '#20c997' },
    { title: 'การฝึกอบรม', value: '6', prefix: '🎓', trend: '+2.8%', color: '#ff922b' },
  ],
}

const overviewTable: Record<Role, { key: string; name: string; department: string; status: string; progress: number }[]> = {
  admin: [
    { key: '1', name: 'นางสาวน้ำฝน', department: 'ห้องพยาบาล', status: 'ออนไลน์', progress: 82 },
    { key: '2', name: 'นายกฤษฎา', department: 'แผนกตรวจโรค', status: 'ติดงาน', progress: 68 },
    { key: '3', name: 'นพ.ทวีศักดิ์', department: 'แพทย์เฉพาะทาง', status: 'ว่าง', progress: 91 },
    { key: '4', name: 'นางสาวพิมพ์ใจ', department: 'คลินิก', status: 'ออนไลน์', progress: 75 },
  ],
  user: [
    { key: '1', name: 'งานแจ้งซ่อม', department: 'อาคาร A', status: 'ดำเนินการ', progress: 64 },
    { key: '2', name: 'ติดตามผู้ป่วย', department: 'ห้องตรวจ', status: 'รอดำเนินการ', progress: 45 },
    { key: '3', name: 'รายงานประจำวัน', department: 'คลินิก', status: 'เสร็จสิ้น', progress: 100 },
    { key: '4', name: 'ปรับปรุงระบบ', department: 'IT Support', status: 'กำลังพัฒนา', progress: 78 },
  ],
  hr: [
    { key: '1', name: 'นางสาวมิ้นท์', department: 'บุคลากร', status: 'ปฏิบัติงาน', progress: 80 },
    { key: '2', name: 'นายธนกร', department: 'พยาบาล', status: 'ตรวจสอบ', progress: 60 },
    { key: '3', name: 'นางสุภา', department: 'การเงิน', status: 'ปกติ', progress: 86 },
    { key: '4', name: 'นายชาญชัย', department: 'เทคนิค', status: 'รออนุมัติ', progress: 52 },
  ],
}

const staffList = [
  { name: 'นางสาวน้ำฝน', position: 'พยาบาล', department: 'ห้องพยาบาล', status: 'ออนไลน์', phone: '081-111-1111' },
  { name: 'นายกฤษฎา', position: 'เจ้าหน้าที่เวชระเบียน', department: 'แผนกเวชระเบียน', status: 'ติดงาน', phone: '082-222-2222' },
  { name: 'นพ.ทวีศักดิ์', position: 'แพทย์', department: 'แพทย์เฉพาะทาง', status: 'ทำการรักษา', phone: '083-333-3333' },
  { name: 'นางสาวพิมพ์ใจ', position: 'พนักงานทั่วไป', department: 'คลินิก', status: 'ออนไลน์', phone: '084-444-4444' },
]

const doctorList = [
  { name: 'นพ.ทวีศักดิ์', specialist: 'ศัลยกรรมทั่วไป', shift: 'เช้า', room: '101' },
  { name: 'นพ.ศิริพร', specialist: 'สูตินรีเวช', shift: 'บ่าย', room: '205' },
  { name: 'นพ.สิทธิชัย', specialist: 'กุมารเวช', shift: 'เช้า', room: '302' },
  { name: 'นพ.ณัฐวุฒิ', specialist: 'อายุรกรรม', shift: 'เย็น', room: '410' },
]

const reportRows = [
  { name: 'รายงานผู้ป่วยนอก', total: '1,842', count: '82%' },
  { name: 'รายงานบุคลากร', total: '1,248', count: '91%' },
  { name: 'รายงานการลางาน', total: '116', count: '74%' },
  { name: 'รายงานประสิทธิภาพ', total: '93%', count: '96%' },
]

const overviewColumns = [
  { title: 'ชื่อ', dataIndex: 'name', key: 'name' },
  { title: 'แผนก', dataIndex: 'department', key: 'department' },
  { title: 'สถานะ', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'เสร็จสิ้น' || status === 'ออนไลน์' || status === 'ปฏิบัติงาน' ? 'green' : status === 'รออนุมัติ' || status === 'รอดำเนินการ' ? 'orange' : 'blue'}>{status}</Tag> },
  { title: 'ความคืบหน้า', dataIndex: 'progress', key: 'progress', render: (progress: number) => <Progress percent={progress} size="small" strokeColor="#1a73e8" /> },
]

function App() {
  const [role, setRole] = useState<Role>('admin')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedKey, setSelectedKey] = useState('home')

  const selectedSidebarMenu = useMemo(() => sidebarMenus[role], [role])
  const selectedHeaderMenu = useMemo(() => topMenus[role], [role])
  const stats = dashboardData[role]
  const tableData = overviewTable[role]

  const handleLogin = (values: { username: string; password: string; role: Role }) => {
    setRole(values.role)
    setIsLoggedIn(true)
    setSelectedKey('home')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSelectedKey('home')
  }

  const renderHomePanel = () => (
    <div className="page-section">
      <Row gutter={[18, 18]} className="metric-row">
        {stats.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.title}>
            <Card className="metric-card" bordered={false}>
              <div className="metric-head">
                <div className="metric-icon" style={{ background: item.color }}>{item.prefix}</div>
                <div className="metric-trend"><ArrowUpOutlined /> {item.trend}</div>
              </div>
              <Statistic title={item.title} value={item.value} valueStyle={{ fontWeight: 700, fontSize: '2rem', color: '#1f2a37' }} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[18, 18]} className="content-row">
        <Col xs={24} lg={16}>
          <Card className="data-card" title="ภาพรวมการทำงาน" extra={<Tag color="blue">{roleLabels[role]}</Tag>}>
            <Table columns={overviewColumns} dataSource={tableData} pagination={false} size="middle" />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="data-card" title="สรุปการใช้งาน">
            <div className="progress-block">
              <label>จำนวนการเข้าใช้งาน</label>
              <Progress percent={84} strokeColor="#2ecc71" />
            </div>
            <div className="progress-block">
              <label>ความพร้อมของระบบ</label>
              <Progress percent={92} strokeColor="#4c6ef5" />
            </div>
            <div className="progress-block">
              <label>งานที่เสร็จสิ้น</label>
              <Progress percent={76} strokeColor="#f59f00" />
            </div>
            <Divider dashed />
            <div className="notice-box">
              <BellOutlined />
              <span>มีการแจ้งเตือนงานสำคัญ 3 รายการ</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )

  const renderStaffPage = () => (
    <Card className="data-card" title="ข้อมูลเจ้าหน้าที่">
      <Table
        dataSource={staffList}
        pagination={false}
        columns={[
          { title: 'ชื่อ', dataIndex: 'name', key: 'name' },
          { title: 'ตำแหน่ง', dataIndex: 'position', key: 'position' },
          { title: 'แผนก', dataIndex: 'department', key: 'department' },
          { title: 'สถานะ', dataIndex: 'status', key: 'status', render: (value: string) => <Tag color={value === 'ออนไลน์' ? 'green' : 'orange'}>{value}</Tag> },
          { title: 'โทรศัพท์', dataIndex: 'phone', key: 'phone' },
        ]}
      />
    </Card>
  )

  const renderDoctorPage = () => (
    <Card className="data-card" title="ข้อมูลแพทย์">
      <Table
        dataSource={doctorList}
        pagination={false}
        columns={[
          { title: 'ชื่อแพทย์', dataIndex: 'name', key: 'name' },
          { title: 'เชี่ยวชาญ', dataIndex: 'specialist', key: 'specialist' },
          { title: 'กะ', dataIndex: 'shift', key: 'shift' },
          { title: 'ห้อง', dataIndex: 'room', key: 'room' },
          { title: 'สถานะ', key: 'status', render: () => <Tag color="blue">พร้อมให้บริการ</Tag> },
        ]}
      />
    </Card>
  )

  const renderReportPage = (name: string) => (
    <Card className="data-card" title={name}>
      <Table
        dataSource={reportRows}
        pagination={false}
        columns={[
          { title: 'ชื่อรายงาน', dataIndex: 'name', key: 'name' },
          { title: 'จำนวน', dataIndex: 'total', key: 'total' },
          { title: 'เปอร์เซ็นต์', dataIndex: 'count', key: 'count' },
        ]}
      />
    </Card>
  )

  const renderSettingsPage = () => (
    <Row gutter={[18, 18]}>
      <Col xs={24} lg={12}>
        <Card className="data-card" title="ตั้งค่าพื้นฐาน">
          <div className="settings-list">
            <div className="setting-item"><span>โรงพยาบาล</span><strong>โรงพยาบาลสกลนคร</strong></div>
            <div className="setting-item"><span>จังหวัด</span><strong>สกลนคร</strong></div>
            <div className="setting-item"><span>เบอร์โทร</span><strong>042-111-222</strong></div>
            <div className="setting-item"><span>เวอร์ชันระบบ</span><strong>v1.0.0</strong></div>
          </div>
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card className="data-card" title="ข้อมูลผู้ใช้งาน">
          <Form layout="vertical">
            <Form.Item label="ชื่อผู้ใช้งาน">
              <Input defaultValue="admin.hospital" />
            </Form.Item>
            <Form.Item label="อีเมล">
              <Input defaultValue="admin@skh.go.th" />
            </Form.Item>
            <Form.Item label="สิทธิการใช้งาน">
              <Select defaultValue={role}>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
                <Option value="hr">HR</Option>
              </Select>
            </Form.Item>
            <Button type="primary">บันทึกข้อมูล</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  )

  const renderCurrentPage = () => {
    switch (selectedKey) {
      case 'staff':
      case 'employees':
      case 'staff-info':
        return renderStaffPage()
      case 'doctor-info':
        return renderDoctorPage()
      case 'report-1':
        return renderReportPage('รายงาน1')
      case 'report-2':
        return renderReportPage('รายงาน2')
      case 'report-3':
        return renderReportPage('รายงาน3')
      case 'setting':
      case 'settings':
      case 'base-config':
        return renderSettingsPage()
      case 'overview':
      case 'customers':
        return renderHomePanel()
      case 'home':
      default:
        return renderHomePanel()
    }
  }

  return (
    <div className="app-shell">
      {!isLoggedIn ? (
        <div className="login-screen">
          <div className="login-overlay" />
          <Row justify="center" align="middle" className="login-row">
            <Col xs={22} md={12} lg={8}>
              <Card className="login-card" bordered={false}>
                <div className="brand-wrap">
                  <div className="brand-badge">
                    <MedicineBoxOutlined />
                  </div>
                  <div>
                    <h2>โรงพยาบาลสกลนคร</h2>
                    <p>ระบบงานเจ้าหน้าที่</p>
                  </div>
                </div>

                <Form layout="vertical" onFinish={handleLogin} initialValues={{ role }}>
                  <Form.Item label="Username" name="username" rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้งาน' }]}>
                    <Input placeholder="กรอกชื่อผู้ใช้งาน" size="large" />
                  </Form.Item>

                  <Form.Item label="Password" name="password" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}>
                    <Input.Password placeholder="กรอกรหัสผ่าน" size="large" />
                  </Form.Item>

                  <Form.Item label="Login as" name="role">
                    <Select size="large" onChange={(value) => setRole(value)}>
                      <Option value="admin">Admin</Option>
                      <Option value="user">User</Option>
                      <Option value="hr">เจ้าหน้าที่ HR</Option>
                    </Select>
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block size="large" className="login-button">
                    เข้าสู่ระบบ
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Layout className="main-layout">
          <Sider width={240} className="side-panel">
            <div className="sidebar-logo">
              <div className="logo-mark">K</div>
              <div>
                <strong>KaiAdmin</strong>
                <span>Hospital System</span>
              </div>
            </div>

            <div className="sidebar-label">Main Menu</div>
            <Menu mode="inline" className="side-menu" selectedKeys={[selectedKey]} defaultOpenKeys={['setting', 'report']}
              items={selectedSidebarMenu.map((item) => ({
                key: item.key,
                label: item.label,
                icon: item.icon,
                children: item.children?.map((child) => ({ key: child.key, label: child.label })),
              }))}
              onClick={({ key }) => setSelectedKey(key)}
            />
          </Sider>

          <Layout className="workspace-layout">
            <Header className="top-header">
              <div className="header-left">
                <div className="header-title">
                  <span className="eyebrow">Hospital admin</span>
                  <h3>{selectedKey === 'home' ? 'Dashboard' : selectedKey === 'staff' || selectedKey === 'employees' ? 'เจ้าหน้าที่' : selectedKey === 'settings' || selectedKey === 'setting' ? 'Settings' : selectedKey === 'report-1' ? 'รายงาน1' : selectedKey === 'report-2' ? 'รายงาน2' : selectedKey === 'report-3' ? 'รายงาน3' : selectedKey === 'doctor-info' ? 'ข้อมูลแพทย์' : 'Overview'}</h3>
                </div>
              </div>

              <div className="header-right">
                <nav className="header-menu">
                  {selectedHeaderMenu.map((item) => (
                    <button key={item.key} className={`nav-item ${selectedKey === item.key ? 'active' : ''}`} onClick={() => setSelectedKey(item.key)}>
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="header-tools">
                  <button className="icon-button" aria-label="search"><SearchOutlined /></button>
                  <button className="icon-button" aria-label="notification"><BellOutlined /></button>
                  <div className="user-badge">
                    <Avatar size={36} icon={<UserOutlined />} />
                    <div>
                      <strong>{roleLabels[role]}</strong>
                      <small>ออนไลน์</small>
                    </div>
                  </div>
                  <Button type="primary" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Button>
                </div>
              </div>
            </Header>

            <Content className="content-panel">
              {renderCurrentPage()}
            </Content>

            <Footer className="app-footer">
              <div><strong>ระบบงานเจ้าหน้าที่ โรงพยาบาลสกลนคร</strong></div>
              <div>© 2026 All Rights Reserved</div>
            </Footer>
          </Layout>
        </Layout>
      )}
    </div>
  )
}

export default App
