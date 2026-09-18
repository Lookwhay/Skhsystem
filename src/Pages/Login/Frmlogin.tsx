import React, { useState } from 'react';
import {
  KeyOutlined, LockTwoTone,
  EyeOutlined, EyeInvisibleOutlined, UserOutlined, LockOutlined
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom'

function Frmlogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    keepSignedIn: false,
  });

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type === 'checkbox' ? 'keepSignedIn' : id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    if(formData.username == "admin") {
      navigate('/Admin');
    }
    if(formData.username == "hr") {
      navigate('/HR');
    }
    if(formData.username == "user") {
      navigate('/User');
    }
    

  };

  return (
    <div className="container-scroller">
      <div
        className="container-fluid page-body-wrapper full-page-wrapper"
        style={{
          // 1. กำหนดรูปพื้นหลัง และทับด้วย Dark Overlay เพื่อความสบายตา
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/bg-hospital.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
        }}
      >
        <div className="content-wrapper d-flex align-items-center auth px-3 px-sm-0" style={{ background: 'transparent' }}>
          <div className="row w-100 mx-0">
            <div className="col-lg-4 col-md-7 col-sm-9 mx-auto">
              {/* 2. การ์ดแบบ Glassmorphism / Frosted Glass เพื่อความทันสมัย */}
              <div
                className="auth-form-light text-left py-5 px-4 px-sm-5"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', // สีขาวโปร่งแสงเล็กน้อย
                  backdropFilter: 'blur(10px)', // เอฟเฟกต์กระจกฝ้า
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="brand-logo text-center mb-3">
                  <img src="/sknlogo.png" alt="logo" style={{ maxHeight: '75px', width: 'auto' }} />
                </div>
                <h4 className="font-weight-bold text-center text-dark mb-1" style={{ fontSize: '1.35rem' }}>
                  ระบบงานเจ้าหน้าที่ รพ.สกลนคร
                </h4>
                <p className="text-center text-muted mb-4" style={{ fontSize: '0.85rem' }}>
                  Back-office System Sakonnakhon Hospital.
                </p>

                <form className="pt-2" onSubmit={handleSubmit}>
                  {/* Username Field */}
                  <div className="form-group mb-3 position-relative">
                    <UserOutlined
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                        fontSize: '16px',
                        zIndex: 5
                      }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg pl-5"
                      id="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        height: '48px',
                        fontSize: '0.95rem',
                        backgroundColor: '#f8fafc',
                        borderColor: '#cbd5e1'
                      }}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="form-group mb-3 position-relative">
                    <LockOutlined
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                        fontSize: '16px',
                        zIndex: 5
                      }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control form-control-lg pl-5 pr-5"
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        height: '48px',
                        fontSize: '0.95rem',
                        backgroundColor: '#f8fafc',
                        borderColor: '#cbd5e1'
                      }}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        fontSize: '16px',
                        zIndex: 10
                      }}
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-block btn-lg font-weight-medium text-white d-flex align-items-center justify-content-center"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{
                        backgroundColor: isHovered ? '#008f5a' : '#00a86b', // เข้มขึ้นเล็กน้อยเมื่อ Hover
                        borderColor: isHovered ? '#008f5a' : '#00a86b',
                        borderRadius: '10px',
                        height: '48px',
                        fontSize: '1rem',
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', // ลอยขึ้นเล็กน้อย 2px
                        boxShadow: isHovered
                          ? '0 8px 20px rgba(0, 168, 107, 0.5)'  // เงาฟุ้งขึ้นเมื่อ Hover
                          : '0 4px 14px rgba(0, 168, 107, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Animation แบบนุ่มนวล (Easing)
                        cursor: 'pointer'
                      }}
                    >
                      <KeyOutlined className="mr-2" style={{ fontSize: '18px' }} />
                      เข้าสู่ระบบ
                    </button>
                  </div>

                  {/* Options row */}
                  <div className="my-3 d-flex justify-content-between align-items-center" style={{ fontSize: '0.875rem' }}>
                    <Checkbox
                      id="keepSignedIn"
                      checked={formData.keepSignedIn}
                      onChange={(e) => setFormData((prev) => ({ ...prev, keepSignedIn: e.target.checked }))}
                      className="text-muted"
                    >
                      คงสถานะการเข้าสู่ระบบ
                    </Checkbox>

                    <a
                      href="#"
                      className="font-weight-medium"
                      style={{ color: '#00a86b', textDecoration: 'none' }}
                    >
                      ลืมรหัสผ่าน?
                    </a>
                  </div>

                  {/* Footer Text */}
                  <div className="text-center mt-4 pt-2 font-weight-light text-muted" style={{ fontSize: '0.85rem' }}>
                    เจ้าหน้าที่ใหม่กรุณาติดต่อ &nbsp;
                    <a href="#" className="font-weight-medium" style={{ color: '#00a86b', textDecoration: 'none' }}>
                      งานทรัพยากรบุคคล
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frmlogin;