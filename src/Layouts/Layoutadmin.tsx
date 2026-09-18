import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Header from "../Headers/Headeradmin";
import Sidebar from "../Sidebars/Sindebaradmin";
import Footers from "../Footers/Footeradmin";

function Layoutadmin() {
  return (
    <Layout>
            <Header/>
            <Sidebar/>
            <div className="page-wrapper">
                <Content>
                    <Outlet/>
                </Content>
                <Footers/>
            </div>
        </Layout>
  )
}

export default Layoutadmin
