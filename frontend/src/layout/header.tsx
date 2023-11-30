import React, { useEffect, useState } from 'react'
import './layoutStyle.css';
import {Link, NavLink, useLocation} from "react-router-dom";
import {Col, Layout, Menu} from 'antd';

import {
  DeploymentUnitOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  } from '@ant-design/icons';   

  import images1 from '../assets/images1.png';
import { Header } from 'antd/es/layout/layout';

const { SubMenu } = Menu;
export default function Headers() {
    
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    useEffect(() => {
      setSelectedKey(location.pathname);
    }, [location.pathname]);
    
    return (
      <>
          <Menu className = 'navbar' mode="horizontal" selectedKeys={[selectedKey]} 
            style={{columnFill:'balance'}}>
            
              <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'flex-start' }}>
                <img src={images1} alt="Logo"
                  style={{
                    width: '100px',
                    height: '50px',
                    marginLeft: '30px',
                    marginRight: '10px',
                    marginTop: 'auto', 
                  }}
                /> 
              </div>

              <div style={{
                    marginLeft: '30px',
                    marginRight: '250px',
                    fontSize: '18px'
          
                  }}> โรงเรียนของเราน่าอยู่ </div>

            <SubMenu className = 'menuItem' title="งานพัสดุโรงเรียน" icon={<DeploymentUnitOutlined />}>
              
              <Menu.Item className = 'SubmenuItem' key="/pages/myParcelList">
                <Link to="/pages/myParcelList">
                  <ContainerOutlined /> รายการพัสดุ
                </Link>
              </Menu.Item>
              <Menu.Item className = 'SubmenuItem' key="/pages/pinkUpParcelList">
                <Link to="/pages/pinkUpParcelList">
                  <FileDoneOutlined /> รายการเบิกจ่ายพัสดุ
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item className = 'menuItem' key="">
                <Link to="">
                  <LogoutOutlined /> ออกจากระบบ
                </Link>
            </Menu.Item>

          </Menu>
      </>
  )
}