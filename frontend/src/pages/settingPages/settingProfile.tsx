

import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Avatar, Breadcrumb, Card, Layout, Menu, Space} from 'antd';

import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import { Content } from 'antd/es/layout/layout';


export default function SettingProfile() {
  return (
    <> 
    <Headers />
      <Content style={{ margin: "0 16px", backgroundColor:'brown'}}>
        <Breadcrumb style={{ margin: "16px 0" }} />
          <div style={{padding:40,minHeight: "100%",background: '', textAlign:'center'}}>

            00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

          </div>
      </Content>
    <Footers/>
    </>
  );
};


