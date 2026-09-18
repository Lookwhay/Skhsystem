import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Header from "../Headers/Headeruser";
import Sidebar from "../Sidebars/Sindebaruser";
import Footers from "../Footers/Footeruser";

function LayoutUser() {
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

export default LayoutUser
