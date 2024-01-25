import React, { useState } from "react";
import "./headerStyle.css";
import { Link } from "react-router-dom";
import { Avatar, Button, Dropdown , Menu } from "antd";
import {
  DownOutlined,
  CaretRightOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import images3 from "../assets/images3.png";

export default function Headers() {
  const [menuOpen, setMenuOpen] = useState(false);

  const createMenuItem = (key: any, label: any) => (
    <Menu.Item key={key}>
      <Link to={key}>
        <CaretRightOutlined /> {label}
      </Link>
    </Menu.Item>
  );

  const Parcelmenu = (
    <Menu className="SubmenuItem">
      {createMenuItem("/pages/parcelOverview", "ภาพรวมงานพัสดุ")}
      {createMenuItem("/pages/myParcelList", "รายการพัสดุ")}
      {createMenuItem("/pages/pickUpParcel", "รายการเบิกจ่ายพัสดุ")}
    </Menu>
  );

  const SettingAndLogout = (
    <Menu className="SubmenuItem">
      {createMenuItem("/pages/settingProfile", "การตั้งค่าโปรไฟล์")}
      {createMenuItem("/pages/settingAccount", "การตั้งค่าบัญชี")}
      {createMenuItem("/pages/", "ออกจากระบบ")}
    </Menu>
  );

  const ReservePlace = (
    <Menu className="SubmenuItem">
      {createMenuItem("/pages/1", "ปฐิทินการจอง")}
      {createMenuItem("/pages/2", "จองห้องหรือสถานที่")}
    </Menu>
  );

  const Course = (
    <Menu className="SubmenuItem">
      {createMenuItem("/pages/3", "รายละเอียดวิชาที่เปิดสอน")}
      {createMenuItem("/pages/4", "เพิ่มรายวิชา")}
    </Menu>
  );

  const PersonnelAndStudent = (
    <Menu className="SubmenuItem">
      {createMenuItem("/pages/5", "ข้อมูลบุคลากร")}
      {createMenuItem("/pages/6", "ข้อมูลนักเรียน")}
    </Menu>
  );
  
  const Attendance = (
    <Menu className="SubmenuItem">
      {createMenuItem("/pages/7", "บันทึกการเข้าห้องเรียนและกิจกรรม")}
      {createMenuItem("/pages/8", "ข้อมูลการเช็คชื่อ")}
      {createMenuItem("/pages/9", "บันทึกพฤติกรรมนักเรียน")}
    </Menu>
  );

  return (
    <nav className="Headers" style={{justifyContent:'space-between'}}>

      <div>
        <img src={images3} alt="Logo" style={{height: "80px",marginLeft: "20px"}}/>
      </div>
      
      <Button
        className="iconMenu"
        type="link"
        size="large"
        icon={<MenuOutlined style={{ color: "#ffffff", fontSize: "25px" }} />}
        onClick={() => setMenuOpen(!menuOpen)}
      />

        <ul className={menuOpen ? "open" : ""}>
          <Link to="/pages/homePage">
            <Button type="link" className="menuItem">
              หน้าหลัก
            </Button>
          </Link>

          <Dropdown overlay={ReservePlace} placement="bottomRight" arrow>
            <Button type="link" className="menuItem">
              ปฏิทินการจอง <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown overlay={Course} placement="bottomRight" arrow>
            <Button type="link" className="menuItem">
              รายวิชาที่เปิดสอน <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown overlay={PersonnelAndStudent} placement="bottomRight" arrow>
            <Button type="link" className="menuItem">
              ข้อมูลบุคคล <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown overlay={Parcelmenu} placement="bottomRight" arrow>
            <Button type="link" className="menuItem">
              งานพัสดุโรงเรียน <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown overlay={Attendance} placement="bottomRight" arrow>
            <Button type="link" className="menuItem">
              การเช็คชื่อนักเรียน <DownOutlined />
            </Button>
          </Dropdown>

          <Link to="/">
            <Button type="link" className="menuItem">
              งานงบประมาณและการบัญชึ
            </Button>
          </Link>

          <Dropdown overlay={SettingAndLogout} placement="bottomRight" arrow className="avatar">
            <div style={{float:'right', marginRight:'20px', marginLeft:'20px'}}>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/020/389/525/original/hand-drawing-cartoon-girl-cute-girl-drawing-for-profile-picture-vector.jpg"
                style={{ cursor: "pointer", transform: "scale(1.5)" }}
              />
            </div>
          </Dropdown>

      
        </ul>
        
    </nav>
  );
}