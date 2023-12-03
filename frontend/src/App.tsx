// import React, { useState } from "react";
// import type { MenuProps } from "antd";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
// } from "react-router-dom";
// import {
//   DeploymentUnitOutlined,
//   FileDoneOutlined,
//   PieChartOutlined,
//   ContainerOutlined,
// } from '@ant-design/icons';
// import { Avatar, Breadcrumb, Layout, Menu, Space, theme } from "antd";

// import logoImage from './assets/images.png';

// import LoginUser from "./pages/loginPage/loginPage";
// import MyParcelList from './pages/parcelList/myParcelList';
// import PinkUpParcelList from './pages/pinkUpParcel/pinkUpParcelList';




// const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[]
// ): MenuItem {
//   return {key,icon,children,label,} as MenuItem;
// }

// const items: MenuItem[] = [

//   getItem('งานพัสดุโรงเรียน', 'sub1', <DeploymentUnitOutlined />, [
//     getItem(<Link to="/pages/myParcelList"> รายการพัสดุ </Link>, '2', <FileDoneOutlined />),
//     getItem(<Link to="/pages/pinkUpParcelList"> รายการเบิกจ่ายพัสดุ </Link>, '3', <ContainerOutlined />),
//   ]),
// ];


// const App: React.FC = () => {
  
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

  

//   return (
//     <Router>
//       <Layout style={{ minHeight: "100vh" }}>
//         <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          
//           <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px'}}>
//             <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" style={{ cursor: 'pointer', transform: 'scale(2)' }} />
//           </div>

//           {!collapsed && (
//               <div style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
//                 My Name
//                 {/* <a href="/login/user" style={{ textDecoration: "none" }}>
//                           <text style={{
//                               fontSize: '20px', marginLeft: '25px',
//                               fontWeight: 'bolder', color: 'white'
//                           }}>
//                               <span style={{ color: '#ff7518' }}>{FullName}</span>
//                           </text>
//                 </a> */}
//               </div>
//           )}

//           <Menu theme="dark" style={{ marginTop: '20px'}} items={items}  mode="inline">
//           </Menu>
          
          
//         </Sider>
//         <Layout>
//             <Header style={{ padding: 0, background: '#3498db', color: '#fff' }}>
//               <div style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', display: 'flex', 
//                            alignItems: 'center', justifyContent: 'center'}}>

//                 <img src={logoImage} alt="Logo" 
//                      style={{ width: '100px', height: '50px', marginRight: '20px', marginTop:'center'}} />

//                 Easy school management

//               </div>
//             </Header>

//             <Content style={{ margin: "0 16px" }}>

//               <Breadcrumb style={{ margin: "16px 0" }} />

//             <div style={{padding: 24,minHeight: "100%",background: colorBgContainer}}>



//             <Routes>
//               <Route path="/" element={<LoginUser/>} />
//               <Route path="/pages/myParcelList" element={<MyParcelList />} />
//               <Route path="/pages/pinkUpParcelList" element={<PinkUpParcelList />} />
//             </Routes>


//             </div>

//           </Content>

//           <Footer style={{ textAlign: 'center', position: 'relative', bottom: 0, width: '100%'}}>
//             <Space>
//               <div style={{fontWeight: 'bold'}}> 
//                 Project SE ©2023 School Management System 
//               </div>
//             </Space>
//           </Footer>

//         </Layout>
//       </Layout>
//     </Router>
//   );
// };

// export default App;










import React, {  } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LoginUser from "./pages/loginPage/loginPage";
import MyParcelList from './pages/parcelList/myParcelList';
import PinkUpParcelList from './pages/pinkUpParcel/pinkUpParcelList';
import ParcelType from "./pages/parcelType/parcelTypes";




const App: React.FC = () => {
  


  return (
    <Router>
            <Routes>
              <Route path="/" element={<LoginUser/>} />
              <Route path="/pages/parcelTypes" element={<ParcelType />} />
              <Route path="/pages/myParcelList" element={<MyParcelList />} />
              <Route path="/pages/pinkUpParcelList" element={<PinkUpParcelList />} />
            </Routes>
    </Router>
  );
};

export default App;
