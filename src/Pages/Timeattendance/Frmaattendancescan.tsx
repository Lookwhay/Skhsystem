import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Button, Tag, Avatar, Progress, Result, message, Typography } from 'antd';
import {
  CameraOutlined,
  CheckCircleFilled,
  UserOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  SafetyCertificateOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam'; // Import react-webcam

const { Title, Text } = Typography;

function Frmaattendancescan() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);

  // State ต่างๆ
  const [scanning, setScanning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scannedUser, setScannedUser] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // สลับกล้องหน้า/หลัง
  const [time, setTime] = useState<Date>(new Date());

  // อัปเดตเวลาปัจจุบัน
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ฟังก์ชันสลับกล้องหน้า - กล้องหลัง
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // ฟังก์ชันจับภาพจาก Webcam และจำลองการประมวลผล Face Recognition
  const handleStartScan = useCallback(() => {
    // ดึงภาพ Snapshot ปัจจุบันจากกล้อง ( Base64 Format )
    const imageSrc = webcamRef.current?.getScreenshot();

    if (!imageSrc) {
      message.error('ไม่สามารถเชื่อมต่อกล้องได้ กรุณาตรวจสอบการอนุญาตกล้อง');
      return;
    }

    setCapturedImage(imageSrc);
    setScanning(true);
    setProgress(0);
    setScannedUser(null);

    // จำลองอนิเมชันประมวลผลการสแกนใบหน้า
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          // ข้อมูลจำลองผู้สแกนสำเร็จ (ในระบบจริงจะส่ง imageSrc ไปตรวจหาผู้ใช้งานที่ Backend API)
          setScannedUser({
            name: 'นพ. สมชาย ใจดี',
            position: 'แพทย์ผู้เชี่ยวชาญด้านอายุรกรรม',
            department: 'ฝ่ายอายุรกรรม',
            empId: 'SKN-90412',
            checkInTime: new Date().toLocaleTimeString('th-TH')
          });
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  }, [webcamRef]);

  // ล้างค่าเมื่อต้องการสแกนใหม่
  const handleReset = () => {
    setScannedUser(null);
    setCapturedImage(null);
    setProgress(0);
    setScanning(false);
  };

  return (
    <div style={{
      minHeight: '85vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
      padding: '24px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <style>{`
        @keyframes scanAnimation {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 95%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .scan-line {
          position: absolute;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          box-shadow: 0 0 15px #10b981;
          animation: scanAnimation 1.8s infinite ease-in-out;
          z-index: 10;
        }
        .pulse-circle {
          animation: pulseGlow 2s infinite;
        }
      `}</style>

      {/* Header Bar */}
      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)} 
          style={{ borderRadius: '8px' }}
        >
          ย้อนกลับ
        </Button>
        <Tag color="green" icon={<SafetyCertificateOutlined />} style={{ fontSize: '14px', padding: '6px 12px', borderRadius: '20px' }}>
          ระบบสแกนใบหน้าสดผ่านกล้อง (Webcam AI)
        </Tag>
      </div>

      <div style={{ width: '100%', maxWidth: '900px' }} className="row g-4">
        
        {/* ฝั่งซ้าย: จอกล้องสแกนใบหน้า */}
        <div className="col-lg-6 col-12">
          <Card 
            style={{ 
              borderRadius: '20px', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
              textAlign: 'center',
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: '32px 20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Title level={4} style={{ margin: 0 }}>สแกนใบหน้าเข้างาน</Title>
              <Button 
                type="text" 
                icon={<SyncOutlined />} 
                onClick={toggleCamera}
                title="สลับกล้องหน้า/หลัง"
              />
            </div>
            <Text type="secondary">กรุณาจัดใบหน้าให้อยู่ในกรอบวงกลม</Text>

            {/* พื้นที่กล้อง / ภาพถ่ายสแกน */}
            <div style={{
              position: 'relative',
              width: '260px',
              height: '260px',
              margin: '24px auto',
              borderRadius: '50%',
              border: scanning ? '4px solid #10b981' : scannedUser ? '4px solid #10b981' : '4px dashed #94a3b8',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
              overflow: 'hidden'
            }} className={scanning ? 'pulse-circle' : ''}>
              
              {/* เส้นเรซินสแกนวิ่งขึ้นลง */}
              {scanning && <div className="scan-line" />}

              {scannedUser && capturedImage ? (
                /* ภาพหลังจากการจับภาพภาพสแกนสำเร็จ */
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                /* กล้องวิดีโอสดผ่าน react-webcam */
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 400,
                    height: 400,
                    facingMode: facingMode
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              )}
            </div>

            {/* แสดงหลอดความคืบหน้า */}
            {scanning && (
              <div style={{ width: '85%', margin: '0 auto 16px' }}>
                <Progress percent={progress} status="active" strokeColor="#10b981" />
                <Text type="secondary" style={{ fontSize: '13px' }}>กำลังประมวลผลการสแกนภาพ...</Text>
              </div>
            )}

            {!scanning && !scannedUser && (
              <Button
                type="primary"
                size="large"
                icon={<CameraOutlined />}
                onClick={handleStartScan}
                style={{
                  height: '48px',
                  borderRadius: '12px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  backgroundColor: '#10b981',
                  borderColor: '#10b981',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                สแกนใบหน้าเพื่อลงเวลา
              </Button>
            )}

            {scannedUser && (
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                style={{ borderRadius: '8px' }}
              >
                สแกนใหม่อีกครั้ง
              </Button>
            )}
          </Card>
        </div>

        {/* ฝั่งขวา: นาฬิกาและแสดงผลลัพธ์ */}
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-between">
          
          <Card 
            style={{ 
              borderRadius: '20px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#fff',
              marginBottom: '20px'
            }}
          >
            <div className="text-center py-2">
              <Text style={{ color: '#94a3b8', fontSize: '14px' }}>เวลาปัจจุบัน</Text>
              <div style={{ fontSize: '38px', fontWeight: 'bold', letterSpacing: '2px', color: '#38bdf8', fontFamily: 'monospace' }}>
                {time.toLocaleTimeString('th-TH')}
              </div>
              <Text style={{ color: '#cbd5e1' }}>
                {time.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
            </div>
          </Card>

          <Card 
            style={{ 
              borderRadius: '20px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {scannedUser ? (
              <Result
                status="success"
                title={<span style={{ color: '#059669', fontSize: '20px' }}>ลงเวลาปฏิบัติงานสำเร็จ!</span>}
                subTitle={
                  <div style={{ marginTop: '12px', textAlign: 'left', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                    <p style={{ margin: '4px 0' }}><strong>ชื่อ-สกุล:</strong> {scannedUser.name}</p>
                    <p style={{ margin: '4px 0' }}><strong>รหัสบุคลากร:</strong> {scannedUser.empId}</p>
                    <p style={{ margin: '4px 0' }}><strong>ตำแหน่ง:</strong> {scannedUser.position}</p>
                    <p style={{ margin: '4px 0' }}><strong>แผนก:</strong> {scannedUser.department}</p>
                    <p style={{ margin: '4px 0', color: '#10b981' }}><strong>เวลาเข้างาน:</strong> {scannedUser.checkInTime} น.</p>
                  </div>
                }
              />
            ) : (
              <div className="text-center py-4" style={{ color: '#94a3b8' }}>
                <UserOutlined style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }} />
                <p>รอการเชื่อมต่อกล้องและสแกนใบหน้า...</p>
              </div>
            )}
          </Card>

        </div>
      </div>
    </div>
  );
}

export default Frmaattendancescan;