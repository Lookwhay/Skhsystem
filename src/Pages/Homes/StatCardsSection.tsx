import React from 'react';
import { Tooltip } from 'antd';

// 1. กำหนด Type สำหรับข้อมูลการ์ดแต่ละใบ
export interface StatItem {
    id: number | string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    bgColor: string;
    path?: string;     // ใส่ ? เพื่อรองรับการ์ดที่ไม่มี path (เช่น เปิด Modal Pop-up)
    onClick?: () => void; // ใส่ ? สำหรับฟังก์ชัน Custom Action
}

// 2. กำหนด Type สำหรับ Props ของ Component
interface StatCardsProps {
    statsData: StatItem[];
    navigate: (path: string) => void;
}

const cardHoverStyle = `
  .stat-card-item {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
    border: 1px solid rgba(226, 232, 240, 0.8) !important;
  }
  .stat-card-item:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 12px 24px -10px rgba(0, 168, 107, 0.18), 0 4px 12px rgba(0, 0, 0, 0.05) !important;
    border-color: rgba(0, 168, 107, 0.4) !important;
  }
  .stat-card-item:hover .icon-box {
    transform: scale(1.08);
  }
  .icon-box {
    transition: transform 0.25s ease !important;
  }
`;

// 3. ระบุ Props Type ให้กับ Component
function StatCardsSection({ statsData, navigate }: StatCardsProps) {
    return (
        <>
            <style>{cardHoverStyle}</style>
            <div className="row">
                {statsData.map((item) => (
                    <div className="col-xl-3 col-lg-6 col-md-6 mb-3" key={item.id}>
                        <Tooltip title={item.onClick ? `คลิกเพื่อ${item.title}` : `คลิกเพื่อเปิดหน้า ${item.title}`} placement="top">
                            <div className="card border-0 p-3 d-flex flex-row align-items-center stat-card-item"
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick(); // รัน Pop-up Modal เมื่อมี onClick
                                    } else if (item.path) {
                                        navigate(item.path); // ย้ายหน้าเมื่อมี path
                                    }
                                }}
                                style={{
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                                    backgroundColor: '#ffffff',
                                    cursor: 'pointer',
                                    height: '100%',
                                    userSelect: 'none'
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center mr-3"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '14px',
                                        backgroundColor: item.bgColor,
                                        flexShrink: 0
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <div className="d-flex flex-column justify-content-center overflow-hidden">
                                    <span className="font-weight-bold text-dark mb-1 text-truncate"
                                        style={{
                                            fontSize: '1.3rem',
                                            lineHeight: '1.2',
                                            letterSpacing: '-0.3px'
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="text-muted text-truncate"
                                        style={{ fontSize: '0.85rem', fontWeight: 500 }}
                                    >
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        </Tooltip>
                    </div>
                ))}
            </div>
        </>
    );
}

export default StatCardsSection;