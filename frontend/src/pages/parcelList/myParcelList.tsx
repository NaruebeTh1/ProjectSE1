import React, { useState } from 'react';
import {
  PlusOutlined,
  FileDoneOutlined,

} from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, Space, Button} from 'antd';
import {
  Link,
} from "react-router-dom";

export default function MyParcelList() {


  return (
    <> 
    
      <div style={{display: 'flex', alignItems: 'center',fontSize:'24px', fontWeight: 'bold'}}>
        <FileDoneOutlined style={{fontSize: '40px', color: 'black', marginRight:5}} />
        รายการพัสดุโรงเรียน
      </div>

      <Button
        style={{fontSize:'16px', marginTop:30, textAlign:'center', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', backgroundColor: '#45a',
                color: '#ffffff',  border: 'none', borderRadius: '7px', 
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
