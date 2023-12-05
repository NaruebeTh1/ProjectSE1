import React, { useEffect, useState } from 'react';
import './headerStyle.css';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  DownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import images3 from '../assets/images3.png';

export default function Headers() {

  const [menuOpen, setMenuOpen] = useState(false);

  const createMenuItem = (key:any, label:any) => (
    <Menu.Item key={key}>
      <Link to={key}>
        <CaretRightOutlined /> {label}
      </Link>
    </Menu.Item>
  );

  const Parcelmenu = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/parcelTypes', 'ประเภทของพัสดุ')}
      {createMenuItem('/pages/myParcelList', 'รายการพัสดุ')}
      {createMenuItem('/pages/pinkUpParcelList', 'รายการเบิกจ่ายพัสดุ')}
    </Menu>
  );

  const Setting = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/settingProfile', 'การตั้งค่าโปรไฟล์')}
      {createMenuItem('/pages/settingAccount', 'การตั้งค่าบัญชี')}
    </Menu>
  );

  const ReservePlace = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/1', 'ปฐิทินการจอง')}
      {createMenuItem('/pages/2', 'จองห้องหรือสถานที่')}
    </Menu>
  );

  const Course = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/3', 'รายละเอียดวิชาที่เปิดสอน')}
      {createMenuItem('/pages/4', 'เพิ่มรายวิชา')}
    </Menu>
  );

  const Menu3 = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/5', '01')}
      {createMenuItem('/pages/6', '02')}
      {createMenuItem('/pages/7', '03')}
    </Menu>
  );

  const Menu4 = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/8', '01')}
      {createMenuItem('/pages/9', '02')}
      {createMenuItem('/pages/10', '03')}
    </Menu>
  );

  const Menu5 = (
    <Menu className='SubmenuItem'>
      {createMenuItem('/pages/11', '01')}
      {createMenuItem('/pages/12', '02')}
      {createMenuItem('/pages/13', '03')}
    </Menu>
  );

  //   const Parcelmenu = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/pages/parcelTypes">
  //       <Link to="/pages/parcelTypes">
  //         <CaretRightOutlined /> ประเภทของพัสดุ
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/pages/myParcelList">
  //       <Link to="/pages/myParcelList">
  //         <CaretRightOutlined /> รายการพัสดุ
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/pages/pinkUpParcelList">
  //       <Link to="/pages/pinkUpParcelList">
  //         <CaretRightOutlined /> รายการเบิกจ่ายพัสดุ
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  

  // const Setting = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/pages/settingPages/settingProfile">
  //       <Link to="/pages/settingPages/settingProfile">
  //         <CaretRightOutlined /> การตั้งค่าโปรไฟล์
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/pages/settingPages/settingAccount">
  //       <Link to="/pages/settingPages/settingAccount">
  //       <CaretRightOutlined /> การตั้งค่าบัญชี
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const ReservePlace = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> ปฐิทินการจอง
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> จองห้องหรือสถานที่
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const Course = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> รายละเอียดวิชาที่เปิดสอน
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> เพิ่มรายวิชา
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const Menu3 = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> xxxxxx1
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> xxxxxx2
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const Menu4 = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> xxxxxx1
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> xxxxxx2
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const Menu5 = (
  //   <Menu className='SubmenuItem'>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> xxxxxx1
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="/">
  //       <Link to="/">
  //         <CaretRightOutlined /> xxxxxx2
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

 
  return (
    <>
      <nav  className='Headers' style={{justifyContent:'space-between'}}>
        <>
          <img src={images3} alt="Logo" style={{ height: '80px', marginLeft: '40px' }} />
        </>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      <ul className={menuOpen ? "open" : ""}>
        
        <Link to="/pages/homePage" >
          <Button type='link' className='menuItem' >
            หน้าหลัก
          </Button>
        </Link>

        <Dropdown overlay={ReservePlace} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            ปฏิทินการจอง <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Course} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            รายวิชาที่เปิดสอน <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Menu3} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            เมนู 000003 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Menu4} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            เมนู 000004 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Menu5} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            เมนู 000005 <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Parcelmenu} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            งานพัสดุโรงเรียน <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={Setting} placement="bottomRight" arrow>
          <Button type='link' className='menuItem'>
            <SettingOutlined /> การตั้งค่า 
          </Button>
        </Dropdown>

        <Link to="/" >
          <Button type='link' className='menuItem'>
            <LogoutOutlined /> ออกจากระบบ
          </Button>
        </Link>

      </ul>        
    </nav>

    </>
  );
}
