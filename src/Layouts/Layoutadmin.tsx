import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Header from "../Headers/Headeradmin";
import Sidebar from "../Sidebars/Sindebaradmin";
import Footers from "../Footers/Footeradmin";

function Layoutadmin() {
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

export default Layoutadmin
