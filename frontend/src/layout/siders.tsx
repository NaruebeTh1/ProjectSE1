import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  DeploymentUnitOutlined,
  FileDoneOutlined,
  PieChartOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Space, theme } from "antd";

//import logoImage from './assets/images.png';




const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {key,icon,children,label,} as MenuItem;
}

const items: MenuItem[] = [

  getItem('งานพัสดุโรงเรียน', 'sub1', <DeploymentUnitOutlined />, [
    getItem(<Link to="/pages/parcelInfoSummary"> ภาพรวมงานพัสดุ </Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/pages/myParcelList"> รายการพัสดุ </Link>, '2', <FileDoneOutlined />),
    getItem(<Link to="/pages/pinkUpParcelList"> รายการเบิกจ่ายพัสดุ </Link>, '3', <ContainerOutlined />),
  ]),
];


const Siders: React.FC = () => {
  
  const [collapsed, setCollapsed] = useState(false);

  return (
    
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          
          <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px'}}>
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" style={{ cursor: 'pointer', transform: 'scale(2)' }} />
          </div>

          {!collapsed && (
              <div style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
                My Name
                {/* <a href="/login/user" style={{ textDecoration: "none" }}>
                          <text style={{
                              fontSize: '20px', marginLeft: '25px',
                              fontWeight: 'bolder', color: 'white'
                          }}>
                              <span style={{ color: '#ff7518' }}>{FullName}</span>
                          </text>
                </a> */}
              </div>
          )}

          <Menu theme="dark" style={{ marginTop: '20px'}} items={items}  mode="inline">
          </Menu>
          
          
        </Sider>
  
      </Layout>
    
  );
};

export default Siders;