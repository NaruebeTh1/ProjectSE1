import React, { useState } from 'react';
import {
  PlusOutlined,

} from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, Space, Button} from 'antd';
import {
  Link,
} from "react-router-dom";

export default function MyParcelList() {


  return (
    <> 
    
      <div style={{fontSize:'20px'}}>
        รายการพัสดุโรงเรียน
      </div>

      <Button
        style={{fontSize:'16px', marginTop:30, textAlign:'center', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', backgroundColor: '#45a',
                color: '#ffffff',  border: 'none', borderRadius: '5px', 
                padding: '20px 20px'}} >
        <PlusOutlined />
        เพิ่มรายการพัสดุ
      </Button>

      <Card style={{fontSize:'16px', marginTop:30}}>
        ตารางแสดงรายการพัสดุ
      </Card>

  
    
    </>
  );
};
