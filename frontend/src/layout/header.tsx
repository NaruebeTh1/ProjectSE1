import React, { useEffect, useState } from 'react'
import './layoutStyle.css';
import {Link} from "react-router-dom";
import {Button, Col, Dropdown ,Menu, Row} from 'antd';

import {
  DeploymentUnitOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  SettingOutlined,
  DownOutlined,
  HomeOutlined,
  } from '@ant-design/icons';   

import images1 from '../assets/images1.png';
import { Header } from 'antd/es/layout/layout';



export default function Headers() {

  const Parcelmenu = (
    <Menu className='SubmenuItem'>
      <Menu.Item key="/pages/parcelTypes">
        <Link to="/pages/parcelTypes">
          <ContainerOutlined /> ประเภทของพัสดุ
        </Link>
      </Menu.Item>
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

  const Setting = (
    <Menu className='SubmenuItem'>
      <Menu.Item key="/">
        <Link to="/pages/myParcelList">
          <ContainerOutlined /> แก้ไขข้อมูลโปรไฟล์
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/pages/pinkUpParcelList">
          <FileDoneOutlined /> ความปลอดภัยของบัญชี
        </Link>
      </Menu.Item>
    </Menu>
  );

  const Menu1 = (
    <Menu className='SubmenuItem'>
      <Menu.Item key="/">
        <Link to="/">
          <ContainerOutlined /> xxxxxx1
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/">
          <FileDoneOutlined /> xxxxxx2
        </Link>
      </Menu.Item>
    </Menu>
  );

  const Menu2 = (
    <Menu className='SubmenuItem'>
      <Menu.Item key="/">
        <Link to="/">
          <ContainerOutlined /> xxxxxx1
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/">
          <FileDoneOutlined /> xxxxxx2
        </Link>
      </Menu.Item>
    </Menu>
  );

  const Menu3 = (
    <Menu className='SubmenuItem'>
      <Menu.Item key="/">
        <Link to="/">
          <ContainerOutlined /> xxxxxx1
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/">
          <FileDoneOutlined /> xxxxxx2
        </Link>
      </Menu.Item>
    </Menu>
  );

  const Menu4 = (
    <Menu className='SubmenuItem'>
      <Menu.Item key="/">
        <Link to="/">
          <ContainerOutlined /> xxxxxx1
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/">
          <FileDoneOutlined /> xxxxxx2
        </Link>
      </Menu.Item>
    </Menu>
  );
    
  return (
    <>
    <Row>
      <Col xl={24} xs={24} xxl={24} md={24} sm={24} lg={24}>

      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor:'GrayText'}}>

        <>
          <img src={images1} alt="Logo"
            style={{width:'100px', height:'40px', marginRight:'10px'}}/>
          <div className='TitleWeb'> EM School </div>
        </>

        <Link to="/">
          <Button type='text' className='menuItem'>
            <HomeOutlined /> หน้าหลัก
          </Button>
        </Link>

        <Dropdown overlay={Menu1} placement="bottomRight" arrow>
          <Button type='text' className='menuItem'>
            <DeploymentUnitOutlined /> เมนู 1 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Menu2} placement="bottomRight" arrow>
          <Button type='text' className='menuItem'>
            <DeploymentUnitOutlined /> เมนู 2 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Menu3} placement="bottomRight" arrow>
          <Button type='text' className='menuItem'>
            <DeploymentUnitOutlined /> เมนู 3 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Menu4} placement="bottomRight" arrow>
          <Button type='text' className='menuItem'>
            <DeploymentUnitOutlined /> เมนู 4 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Parcelmenu} placement="bottomRight" arrow>
          <Button type='text' className='menuItem'>
            <DeploymentUnitOutlined /> งานพัสดุโรงเรียน <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Setting} placement="bottomRight" arrow>
          <Button type='text' className='menuItem'>
            <SettingOutlined /> การตั้งค่า <DownOutlined />
          </Button>
        </Dropdown>

        <Link to="/">
          <Button type='text' className='menuItem'>
            <LogoutOutlined /> ออกจากระบบ
          </Button>
        </Link>

      </Header>

      </Col>
    </Row>
      
    </>
  )
}





