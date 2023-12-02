import React, { useEffect, useState } from 'react'
import './layoutStyle.css';
import {Link} from "react-router-dom";
import {Button, Dropdown ,Menu} from 'antd';

import {
  DeploymentUnitOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  } from '@ant-design/icons';   

import images1 from '../assets/images1.png';
import { Header } from 'antd/es/layout/layout';



export default function Headers() {
    
  const Parcelmenu = (
    <Menu>
      <Menu.Item key="/pages/myParcelList">
        <Link to="/pages/myParcelList">
          <ContainerOutlined /> รายการพัสดุ
        </Link>
      </Menu.Item>
      <Menu.Item key="/pages/pinkUpParcelList">
        <Link to="/pages/pinkUpParcelList">
          <FileDoneOutlined /> รายการเบิกจ่ายพัสดุ
        </Link>
      </Menu.Item>
    </Menu>
  );
    
  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center'}}>

        <>
          <img src={images1} alt="Logo"
            style={{width:'100px', height:'40px', marginRight:'10px'}}/>
          <span style={{marginRight:'30px', color:'white'}}>โรงเรียนของเราน่าอยู่</span>
        </>

        <Dropdown overlay={Parcelmenu} placement="bottomLeft" arrow>
          <Button type='text' style={{color:'white'}}>
            <DeploymentUnitOutlined /> งานพัสดุโรงเรียน
          </Button>
        </Dropdown>
      </Header>
    </>
  )
}





