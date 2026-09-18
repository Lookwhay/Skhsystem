import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Header from "../Headers/Headerhr";
import Sidebar from "../Sidebars/Sindebarhr";
import Footers from "../Footers/Footerhr";

function LayoutHR() {
    return (
        <Layout className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <Content>
                        <Outlet />
                    </Content>
                    <Footers />
                </div>
            </div>
        </Layout>
    )
}

export default LayoutHR
